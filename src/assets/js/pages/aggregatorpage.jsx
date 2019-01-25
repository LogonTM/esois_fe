import $ from 'jquery';
import { back_end_host } from '../constants/constants';
import 'bootstrap';
import Button from '../utilities/button';
import CorpusView from '../components/corpusview.jsx';
import dictionary from '../../../translations/dictionary';
import ErrorBoundary from '../utilities/errorboundary';
import LanguageSelector from '../components/languageselector.jsx'
import { sortLayerOperators } from '../utilities/layers';
import Modal from '../components/modal.jsx';
import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Results from '../components/results.jsx';
import QueryInput from '../components/queryinput.jsx';
import ZoomedResult from '../components/zoomedresult.jsx';
import { authentication_token } from '../constants/constants';

var PT = PropTypes;

window.MyAggregator = window.MyAggregator || {};
var multipleLanguageCode = window.MyAggregator.multipleLanguageCode = "mul"; // see ISO-693-3

class AggregatorPage extends Component {
	static propTypes = {
	 	ajax: PT.func.isRequired,
	 	error: PT.func.isRequired,
		languageFromMain: PT.string.isRequired,
		userRole: PT.string.isRequired,
	} 

	nohits = {
		results: null,
	}

	anyLanguage = [multipleLanguageCode, dictionary[this.props.languageFromMain].common.anyLanguage];

	queryTypes = [
		{
			id: 'cql',
			className: '',
		},
		{
			id: 'fcs',
			disabled: false,
		},
	];
	
	queryTypeMap = {
		cql: this.queryTypes[0],
		fcs: this.queryTypes[1]
	};

	constructor(props) {
		super(props);
		var aggrContext = getQueryVariable('x-aggregation-context');
	   aggrContext = aggrContext && JSON.parse(aggrContext);
		this.state = {
			corpora: new Corpora([], this.updateCorpora),
			languageMap: {},
			currentLanguagesMap: {},
	      queryTypeId: getQueryVariable('queryType') || 'cql',
			query: getQueryVariable('query') || '',
			cqlQuery: (((getQueryVariable('queryType') || 'cql') === 'cql') && getQueryVariable('query')) || '',
			fcsQuery: ((getQueryVariable('queryType') === 'fcs') && getQueryVariable('query')) || '',
			fcsTextAreaVisibility: false,
			aggregationContext: aggrContext || null,
			language: this.anyLanguage,
			languageFilter: 'byMeta',
			numberOfResults: 10,

			searchId: null,
			timeout: 0,
			hits: this.nohits,

			zoomedCorpusHit: null,

			layerMap: { word: { layerOperators: ['IS'], valueOptions: [] }},
		};
	}

	componentDidMount() {
	    this._isMounted = true;

		this.props.ajax({
			url: back_end_host + 'rest/init',
			success: (json, textStatus, jqXHR) => {
				if (this._isMounted) {
					var corpora = new Corpora(json.corpora, this.updateCorpora);
					var aggregationContext = json['x-aggregation-context'] || this.state.aggregationContext;
					const layers = corpora.getLayers(this.props.languageFromMain);

					window.MyAggregator.mode = getQueryVariable('mode') || json.mode;
					window.MyAggregator.corpora = json.corpora;
					window.MyAggregator.xAggregationContext = aggregationContext;

					// Setting visibility, e.g. only corpora 
					// from v2.0 endpoints for fcs v2.0
					corpora.setVisibility(this.state.queryTypeId, this.state.language[0]);

						if (aggregationContext) {
							const contextCorporaInfo = corpora.setAggregationContext(aggregationContext);
							const unavailableCorporaHandles = contextCorporaInfo.unavailable; // list of unavailable aggregationContext
							if (unavailableCorporaHandles.length > 0) {
								this.props.error("Could not find requested collection handles:\n" + unavailableCorporaHandles.join('\n'));
							}

							const actuallySelectedCorpora = corpora.getSelectedIds();

							if (contextCorporaInfo.selected.length !== actuallySelectedCorpora.length) {
								if (actuallySelectedCorpora.length === 0) {
									this.props.error("This search does not support the required collection(s), will search all collections instead"); // TODO give detailed reason its not supported.
									corpora.recurse(function(corpus) { corpus.selected = true; });
								} else {
									var err = "Some required context collections are not supported for this search:\n"
									err = err + contextCorporaInfo.filter((c) => {
										if (actuallySelectedCorpora.indexOf(c) === -1) {
											console.warn("Requested corpus but not available for selection", c);
											return true;
										}
										return false;
									}).map((c) => c.title).join('\n')
									this.props.error(err);
								}
							}
						}
						else {
							// no context set all visible to selected as default.
							// console.log("no context set, selecting all available");
							corpora.recurse(c => {c.visible ? c.selected=true : c.selected=false})
						}

					this.setState({
						corpora : corpora,
						languageMap: json.languages,
						currentLanguagesMap: json.languages,
						aggregationContext: aggregationContext,
						layerMap: layers,
					}, this.postInit);
				}
				else {
					console.warn("Got Aggregator init response, but not mounted!");
				}
			}
		});
	}

