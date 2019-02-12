import React, { Component } from 'react';
import SearchCorpusBox from "./searchcorpusbox.jsx";
import PropTypes from "prop-types";
import { pluck } from 'ramda';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';
import Corpus from '../components/corpus/corpus';
import { back_end_host, authentication_token } from '../constants/constants';
import readFile from '../utilities/readfile';
import { removeCorpus } from '../utilities/functions';

var PT = PropTypes;

class CorpusView extends Component {
	static propTypes = {
		corpora: PT.object.isRequired,
		languageMap: PT.object.isRequired,
		languageFromMain: PT.string.isRequired,
		userRole: PT.string.isRequired,
		getLayersWithEndpoints: PT.func.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			file: null,
			xml: "",
			layersListVisible: false
		}
  	}

	componentDidUpdate(_, prevState) {
		if (prevState.file !== this.state.file) {
			readFile(this.state.file).then(xml => this.setState({ xml }));
		}
   }
	
	toggleSelection = (corpus, e) => {
		var s = !corpus.selected;
		this.props.corpora.recurseCorpus(corpus, function(c) { c.selected = s; });
		this.props.corpora.update();
		this.stop(e);
	}

	toggleExpansion = (corpus) => {
		corpus.expanded = !corpus.expanded;
		this.props.corpora.update();
	}

	toggleEditCenter = (corpus, e) => {
		e.preventDefault();
		corpus.edit = !corpus.edit;
		this.props.corpora.update();
		this.stop(e);
	}

	toggleUsedLayersList = () => {
		this.setState({layersListVisible: !this.state.layersListVisible})
	}

	selectAll = (value) => {
		this.props.corpora.recurse( c => { c.selected = value; });
		this.props.corpora.update();
	}

	handleFileChange = ({ target: { files } }) =>
	this.setState({ file: files[0] });

	handleSendFile = () => {
		const headers = {
			'Content-Type': 'text/xml',
		}

		const token = localStorage.getItem(authentication_token);

		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}

		fetch(back_end_host + 'db/corpus/upload', {
			headers,
			method: 'POST',
			body: this.state.xml
		}).then(response => {
			if (response.status === 200) {
				alert(dictionary[this.props.languageFromMain].corpus.upload.success);
				this.setState({
					file: null,
					xml: ""
				})
			} else {
				alert(dictionary[this.props.languageFromMain].corpus.upload.fail);
			}
		})
	}

	deleteCorpus = corpus => {
		if (window.confirm(dictionary[this.props.languageFromMain].corpus.delete.confirm)) {
			removeCorpus(corpus.id)
			.then(response => {
				if (response) {
					alert(dictionary[this.props.languageFromMain].corpus.delete.success);
				} 
			}).catch(error => {
				alert(dictionary[this.props.languageFromMain].corpus.delete.success);
			})
		}
	}

	searchCorpus = (query) => {
		// sort fn: descending priority, stable sort
		var sortFn = function(a, b){
			if (b.priority === a.priority) {
				return b.index - a.index; // stable sort
			}
			return b.priority - a.priority;
		};

		query = query.toLowerCase();
		if (!query) {
			this.props.corpora.recurse(function(corpus) {corpus.priority = 1; });
			this.props.corpora.update();
			return;
		}

		// clean up all priorities
		this.props.corpora.recurse(function(corpus) {
			corpus.priority = 0;
		});

		// find priority for each corpus
		var querytokens = query.split(" ").filter(function(x){ return x.length > 0; });
		this.props.corpora.recurse((corpus) => {
			var title = corpus.title;
			querytokens.forEach((qtoken) => {
				if (title && title.toLowerCase().indexOf(qtoken) >= 0) {
					corpus.priority ++;
				}
				if (corpus.description && corpus.description.toLowerCase().indexOf(qtoken) >= 0) {
					corpus.priority ++;
				}
				if (corpus.institution && corpus.institution.name && 
						corpus.institution.name.toLowerCase().indexOf(qtoken) >= 0) {
					corpus.priority ++;
				}
				if (corpus.languages){
					corpus.languages.forEach(function(lang){
						if (lang.toLowerCase().indexOf(qtoken) >= 0){
							corpus.priority ++;
						}
					});
					corpus.languages.forEach((lang) => {
						if (this.props.languageMap[lang].toLowerCase().indexOf(qtoken) >= 0){
							corpus.priority ++;
						}
					});
				}
			});
		});

		// ensure parents of visible corpora are also visible; maximum depth = 3
		var isVisibleFn = function(corpus){ return corpus.priority > 0; };
		var parentBooster = function(corpus){
			if (corpus.priority <= 0 && corpus.subCorpora) {
				if (corpus.subCorpora.some(isVisibleFn)) {
					corpus.priority = 0.5;
				}
			}
		};
		for (var i = 3; i > 0; i --) {
			this.props.corpora.recurse(parentBooster);
		}

		this.props.corpora.recurse(function(corpus) { corpus.subCorpora.sort(sortFn); });
		this.props.corpora.corpora.sort(sortFn);

		// display
		this.props.corpora.update();
	}

	stop(e) {
		e.stopPropagation();
	}

	getMinMaxPriority = () => {
		var min = 1, max = 0;
		this.props.corpora.recurse(function(c) { 
			if (c.priority < min) min = c.priority;
			if (max < c.priority) max = c.priority;
		});
		return [min, max];
	}

	renderCheckbox(corpus) {
		return (
			<button className="btn btn-outline-secondary">
				{ corpus.selected ?
					<span className="fa fa-check-square" aria-hidden="true"/> :
					<span className="fa fa-square" aria-hidden="true"/>
				}
			</button>
		);
	}

	renderExpansion = (corpus) => {
		if (!corpus.subCorpora || corpus.subCorpora.length === 0) {
			return false;
		}
		return (
			<div className="expansion-handle" style={{}}>
				<a>
					{corpus.expanded ?
						<span className="fa fa-minus" aria-hidden="true"/>:
						<span className="fa fa-plus" aria-hidden="true"/>
					} 
					{corpus.expanded ? 
						dictionary[this.props.languageFromMain].corpusview.collapse :
						dictionary[this.props.languageFromMain].corpusview.expand
					}
					&nbsp;
					{`(${corpus.subCorpora.length} ${dictionary[this.props.languageFromMain].corpusview.subcollections})`}
				</a>
			</div>
		);
	}

	renderLanguages = languages => {
		return languages
				.map(l => dictionary[this.props.languageFromMain].language[l] ?
					dictionary[this.props.languageFromMain].language[l]
					: this.props.languageMap[l])
				.sort()
				.join(", ");
	}

	renderLayers = layers => {
		const layerNames = pluck('name')(layers);
		return layerNames
				.map(layer => dictionary[this.props.languageFromMain].queryinput.layer[layer] ?
					dictionary[this.props.languageFromMain].queryinput.layer[layer]
					: layer)
				.sort()
				.join(", ");
	}

	renderFilteredMessage = () => {
		var total = 0;
		var visible = 0;
		this.props.corpora.recurse(function(corpus){
			if (corpus.visible) {
				total ++;
				if (corpus.priority > 0) {
					visible++;
				}
			}
		});
		if (visible === total) {
			return false;
		}
		return (
			<div id="searchInCollections">
				{`${dictionary[this.props.languageFromMain].corpusview.howManyAreShownP1} ${visible} 
				${dictionary[this.props.languageFromMain].corpusview.howManyAreShownP2} ${total} 
				${dictionary[this.props.languageFromMain].corpusview.howManyAreShownP3}.`}
			</div>
		);
	}

	renderCorpus = (level, minmaxp, corpus) => {
		if (!corpus.visible || corpus.priority <= 0) {
			return false;
		}
		var indent = {marginLeft:level*50};
		var corpusContainerClass = "corpus-container " + (corpus.priority > 0 ? "" : "dimmed");

		var hue = 120 * corpus.priority / minmaxp[1];
		var color = minmaxp[0] === minmaxp[1] ? 'transparent' : 'hsl('+hue+', 50%, 50%)';
		var priorityStyle = {paddingBottom: 4, paddingLeft: 2, borderBottom: '3px solid '+color };
		var expansive = corpus.expanded ? {overflow:'hidden'} 
			: {whiteSpace:'nowrap', overflow:'hidden', textOverflow: 'ellipsis'};
		return (
			<div className={corpusContainerClass} key={corpus.id}>
				<div className="row corpus" onClick={this.toggleExpansion.bind(this, corpus)}>
					<div className="col-sm-2 col-lg-1 vcenter">
						<div className="inline" style={priorityStyle} onClick={this.toggleSelection.bind(this,corpus)}>
							{this.renderCheckbox(corpus)}
						</div>
					</div>
					<div className="col-sm-7 col-lg-8 vcenter">
						<div style={indent}>
							<h3 style={expansive}> 
								{corpus.title}
								{ corpus.landingPage ? 
									<a href={corpus.landingPage} onClick={this.stop}>
										<span style={{fontSize:12}}>&nbsp;
											{dictionary[this.props.languageFromMain].common.homepage}
										</span>
										<i className="fa fa-home"/>
									</a>: false
								}
							</h3>
							<p style={expansive}>{corpus.description}</p>
							<p>
					{ this.props.userRole === 'ROLE_ADMIN' ?
						<span>
							<Button
								label={(
									<React.Fragment>
										<span className="fa fa-eye"/>&nbsp;
										{dictionary[this.props.languageFromMain].button.view}
									</React.Fragment>
								)}
								onClick={this.toggleEditCenter.bind(this, corpus)}
								style={{marginRight:1}}
							/>
							{` `}
							<a href={`${back_end_host}endpoint/${corpus.id}/download`}>
								<Button
									label={(
										<React.Fragment>
											<span className="fa fa-download"/>&nbsp;
											{dictionary[this.props.languageFromMain].button.download}
										</React.Fragment>
									)}
									style={{marginRight:1}}
								/>
							</a>
							{` `}
							<Button
								label={(
									<React.Fragment>
										<span className="fa fa-trash-o"/>&nbsp;
										{dictionary[this.props.languageFromMain].button.delete}
									</React.Fragment>
								)}
								onClick={this.deleteCorpus.bind(this, corpus)}
								style={{marginRight:1}}
							/>
						</span>
						: false
					}								
							</p>
							{this.renderExpansion(corpus)}
						</div>
					</div>
					<div className="col-sm-3 col-lg-3 vcenter">
						<p style={expansive}>
							<i className="fa fa-institution"/> {corpus.institution.name}
						</p>
						<p style={expansive}>
							<i className="fa fa-language"/> {this.renderLanguages(corpus.languages)}
						</p>
						<p style={expansive}>
							<i className="fa fa-search"/> {corpus.endpoint.protocol === "VERSION_2" ? 'FCS-QL' : 'CQL'}
						</p>
						{ corpus.endpoint.layers.length > 0 ?
							<p style={expansive}>
								<i className="fa fa-sliders"/> {this.renderLayers(corpus.endpoint.layers)}
							</p>
							: false
						}
					</div>
				</div>
				{ this.props.userRole === 'ROLE_ADMIN' ?
					<div id="viewEndpoint" className={"hide-" + !corpus.edit}>
						<Corpus
							languageFromMain={this.props.languageFromMain}
							endpoint={corpus.endpoint}
						/>
					</div>
					: false
				}
				{corpus.expanded ? corpus.subCorpora.map(this.renderCorpus.bind(this, level+1, minmaxp)) : false}
			</div>
		);
	}

	renderCurrentlyUsedLayers = (layersWithEndpoints) => {
		const keys = Object.keys(layersWithEndpoints).sort();
		const layers = keys.map(key => {
			const layer = layersWithEndpoints[key];
			const valOpts = Object.keys(layer.valueOptions).sort();
			return (
				<div key={key} style={{marginBottom:12}}>
					<div className='row'>
						<div className='col-1 align-right' style={{padding:0}}>
							{`${layer.name}:`}
						</div>
						<div className='col-11'>
							{`${layer.usedBy}`}
						</div>
					</div>
					{ valOpts.length > 0 ? 
						valOpts.map(valOpt => {
							return (
							<div key={valOpt} className='row'>
								<div className='col-1'></div>
								<div className='col-1 align-right' style={{padding:0}}>
									{`${valOpt}:`}
								</div>
								<div className='col-10'>
									{`${layer.valueOptions[valOpt]}`}
								</div>
							</div>
							);
						})
						: false
					}
				</div>
			);
		})
		return layers;
	} 

	render() {
		var minmaxp = this.getMinMaxPriority();
		const layersWithEndpoints = this.props.userRole === 'ROLE_ADMIN' ? this.props.getLayersWithEndpoints(this.props.corpora) : null;
		return	(
			<div style={{margin: "0 30px"}}>
				<div className="row">
					<div className="col" style={{ marginRight: -15, marginLeft: -15 }}>
						<div className="float-left inline">
							<h3 style={{marginTop:10}}>
								{this.props.corpora.getSelectedMessage(this.props.languageFromMain)}
							</h3>
						</div>
						<div className="float-right inline">
							<Button
								label={dictionary[this.props.languageFromMain].corpusview.selectAll}
								onClick={this.selectAll.bind(this,true)}
								style={{ marginRight: 10 }}
							/>
							<Button
								label={dictionary[this.props.languageFromMain].corpusview.deselectAll}
								onClick={this.selectAll.bind(this,false)}
								style={{ marginRight: 20 }}
							/>
						</div>
						<div className="float-right inline">
							<div className="inline" style={{ marginRight: 20 }} >
								<SearchCorpusBox
									search={this.searchCorpus}
									placeholder={dictionary[this.props.languageFromMain].corpusview.searchCorpusBox}
								/>
								{this.renderFilteredMessage()}
							</div>
						</div>
					</div>
				</div>
				{ this.props.userRole === 'ROLE_ADMIN' ?
					<div>
						<form>
							<div className="input-group row addcorp" id="inputFileRow">
								<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 custom-file" style={{marginLeft:10, marginTop: 7}}>
									<span className="input-group-text nobkg">
										{dictionary[this.props.languageFromMain].corpus.edit}
									</span>
									<input
										type="file"
										id="fileInput"
										name="myFile"
										onChange={this.handleFileChange}
										accept=".xml"
									/>
								</div>
								<div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 align-right" style={{marginLeft: 10, marginTop: 7}}>
									<span>
										<Button 
											label={(
												<React.Fragment><span>
													<span className="fa fa-upload"/>{` `}
													{dictionary[this.props.languageFromMain].button.upload}</span>
												</React.Fragment>
											)}
											onClick={this.handleSendFile}
											disabled={!this.state.file}
										/>
										{` `}
										<Button 
											label={(
												<React.Fragment>
													<span className="fa fa-eye"/>{` `}
													{dictionary[this.props.languageFromMain].button.layers}
												</React.Fragment>
											)}
											onClick={this.toggleUsedLayersList}
										/>
										</span>
								</div>
							</div>
						</form>
						<div style={{marginBottom:30}} className={"hide-" + !this.state.layersListVisible}>
							{ layersWithEndpoints !== null ?
								this.renderCurrentlyUsedLayers(layersWithEndpoints)
								: false
							}
						</div>
					</div>				
					: false
				}
				{this.props.corpora.corpora.map(this.renderCorpus.bind(this, 0, minmaxp))}
			</div>
		);
	}
}

export default CorpusView;
