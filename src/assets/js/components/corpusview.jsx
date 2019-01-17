import React, { Component, PureComponent } from 'react';
import SearchCorpusBox from "./searchcorpusbox.jsx";
import PropTypes from "prop-types";
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';

var PT = PropTypes;

class CorpusView extends Component {
	static propTypes = {
		corpora: PT.object.isRequired,
		languageMap: PT.object.isRequired,
		languageFromMain: PT.string.isRequired
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

	selectAll = (value) => {
		this.props.corpora.recurse( c => { c.selected = value; });
		this.props.corpora.update();
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
		return	<button className="btn btn-outline-secondary">
					{ corpus.selected ?
						<span className="fa fa-check-square" aria-hidden="true"/> :
						<span className="fa fa-square" aria-hidden="true"/>
					}
				</button>;
	}

	renderExpansion(corpus) {
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

	renderLanguages = (languages) => {
		return languages
				.map(l => this.props.languageMap[l])
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
		return	(
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
					</div>
				</div>
				{corpus.expanded ? corpus.subCorpora.map(this.renderCorpus.bind(this, level+1, minmaxp)) : false}
			</div>
		);
	}

	render() {
		var minmaxp = this.getMinMaxPriority();
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
				
				{this.props.corpora.corpora.map(this.renderCorpus.bind(this, 0, minmaxp))}
			</div>
		);
	}
}

export default CorpusView;