	postInit = () => {
		if (window.MyAggregator.mode === 'search') {
		   this.search();
	   }
	}

	updateCorpora = corpora => {
		this.setState(updateState(corpora, this.props.languageFromMain));
		// console.log(this.state.layerMap);
	}

	getCurrentQuery = () => {
	    return this.state.queryTypeId === 'cql' ? this.state.cqlQuery : this.state.fcsQuery;
	}

	search = () => {
		var _paq = [];
		var query = this.getCurrentQuery();
		var queryTypeIdForSearch = this.state.queryTypeId;
		if (!query || (this.props.embedded && window.MyAggregator.mode !== 'search')) {
			this.setState({ hits: this.nohits, searchId: null });
			return;
		}
		var selectedIds = this.state.corpora.getSelectedIds();
		if (!selectedIds.length) {
			this.props.error("Please select a collection to search into");
			return;
		}
		this.props.ajax({
			url: back_end_host + 'search',
			type: "POST",
			data: {
				query: query,
				queryType: queryTypeIdForSearch,
				language: this.state.language[0],
				numberOfResults: this.state.numberOfResults,
				corporaIds: selectedIds,
				token: localStorage.getItem(authentication_token)
			},
			success: (searchId, textStatus, jqXHR) => {
				if (Location.hostname !== "localhost") {
					_paq.push(['trackSiteSearch', query, queryTypeIdForSearch, false]);
				}

				var timeout = 250;
				setTimeout(this.refreshSearchResults, timeout);
				this.setState({ searchId, timeout });
			}
		});
	}

	nextResults = corpusId => {
		this.props.ajax({
			url: back_end_host + 'search/' + this.state.searchId,
			type: "POST",
			data: {
				corpusId: corpusId,
				numberOfResults: this.state.numberOfResults,
			},
			success: (searchId, textStatus, jqXHR) => {
				var timeout = 250;
				setTimeout(this.refreshSearchResults, timeout);
				this.setState({ searchId, timeout });
			}
		});
	}

	refreshSearchResults = () => {
		if (!this.state.searchId || !this._isMounted) {
			return;
		}
		this.props.ajax({
			url: back_end_host + 'search/' + this.state.searchId,
			success: (json, textStatus, jqXHR) => {
				var timeout = this.state.timeout;
				if (json.inProgress) {
					if (timeout < 10000) {
						timeout = 1.5 * timeout;
					}
					setTimeout(this.refreshSearchResults, timeout);
					console.log("new search in: " + timeout + "ms");
				} else {
					console.log("search ended; hits:", json);
				}
				var corpusHit = this.state.zoomedCorpusHit;
				if (corpusHit) {
					for (var resi = 0; resi < json.results.length; resi++) {
						var res = json.results[resi];
						if (res.corpus.id === corpusHit.corpus.id) {
							corpusHit = res;
							break;
						}
					}
				}
				this.setState({ hits: json, timeout: timeout, zoomedCorpusHit: corpusHit});
			}
		});
	}

	getExportParams = (corpusId, format, filterLanguage) => {
		var params = corpusId ? {corpusId:corpusId}:{};
		if (format) params.format = format;
		if (filterLanguage) {
			params.filterLanguage = filterLanguage;
		} else if (this.state.languageFilter === 'byGuess' || this.state.languageFilter === 'byMetaAndGuess') {
			params.filterLanguage = this.state.language[0];
		}
		return encodeQueryData(params);
	}

	getDownloadLink = (corpusId, format) => {
		return back_end_host + 'search/' + this.state.searchId + '/download?' +
			this.getExportParams(corpusId, format);
	}

