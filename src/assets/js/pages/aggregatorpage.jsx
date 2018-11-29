import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CorpusView from "../components/corpusview.jsx";
import LanguageSelector from "../components/languageselector.jsx"
import Modal from "../components/modal.jsx";
import Results from "../components/results.jsx";
import QueryInput from "../components/queryinput.jsx";
import ZoomedResult from "../components/zoomedresult.jsx";
import PropTypes from "prop-types";
import $ from 'jquery';
import 'bootstrap';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';
import { back_end_host } from '../constants/constants';

var PT = PropTypes;

window.MyAggregator = window.MyAggregator || {};
var multipleLanguageCode = window.MyAggregator.multipleLanguageCode = "mul"; // see ISO-693-3

class AggregatorPage extends Component {
	static propTypes = {
	 	ajax: PT.func.isRequired,
	 	error: PT.func.isRequired,
		languageFromMain: PT.string.isRequired,
	} 

	nohits = {
		results: null,
	}

	anyLanguage = [multipleLanguageCode, dictionary[this.props.languageFromMain].common.anyLanguage];

	queryTypes = [
		{
			id: 'cql',
			searchLabelBkColor: 'rgba(220, 133, 46, .3)',
			className: '',
		},
		{
			id: "fcs",
			searchLabelBkColor: "rgba(40, 85, 143, .3)",
			disabled: false,
		},
	];
	
	queryTypeMap = {
			 cql: this.queryTypes[0],
			 fcs: this.queryTypes[1],
	};

	constructor(props) {
		super(props);
		this.state = {
			corpora: new Corpora([], this.updateCorpora),
			languageMap: {},
			weblichtLanguages: [],
	        queryTypeId: getQueryVariable('queryType') || 'cql',
			query: getQueryVariable('query') || '',
			aggregationContext: getQueryVariable('x-aggregation-context') || '',
			language: this.anyLanguage,
			languageFilter: 'byMeta',
			numberOfResults: 10,

			searchId: null,
			timeout: 0,
			hits: this.nohits,

			zoomedCorpusHit: null,
		    _isMounted: false,
		};
	}

	componentDidMount() {
		this.setState({_isMounted: true});
			
		this.props.ajax({
			url: back_end_host + 'rest/init',
			success: (json, textStatus, jqXHR) => {
				if (this.state._isMounted) {
					var corpora = new Corpora(json.corpora, this.updateCorpora);
					window.MyAggregator.corpora = json.corpora;
					this.setState({
						corpora : corpora,
						languageMap: json.languages,
						query: this.state.query || json.query || '',
					});
					if (this.state.aggregationContext && !json['x-aggregation-context']) {
						json['x-aggregation-context'] = JSON.parse(this.state.aggregationContext);
						console.log(json['x-aggregation-context']);
					}
					if (json['x-aggregation-context']) {
						window.MyAggregator.xAggregationContext = json["x-aggregation-context"];
						corpora.setAggregationContext(json["x-aggregation-context"]);
						if (!corpora.getSelectedIds().length) {
							this.props.error(dictionary[this.props.languageFromMain].errors.cannotFindRequiredCollection);
							corpora.recurse(function(corpus) { corpus.selected = true; });
						}
						corpora.update();
					}
					this.state.corpora.setVisibility(this.state.queryTypeId, this.state.language[0]);

					if (getQueryVariable('mode') === 'search' || json.mode === 'search') {
						window.MyAggregator.mode = 'search';
						this.search();
					}
				}
			}
		});
	}

	updateCorpora = corpora => {
		this.setState({corpora});
	}