	setLanguageAndFilter = (languageObj, languageFilter) => {
		this.state.corpora.setVisibility(this.state.queryTypeId,
			languageFilter === 'byGuess' ? multipleLanguageCode : languageObj[0]);
		this.setState({
			language: languageObj,
			languageFilter: languageFilter,
			corpora: this.state.corpora,
		});
	}

	handleQueryTypeChange = e => {
		this.setQueryType(e.target.value);
		this.updateCorpora(this.state.corpora);
	}

	setQueryType = queryTypeId => {
		this.state.corpora.setVisibility(queryTypeId, this.state.language[0]);
		setQueryVariable('queryType', queryTypeId);
		setQueryVariable('query', queryTypeId === 'cql' ? this.state.cqlQuery : this.state.fcsQuery)
		this.setState({
			queryTypeId: queryTypeId,
			hits: this.nohits,
			searchId: null
		});
	}

	setNumberOfResults = e => {
		var n = e.target.value;
		if (n < 10) n = 10;
		if (n > 250) n = 250;
		this.setState({numberOfResults: n});
		e.preventDefault();
		e.stopPropagation();
	}

	stop(e) {
		e.stopPropagation();
	}

	filterResults = () => {
		var noLangFiltering = this.state.languageFilter === 'byMeta';
		var langCode = this.state.language[0];
		var results = null, inProgress = 0, hits = 0;
		if (this.state.hits.results) {
			results = this.state.hits.results.map(function(corpusHit) {
				return {
					corpus: corpusHit.corpus,
					inProgress: corpusHit.inProgress,
					exception: corpusHit.exception,
					diagnostics: corpusHit.diagnostics,
					kwics: noLangFiltering ? corpusHit.kwics :
						corpusHit.kwics.filter(function(kwic) {
							return kwic.language === langCode ||
							       langCode === multipleLanguageCode ||
							       langCode === null;
						}),
					advancedLayers: noLangFiltering ? corpusHit.advancedLayers :
					 	corpusHit.advancedLayers.filter(function(layer) {
					 		return layer.language === langCode ||
					 		       langCode === multipleLanguageCode ||
					 		       langCode === null;
					 	}),
				};
			});
			for (var i = 0; i < results.length; i++) {
				var result = results[i];
				if (result.inProgress) {
					inProgress++;
				}
				if (result.kwics.length > 0) {
					hits ++;
				}
			}
		}
		return {
			results: results,
			hits: hits,
			inProgress: inProgress,
		};
	}

	toggleLanguageSelection = e => {
		$(ReactDOM.findDOMNode(this.refs.languageModal)).modal();
		e.preventDefault();
		e.stopPropagation();
	}

	toggleCorpusSelection = e => {
		$(ReactDOM.findDOMNode(this.refs.corporaModal)).modal();
		e.preventDefault();
		e.stopPropagation();
	}

	toggleResultModal = (corpusHit, e) => {
		$(ReactDOM.findDOMNode(this.refs.resultModal)).modal();
		this.setState({zoomedCorpusHit: corpusHit});
		e.preventDefault();
		e.stopPropagation();
	}

	onQueryChange = queryStr => {
	    if (this.state.queryTypeId === 'cql') {
	        this.setState({
				cqlQuery: queryStr || '',
		    });
	    } else {
	        this.setState({
				fcsQuery: queryStr || '',
		    });
		}
		setQueryVariable('query', queryStr);
	}

	handleKey = event => {
		if (event.keyCode === 13) {
			this.search();
		}
	}

	handleKeyTextarea = event => {
		if (event.keyCode === 13) {
			this.search();
		} else {
			event.target.style.height = 'inherit';
			event.target.style.height = `${Math.max(Math.min(event.target.scrollHeight + 2, 550), 55)}px`;
		}
	}

	handleADVKey = event => {
		if (event.keyCode === 13) {
		this.addADVToken();
		}
	}
	
	toggleFcsView = (fcsTextAreaVisibility, e) => {
		e.preventDefault();
		this.setState({ fcsTextAreaVisibility });
	}

	renderZoomedResultTitle = corpusHit => {
		if (!corpusHit) return (<span/>);
		var corpus = corpusHit.corpus;
		return (
			<h3>
				{corpus.title}
				{ corpus.landingPage ?
					<a href={corpus.landingPage} onClick={this.stop} style={{fontSize:12}}>
						<span>
							{dictionary[this.props.languageFromMain].common.homepage}
						</span>
						<i className="fa fa-home"/>
					</a>: false}
			</h3>
		);
	}

	renderSearchButtonOrLink = () => {
		return (
			<Button
				label={<i className="fa fa-search"></i>}
				uiType={'input-lg image_button'}
				onClick={this.search}
			/>
		);
	}

	renderQueryInput = () => {
	   return (
			<ErrorBoundary>
				<QueryInput
					searchedLanguage={this.state.searchedLanguage || [multipleLanguageCode]}
					queryTypeId={this.state.queryTypeId}
					query={this.getCurrentQuery()}
					placeholder={dictionary[this.props.languageFromMain].cql.placeholder}
					onKeyDown={this.handleKey}
					handleKeyTextarea={this.handleKeyTextarea}
					languageFromMain={this.props.languageFromMain}
					corpora={this.props.corpora}
					onQueryChange={this.onQueryChange}
					fcsTextAreaVisibility={this.state.fcsTextAreaVisibility}
					layerMap={this.state.layerMap}
				/>
			</ErrorBoundary>
		);
	}
	
	renderCql = () => (
		<div className="aligncenter" style={{marginLeft:16, marginRight:16}}>
			<div className="input-group mb-3">
				{ this.renderQueryInput() }
				<div className="input-group-append">
					{this.renderSearchButtonOrLink()}
				</div>
			</div>
		</div>
	);