	search = () => {
		var _paq = [];

		var query = this.state.query;
		var queryTypeId = this.state.queryTypeId;
		if (!query) {
			this.setState({ hits: this.nohits, searchId: null });
			return;
		}
		var selectedIds = this.state.corpora.getSelectedIds();
		if (!selectedIds.length) {
			this.props.error(dictionary[this.props.languageFromMain].errors.selectCollection);
			return;
		}

		this.props.ajax({
			url: back_end_host + 'search',
			type: "POST",
			data: {
				query: query,
				queryType: queryTypeId,
				language: this.state.language[0],
				numberOfResults: this.state.numberOfResults,
				corporaIds: selectedIds,
			},
			success: (searchId, textStatus, jqXHR) => {
					if (Location.hostname !== "localhost") {
						_paq.push(['trackSiteSearch', query, queryTypeId, false]);
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
		if (!this.state.searchId || !this.state._isMounted) {
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

	setQueryType = queryTypeId => {
		this.state.corpora.setVisibility(queryTypeId, this.state.language[0]);
		this.setState({
			queryTypeId: queryTypeId,
			hits: this.nohits,
			searchId: null,
		    displayADV: queryTypeId === "fcs" ? true : false,
			corpora: this.state.corpora,
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

	toggleResultModal = (e, corpusHit) => {
	    $(ReactDOM.findDOMNode(this.refs.resultModal)).modal();
		this.setState({zoomedCorpusHit: corpusHit});
		e.preventDefault();
		e.stopPropagation();
	}

	onQuery = event => {
		this.setState({query: event.target.value});
	}

    onADVQuery = fcsql => {
	    this.setState({query: fcsql.target.value});
	}

	handleKey = event => {
		if (event.keyCode === 13) {
			this.search();
		}
	}

    handleADVKey = event => {
	    if (event.keyCode === 13) {
			this.addADVToken();
	    }
	}
	
	renderZoomedResultTitle = corpusHit => {
		if (!corpusHit) return (<span/>);
		var corpus = corpusHit.corpus;
		return (
			<span>
				{corpus.title}
				{ corpus.landingPage ?
					<a href={corpus.landingPage} onClick={this.stop} style={{fontSize:12}}>
						<span>
							{dictionary[this.props.languageFromMain].common.homepage}
						</span>
						<i className="fa fa-home"/>
					</a>: false}
			</span>
		);
	}

	renderSearchButtonOrLink = () => {
		return (
			<Button
				label={<i className="fa fa-search"></i>}
				onClick={this.search}
			/>
		);
	}

	render() {
		var queryType = this.queryTypeMap[this.state.queryTypeId];
		return (
			<div className="container">
				<div className="row justify-content-center" style={{marginTop:64}}>
					<div className="col-12">
						<div className="aligncenter">
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" style={{backgroundColor:queryType.searchLabelBkColor}}>
										{dictionary[this.props.languageFromMain][this.state.queryTypeId].searchLabel}
									</span>
								</div>
								<QueryInput 
									searchedLanguages={this.state.searchedLanguages || [multipleLanguageCode]}
									queryTypeId={this.state.queryTypeId}
									query={this.state.query}
									placeholder={dictionary[this.props.languageFromMain][this.state.queryTypeId].placeholder}
									onChange={this.onADVQuery}
									onQuery={this.onQuery}
									onKeyDown={this.handleKey}
									languageFromMain={this.props.languageFromMain}
								/>
								<div className="input-group-append">
									{this.renderSearchButtonOrLink()}
								</div>
							</div>
						</div>
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
								<div className="input-group">
									<Button
										label={this.state.language[1]}
										uiType='dropdown-toggle'
										onClick={this.toggleLanguageSelection}
									/>
								</div>
							</div>
						</form>
					</div>
					<div className="col-auto">
						<form className="form-inline">
							<div className="input-group mb-3">
								<div className="input-group">
									<Button
										label={dictionary[this.props.languageFromMain][this.state.queryTypeId].name}
										uiType='dropdown-toggle dropdown-toggle-split'
										aria-expanded="false"
										data-toggle="dropdown"
									/>
									<ul ref="queryTypeDropdownMenu" className="dropdown-menu">
										{ this.queryTypes.map(l => {
												var cls = l.disabled ? 'disabled':'dropdown-item';
												var handler = () => { if (!l.disabled) this.setQueryType(l.id); };
												return (
													<li 
														key={l.id}
														className={cls}
													>
														<a tabIndex="-1" href="#" onClick={handler}>
															{dictionary[this.props.languageFromMain][l.id].name}
														</a>
													</li>
												);
											})
										}
									</ul>
								</div>
							</div>
						</form>
					</div>
				</div>
				<div className="row justify-content-center" >
					<div className="col-auto">
						<form className="form-inline">
							<div className="input-group mb-3">
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
										style={{width:60}}
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
					/>
				</Modal>

				<Modal
					ref="languageModal"
					title={<span>
							{dictionary[this.props.languageFromMain].aggregatorpage.selectLanguage}
						</span>}
					languageFromMain={this.props.languageFromMain}
				>
					<LanguageSelector
						anyLanguage={[multipleLanguageCode, dictionary[this.props.languageFromMain].common.anyLanguage]}
						languageMap={this.state.languageMap}
						selectedLanguage={this.state.language}
						languageFilter={this.state.languageFilter}
						languageChangeHandler={this.setLanguageAndFilter}
						languageFromMain={this.props.languageFromMain}
					/>
				</Modal>

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
	    console.log(endpoint);
	    console.log(handles);
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
			return false; // top-most collection in tree, don't delve deeper
		}
		return true;
	});

	return ids;
};

Corpora.prototype.getSelectedMessage = function(languageFromMain) {
	var selectedIdsCount = this.getSelectedIds().length;
	if (this.corpora.length === selectedIdsCount) {
		return `${dictionary[languageFromMain].corpusview.allCollectionsSelected} (${selectedIdsCount})`;
	} else if (selectedIdsCount === 1) {
		return dictionary[languageFromMain].corpusview.oneCollectionSelected;
	}
	return `${selectedIdsCount} ${dictionary[languageFromMain].corpusview.someCollectionsSelected}`;
};

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    console.log("vars: ", vars);
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) === variable) {
	    console.log("variable found: (", variable, ") = ", decodeURIComponent(pair[1]));
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}

function encodeQueryData(data)
{
	var ret = [];
	for (var d in data) {
		ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
	}
	return ret.join("&");
}

export default AggregatorPage;