	renderGQB = () => {
	    return (
			<div style={{marginLeft:16, marginRight:16}}>
				<div className="card">
					<div
						id='fcsFormHeading'
						className="card-heading"
					>
						<div className="row">
							<div className="col-l-2 col-md-3 col-sm-4 col-xs-4">
								<fieldset>
									<div className="switch-toggle switch-candy blue">
										<input
											id="fcs-form"
											name="fcs"
											type="radio"
											checked={!this.state.fcsTextAreaVisibility}
											readOnly
										/>
										<label
											htmlFor="fcs-form"
											onClick={this.toggleFcsView.bind(this, !this.state.fcsTextAreaVisibility)}
										>
											{dictionary[this.props.languageFromMain].fcs.form}
										</label>
										<input
											id="fcs-text"
											name="fcs"
											type="radio"
											checked={this.state.fcsTextAreaVisibility}
											readOnly
										/>
										<label
											htmlFor="fcs-text"
											onClick={this.toggleFcsView.bind(this, !this.state.fcsTextAreaVisibility)}
										>
											{dictionary[this.props.languageFromMain].fcs.text}
										</label>
										<a></a>
									</div>
								</fieldset>
							</div>
						</div>
					</div>
					<div className="card-body">
						{ this.renderQueryInput() }
					</div>
					<div className="card-footer">
						<div className="input-group">
							<pre className="adv-query-preview aligncenter form-control input-lg">
								{this.getCurrentQuery()}
							</pre>
							<div className="input-group-append">
								{this.renderSearchButtonOrLink()}
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	renderUnavailableCorporaMessage = () => {
	    if (!this.state.corpora) {
	        return;
	    }
        const unavailable = [];
        this.state.corpora.recurse((c) => {
            if (c.selected && ! c.visible) {
                unavailable.push(c);
            }
            if (c.selected) {
               // apparently a selected corpus 
            }
        });
        
        if (unavailable.length) {
            return (
				<div id="unavailable-corpora-message" className="text-muted">
					<div id="unavailable-corpora-message-message">
						<a role="button" data-toggle="dropdown">{unavailable.length} selected collection{unavailable.length > 1 ? 's are' : ' is'} disabled in this search mode.</a>
					</div>
					<ul id="unavailable-corpora-message-list" className="dropdown-menu">
					{
						unavailable.map((c) => <li className="unavailable-corpora-message-item">{c.name}</li>)
					}
					</ul>
				</div>
			);
        }
	}

	render() {
		return (
			<div className="container">
				<div className="row justify-content-center" style={{marginTop:64}}>
					<div className="col-xl-5 col-l-5 col-md-8 col-sm-10 col-xs-12">
						<fieldset>
							<div className="switch-toggle switch-candy orange">
								<input
									id='cql'
									name='queryTypeOptions'
									type='radio'
									value='cql'
									checked={this.state.queryTypeId === 'cql'}
									onChange={this.handleQueryTypeChange}
								/>
								<label
									htmlFor='cql'
								>
									{dictionary[this.props.languageFromMain].cql.nameBtn}
								</label>
								<input
									id='fcs'
									name='queryTypeOptions'
									type='radio'
									value='fcs'
									checked={this.state.queryTypeId === 'fcs'}
									onChange={this.handleQueryTypeChange}
								/>
								<label
									htmlFor="fcs"
								>
									{dictionary[this.props.languageFromMain].fcs.nameBtn}
								</label>
								<a></a>
							</div>
						</fieldset>
					</div>
				</div>

				<div className="row justify-content-center" style={{marginTop:30}}>
					<div className="col-12">
						{ (this.state.queryTypeId === "fcs") ? this.renderGQB() : this.renderCql() }
					</div>
				</div>

				<div className="row justify-content-center align-items-center" style={{marginTop:20}}>
					<div className="col-auto">
						<form className="form-inline">
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text nobkg">
										{dictionary[this.props.languageFromMain].aggregatorpage.searchFor}
									</span>
								</div>
{/* 								<div className="input-group">
									<Button
										label={(this.state.language === this.anyLanguage) ? 
											dictionary[this.props.languageFromMain].common.anyLanguage
											: this.state.language[1]}
										uiType='dropdown-toggle'
										onClick={this.toggleLanguageSelection}
									/>
								</div>
							</div>
						</form>
					</div>
					<div className="col-auto">
						<form className="form-inline">
							<div className="input-group mb-3"> */}
								<div className="input-group-prepend">
									<span className="input-group-text nobkg">
										{dictionary[this.props.languageFromMain].common.in}
									</span>
								</div>
								<div className="input-group">
									<Button
										label={this.state.corpora.getSelectedMessage(this.props.languageFromMain)}
										uiType='dropdown-toggle'
										onClick={this.toggleCorpusSelection}
									/>
								</div>
							</div>
						</form>
					</div>
					<div className="col-auto">
						<form className="form-inline">
							<div className="input-group mb-3">								
								<div className="input-group-prepend">
									<span className="input-group-text nobkg">
										{dictionary[this.props.languageFromMain].aggregatorpage.andShowUpTo}
									</span>
								</div>
								<div className="input-group">
									<input
										type="number"
										className="form-control input"
										min="10"
										max="250"
										style={{maxWidth:60}}
										onChange={this.setNumberOfResults.bind(this)}
										value={this.state.numberOfResults}
										onKeyPress={this.stop.bind(this)}
									/>
								</div>
								<div className="input-group-append">
									<span className="input-group-text nobkg">
										{dictionary[this.props.languageFromMain].aggregatorpage.hitsPerEndpoint}
									</span>
								</div>
							</div>
						</form>
					</div>
				</div>

				<Modal
					ref="corporaModal"
					title={<span>
							{dictionary[this.props.languageFromMain].aggregatorpage.collections}
						</span>}
					languageFromMain={this.props.languageFromMain}
				>
					<CorpusView
						corpora={this.state.corpora}
						languageMap={this.state.languageMap}
						languageFromMain={this.props.languageFromMain}
						userRole={this.props.userRole}
					/>
				</Modal>

{/* 				<Modal
					ref="languageModal"
					title={<span>
							{dictionary[this.props.languageFromMain].aggregatorpage.selectLanguage}
						</span>}
					languageFromMain={this.props.languageFromMain}
				>
					<LanguageSelector
						anyLanguage={[multipleLanguageCode, dictionary[this.props.languageFromMain].common.anyLanguage]}
						currentLanguagesMap={this.state.currentLanguagesMap}
						selectedLanguage={this.state.language}
						languageFilter={this.state.languageFilter}
						languageChangeHandler={this.setLanguageAndFilter}
						languageFromMain={this.props.languageFromMain}
					/>
				</Modal> */}

				<Modal
					ref="resultModal"
					title={this.renderZoomedResultTitle(this.state.zoomedCorpusHit)}
					languageFromMain={this.props.languageFromMain}
				>
					<ZoomedResult
						corpusHit={this.state.zoomedCorpusHit}
						nextResults={this.nextResults}
						getDownloadLink={this.getDownloadLink}
						searchedLanguage={this.state.language}
						languageMap={this.state.languageMap}
						queryTypeId={this.state.queryTypeId}
						languageFromMain={this.props.languageFromMain}
					/>
				</Modal>

				<div className="top-gap">
					<Results
						collhits={this.filterResults()}
						toggleResultModal={this.toggleResultModal}
						getDownloadLink={this.getDownloadLink}
						searchedLanguage={this.state.language}
						queryTypeId={this.state.queryTypeId}
						languageFromMain={this.props.languageFromMain}
					/>
				</div>
			</div>
		);
	}
}

function Corpora(corpora, updateFn) {
	this.corpora = corpora;
	this.update = () => updateFn(this);


	var sortFn = function(x, y) {
		var r = x.institution.name.localeCompare(y.institution.name);
		if (r !== 0) {
			return r;
		}
		return x.title.toLowerCase().localeCompare(y.title.toLowerCase());
	};

	this.recurse(function(corpus) { corpus.subCorpora.sort(sortFn); });
	this.corpora.sort(sortFn);

	this.recurse(function(corpus, index) {
		corpus.visible = true; // visible in the corpus view
		corpus.selected = true; // selected in the corpus view
		corpus.expanded = false; // not expanded in the corpus view
		corpus.priority = 1; // used for ordering search results in corpus view
		corpus.index = index; // original order, used for stable sort
		corpus.edit = false; // edit panel not expanded in the corpus view
	});
}

Corpora.prototype.recurseCorpus = function(corpus, fn) {
	if (false === fn(corpus)) {
		// no recursion
	} else {
		this.recurseCorpora(corpus.subCorpora, fn);
	}
};

Corpora.prototype.recurseCorpora = function(corpora, fn) {
	var recfn = function(corpus, index){
		if (false === fn(corpus, index)) {
			// no recursion
		} else {
			corpus.subCorpora.forEach(recfn);
		}
	};
	corpora.forEach(recfn);
};

Corpora.prototype.recurse = function(fn) {
	this.recurseCorpora(this.corpora, fn);
};

Corpora.prototype.getLanguageCodes = function() {
	var languages = {};
	this.recurse(function(corpus) {
		corpus.languages.forEach(function(lang) {
			languages[lang] = true;
		});
		return true;
	});
	return languages;
};

Corpora.prototype.getLayers = function(languageFromMain) {
	const layers = {};
	Object.assign(layers, { word: { layerOperators: { 'IS' : 'IS'}, valueOptions: {} }});
	this.recurse(function(corpus) {
		corpus.endpoint.layers.forEach(layer => {
			if (corpus.selected) {
				if (layers.hasOwnProperty(layer.name)) {
					layer.layerOperators.forEach(layerOpt => {
						Object.assign(layers[layer.name].layerOperators, {[layerOpt]: layerOpt});
					});
					layer.valueOptions.forEach(valOpt => {
						Object.assign(layers[layer.name].valueOptions, {[valOpt.name]: valOpt.name});
					});
				} else {
					const layerOperators = {};
					layer.layerOperators.forEach(layerOpt => {
						Object.assign(layerOperators, {[layerOpt]: layerOpt});
					});
					const valOpts = {};
					layer.valueOptions.forEach(valOpt => {
						Object.assign(valOpts, {[valOpt.name]: valOpt.name});
					});
					Object.assign(layers, { [layer.name] : { layerOperators: layerOperators, valueOptions: valOpts } });
				}
			}
		});
		return true;
	});
	const currentLayers = {};
	const layerKeys = Object.keys(layers);
	const wordLayer = (layerKeys[0] === 'word') && layerKeys.shift();
	const layerKeysLanguageMap = layerKeys.map(key => {
		if (dictionary[languageFromMain].queryinput.layer[key]) {
			return [dictionary[languageFromMain].queryinput.layer[key], key];
		} else {
			return [key, key];
		}
	});
	layerKeysLanguageMap.sort();
	const sortedLayerKeys = layerKeysLanguageMap.map(layer => layer[1])
	sortedLayerKeys.unshift(wordLayer);
	sortedLayerKeys.forEach(key => {
		Object.assign(currentLayers, { [key] :
			{ layerOperators: sortLayerOperators(Object.keys(layers[key].layerOperators)),
				valueOptions: Object.keys(layers[key].valueOptions) } });
	});
	return currentLayers;
}

/* Corpora.prototype.getCurrentLanguages = function(languageMap) {
	const languages = {};
	this.recurse(function(corpus) {
		corpus.languages.forEach(language => {
			if (corpus.selected) {
				if (!languages.hasOwnProperty(language)) {
					languages[language] = languageMap[language];
				}
			}
		});
		return true;
	});
	return languages;
} */

Corpora.prototype.isCorpusVisible = function(corpus, queryTypeId, languageCode) {
	if (queryTypeId === "fcs" && (corpus.endpoint.protocol === "LEGACY" || corpus.endpoint.protocol === "VERSION_1")) {
	    return false;
	}
	// yes for any language
	if (languageCode === multipleLanguageCode) {
		return true;
	}
	// yes if the corpus is in only that language
	if (corpus.languages && corpus.languages.length === 1 && corpus.languages[0] === languageCode) {
		return true;
	}

	// ? yes if the corpus also contains that language
	if (corpus.languages && corpus.languages.indexOf(languageCode) >=0) {
		return true;
	}

	return false;
};

Corpora.prototype.setVisibility = function(queryTypeId, languageCode) {
	// top level
	this.corpora.forEach((corpus) => {
		corpus.visible = this.isCorpusVisible(corpus, queryTypeId, languageCode);
		this.recurseCorpora(corpus.subCorpora, function(c) { c.visible = corpus.visible; });
	});
};

Corpora.prototype.setAggregationContext = function(endpoints2handles) {
	var selectSubTree = function(select, corpus) {
		corpus.selected = select;
		this.recurseCorpora(corpus.subCorpora, function(c) { c.selected = corpus.selected; });
	};

	this.corpora.forEach(selectSubTree.bind(this, false));

	var corporaToSelect = [];
	pairs(endpoints2handles).forEach((endp) => {
		var endpoint = endp[0];
		var handles = endp[1];
	   //  console.log(endpoint);
	   //  console.log(handles);
		handles.forEach((handle) => {
			this.recurse(function(corpus){
				if (corpus.handle === handle) {
					corporaToSelect.push(corpus);
				}
			});
		});
	});

	corporaToSelect.forEach(selectSubTree.bind(this, true));
};

function pairs(o) {
	var ret = [];
	for (var x in o) {
		if (o.hasOwnProperty(x)) {
			ret.push([x, o[x]]);
		}
	}
	return ret;
}

Corpora.prototype.getSelectedIds = function() {
	var ids = [];
	this.recurse(function(corpus) {
		if (corpus.visible && corpus.selected) {
			ids.push(corpus.id);
			// return false; // top-most collection in tree, don't delve deeper
		}
		return true;
	});
	
	return ids;
};

Corpora.prototype.getSelectedMessage = function(languageFromMain) {
	var selectedIdsCount = this.getSelectedIds().length;
	if (this.corpora.length === selectedIdsCount) {
		return `${dictionary[languageFromMain].corpusview.selected.all} (${selectedIdsCount})`;
	} else if (selectedIdsCount === 1) {
		return dictionary[languageFromMain].corpusview.selected.one;
	}
	return `${selectedIdsCount} ${dictionary[languageFromMain].corpusview.selected.some}`;
};

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
   //  console.log("vars: ", vars);
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
	   //  console.log("variable found: (", variable, ") = ", decodeURIComponent(pair[1]));
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}

/* setter opposite of getQueryVariable*/
function setQueryVariable(qvar, value) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    var d = {};
    d[qvar] = value;
    var found = false;
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === qvar) {
            
            vars[i] = encodeQueryData(d);
            found=true;
            break;
        }
    }
    
    if (!found) {
        // add to end of url
        vars.push(encodeQueryData(d));
    }
    
    var searchPart = vars.join('&');
    var newUrl = window.location.origin + window.location.pathname+'?'+searchPart;
    // console.log("set url", newUrl);
    window.history.replaceState(window.history.state, null, newUrl);
}

function encodeQueryData(data)
{
	var ret = [];
	for (var d in data) {
		ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
	}
	return ret.join("&");
}

const updateState = (corpora, languageFromMain) => /* ({languageMap}) => */ ({
	corpora,
	layerMap: corpora.getLayers(languageFromMain),
	// currentLanguagesMap: corpora.getCurrentLanguages(languageMap)
})

export default AggregatorPage;
