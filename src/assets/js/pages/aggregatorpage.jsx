// "use strict";
import classNames from "classnames";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import CorpusView from "../components/corpusview.jsx";
import LanguageSelector from "../components/languageselector.jsx"
import Modal from "../components/modal.jsx";
import Results from "../components/results.jsx";
import QueryInput from "../components/queryinput.jsx";
import ZoomedResult from "../components/zoomedresult.jsx";
import PropTypes from "prop-types";
// import createReactClass from "create-react-class";
import $ from 'jquery';
import jQuery from 'jquery';
import _ from "../components/results.jsx";
import 'bootstrap';
import {FormattedMessage, injectIntl, intlShape, defineMessages} from 'react-intl';

var PT = PropTypes;

 
window.MyAggregator = window.MyAggregator || {};
var multipleLanguageCode = window.MyAggregator.multipleLanguageCode = "mul"; // see ISO-693-3

// var AggregatorPage = createReactClass({
// fixme! - class AggregatorPage extends React.Component {
class AggregatorPage extends Component {
	static propTypes = {
	 	ajax: PT.func.isRequired,
	 	error: PT.func.isRequired,
		embedded: PT.bool.isRequired,
		languageFromMain: PT.string.isRequired,
	}//, 

	nohits = {
		results: null,
	}//,
	
	anyLanguages = {
		ee: 'igas keeles',
		en: 'Any language'
	}

	anyLanguage = [multipleLanguageCode, 
		<FormattedMessage
			id='any.language'
			description='Any Language translation'
			defaultMessage='Any Language'
		/>];//,

	searchPlaceholders = [
		{
			ee: 'Koer',
			en: 'Elephant'
		},
		{
			ee: "[sõna = 'märkus'][sõna = 'keskendunud']",
			en: "[word = 'annotation'][word = 'focused']"
		}
	]

	placeholderMap = {
		cql: this.searchPlaceholders[0],
		fcs: this.searchPlaceholders[1]
	}

	queryTypes = [
		{
			id: 'cql',
			name: 
				<FormattedMessage
					id='cql.query.name' 
					description='CQL query name translation'
					defaultMessage='Text layer Contextual Query Language (CQL)'
				/>,
/* 			searchPlaceholder: this.placeholderForCQL[this.props.languageFromMain], */
			searchLabel:
				<FormattedMessage
					id='cql.query.searchLabel'
					description='search label for CQL query translation'
					defaultMessage='Text layer CQL query'
				/>,
			searchLabelBkColor: 'rgba(220, 133, 46, .3)',
			className: '',
		},
		{
			id: "fcs",
			name: 
				<FormattedMessage
					id='fcsql.query.name'
					description='FCS-QL query name translation'
					defaultMessage='Multi-layer Federated Content Search Query Language (FCS-QL)'
				/>,
/* 			searchPlaceholder: this.placeholderForFCSQL[this.props.languageFromMain], */
			searchLabel: 
				<FormattedMessage
					id='fcsql.query.searchLabel'
					description='search label for FCS-QL query translation'
					defaultMessage='Multi-layer FCS query'
				/>,
			searchLabelBkColor: "rgba(40, 85, 143, .3)",
			disabled: false,
		},
	];
	
	queryTypeMap = {
			 cql: this.queryTypes[0],
			 fcs: this.queryTypes[1],
	};

	// getInitialState/*: function */() {
	// 	return {
	// 		corpora: new Corpora([], this.updateCorpora),
	// 		languageMap: {},
	// 		weblichtLanguages: [],
	//                 queryTypeId: getQueryVariable('queryType') || 'cql',
	// 		query: getQueryVariable('query') || '',
	// 		aggregationContext: getQueryVariable('x-aggregation-context') || '',
	// 		language: this.anyLanguage,
	// 		languageFilter: 'byMeta',
	// 		numberOfResults: 10,

	// 		searchId: null,
	// 		timeout: 0,
	// 		hits: this.nohits,

	// 		zoomedCorpusHit: null,
	// 	        _isMounted: false
	// 	};
	// }
	

	constructor/*: function */(props) {
		super(props);
		this.state = {
			corpora: new Corpora([], this.updateCorpora),
			languageMap: {est: "Eesti", fin: "Soome", rus: "Vene", eng: "Inglise", swe: "Rootsi", alb: "Albaania"},
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

	componentDidMount/*: function*/() {
		// this.setState({_isMounted: true});
			
		this.props.ajax({
			url: 'init',
			success: (json, textStatus, jqXHR) => {
				// if (this.state._isMounted) {
				var corpora = new Corpora(json.corpora, this.updateCorpora);
				window.MyAggregator.corpora = json.corpora;
				this.setState({
					corpora : corpora,
					languageMap: json.languages,
					// weblichtLanguages: json.weblichtLanguages,
					query: this.state.query || json.query || '',
				});
				// for testing aggregation context
				json['x-aggregation-context'] = {
					'EKUT': ["http://hdl.handle.net/11858/00-1778-0000-0001-DDAF-D"]
				};
				if (this.state.aggregationContext && !json['x-aggregation-context']) {
					json['x-aggregation-context'] = JSON.parse(this.state.aggregationContext);
					console.log(json['x-aggregation-context']);
				}
				if (json['x-aggregation-context']) {
					window.MyAggregator.xAggregationContext = json["x-aggregation-context"];
					corpora.setAggregationContext(json["x-aggregation-context"]);
					if (!corpora.getSelectedIds().length) {
						this.props.error("Cannot find the required collection, will search all collections instead");
						corpora.recurse(function(corpus) { corpus.selected = true; });
					}
					corpora.update();
				}
				// Setting visibility, e.g. only corpora 
				// from v2.0 endpoints for fcs v2.0
				this.state.corpora.setVisibility(this.state.queryTypeId, this.state.language[0]);
				// corpora.update();

				if (getQueryVariable('mode') === 'search' || json.mode === 'search') {
					window.MyAggregator.mode = 'search';
					this.search();
				}
				// }
			}
		});
	}

	updateCorpora = corpora => {
		this.setState({corpora});
	}

	search = () => {
		var query = this.state.query;
		var queryTypeId = this.state.queryTypeId;
		if (!query || this.props.embedded) {
			this.setState({ hits: this.nohits, searchId: null });
			return;
		}
		var selectedIds = this.state.corpora.getSelectedIds();
		if (!selectedIds.length) {
			this.props.error('Please select a collection to search into');
			return;
		}

		// console.log("searching in the following corpora:", selectedIds);
		// console.log("searching with queryType:", queryTypeId);
		this.props.ajax({
			url: 'rest/search',
			type: "POST",
			data: {
				query: query,
				queryType: queryTypeId,
				language: this.state.language[0],
				numberOfResults: this.state.numberOfResults,
				corporaIds: selectedIds,
			},
			success: (searchId, textStatus, jqXHR) => {
				// console.log("search ["+query+"] ok: ", searchId, jqXHR);
			        //Piwik.getAsyncTracker().trackSiteSearch(query, queryTypeId);
			        // automatic inclusion of piwik in prod
			        //console.log("location.hostname: " + location.hostname);
			    //     if (location.hostname !== "localhost") {
				//    //console.log("location.host: " + location.host);
			    //        _paq.push(['trackSiteSearch', query, queryTypeId, false]);
			    //     }

				var timeout = 250;
				setTimeout(this.refreshSearchResults, timeout);
				this.setState({ searchId: searchId, timeout: timeout });
			}
		});
	}

	nextResults = corpusId => {
		// console.log("searching next results in corpus:", corpusId);
		this.props.ajax({
			url: 'rest/search/'+this.state.searchId,
			type: "POST",
			data: {
			corpusId: corpusId,
			numberOfResults: this.state.numberOfResults,
			},
			success: (searchId, textStatus, jqXHR) => {
				// console.log("search ["+query+"] ok: ", searchId, jqXHR);
				var timeout = 250;
				setTimeout(this.refreshSearchResults, timeout);
				this.setState({ searchId: searchId, timeout: timeout });
			}
		});
	}

	refreshSearchResults = () => {
		if (!this.state.searchId || !this.state._isMounted) {
			return;
		}
		this.props.ajax({
			url: 'rest/search/'+this.state.searchId,
			success: (json, textStatus, jqXHR) => {
				var timeout = this.state.timeout;
				if (json.inProgress) {
					if (timeout < 10000) {
						timeout = 1.5 * timeout;
					}
					setTimeout(this.refreshSearchResults, timeout);
					// console.log("new search in: " + this.timeout + "ms");
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
		return 'rest/search/' + this.state.searchId + '/download?' +
			this.getExportParams(corpusId, format);
	}

/* 	getToWeblichtLink = (corpusId, forceLanguage) => {
		return 'rest/search/' + this.state.searchId + '/toWeblicht?' +
			this.getExportParams(corpusId, null, forceLanguage);
	} */

	setLanguageAndFilter = (languageObj, languageFilter) => {
		this.state.corpora.setVisibility(this.state.queryTypeId,
			languageFilter === 'byGuess' ? multipleLanguageCode : languageObj[0]);
		this.setState({
			language: languageObj,
			languageFilter: languageFilter,
			corpora: this.state.corpora, // === this.state.corpora.update();
		});
	}

	setQueryType = queryTypeId => {
		this.state.corpora.setVisibility(queryTypeId, this.state.language[0]);
		this.setState({
			queryTypeId: queryTypeId,
			hits: this.nohits,
			searchId: null,
		    displayADV: queryTypeId === "fcs" ? true : false,
			corpora: this.state.corpora, // === this.state.corpora.update();
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

	stop/*: function*/(e) {
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
	}//,

	toggleCorpusSelection = e => {
	    $(ReactDOM.findDOMNode(this.refs.corporaModal)).modal();
		e.preventDefault();
		e.stopPropagation();
	}//,

	toggleResultModal = (e, corpusHit) => {
	    $(ReactDOM.findDOMNode(this.refs.resultModal)).modal();
		this.setState({zoomedCorpusHit: corpusHit});
		e.preventDefault();
		e.stopPropagation();
	}//,

	onQuery = event => {
		this.setState({query: event.target.value});
	}//,

    onADVQuery = fcsql => {
	    this.setState({query: fcsql.target.value});
	}//,

	handleKey = event => {
		if (event.keyCode === 13) {
			this.search();
		}
	}//,

    handleADVKey = event => {
	    if (event.keyCode === 13) {
			this.addADVToken();
	    }
	}//,

	error = errObj => {
		var err = ''
		if (typeof errObj === 'string' || errObj instanceof String) {
		    err = errObj
		} else if (typeof errObj === 'object' && errObj.statusText) {
		    console.log('ERROR: jqXHR = ', errObj)
		    err = errObj.statusText
		} else {
		    return
		}
	
		// var that = this;
		var errs = this.state.errorMessages.slice()
		errs.push(err)
		this.setState({ errorMessages: errs })
	
		setTimeout(() => {
		    var errs = this.state.errorMessages.slice()
		    errs.shift()
		    this.setState({ errorMessages: errs })
		}, 10000)
	} //,
	
	ajax = ajaxObject => {
		ajaxObject.error = ajaxObject.error || this.handleAjaxError
		jQuery.ajax(ajaxObject)
	}
	
	handleAjaxError = (jqXHR, textStatus, error) => {
		if (jqXHR.readyState === 0) {
			this.error('Network error, please check your internet connection')
		} else if (jqXHR.responseText) {
			this.error(jqXHR.responseText + ' (' + error + ')')
		} else {
			this.error(error + ' (' + textStatus + ')')
		}
		console.log('ajax error, jqXHR: ', jqXHR)
	}
	
	renderZoomedResultTitle = corpusHit => {
		if (!corpusHit) return (<span/>);
		var corpus = corpusHit.corpus;
		return (<h3 style={{fontSize:'1em'}}>
					{corpus.title}
					{ corpus.landingPage ?
						<a href={corpus.landingPage} onClick={this.stop} style={{fontSize:12}}>
							<span> - Homepage </span>
							<i className="fa fa-home"/>
						</a>: false} </h3>);
	}//,

	renderSearchButtonOrLink = () => {
		if (this.props.embedded) {
			var query = this.state.query;
			var queryTypeId = this.state.queryTypeId;
		    var btnClass = classNames({
			    'btn': true,
			    'btn-default': queryTypeId === 'cql',
			    'input-lg': true,
			});
			var newurl = !query ? "#" :
				(window.MyAggregator.URLROOT + "?" + encodeQueryData({queryType:queryTypeId, query:query, mode:'search'}));
			return (
				<a className={btnClass} style={{paddingTop:13}}
					type="button" target="_blank" href={newurl}>
					<i className="fa fa-search"></i>
				</a>
			);
		}
		return (
		    <button className="btn btn-outline-secondary" type="button" onClick={this.search}>
				<i className="fa fa-search"></i>
		    </button>
		);
	}//,

	render/*: function*/() {
		var queryType = this.queryTypeMap[this.state.queryTypeId];
		var correctPlaceholder = this.placeholderMap[this.state.queryTypeId];
		return	(
			<div className="container">
				<div className="row justify-content-center" style={{marginTop:64}}>
					<div className="col-12">
						<div className="aligncenter">
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" style={{backgroundColor:queryType.searchLabelBkColor}}>
										{queryType.searchLabel}
									</span>
								</div>
								<QueryInput 
									searchedLanguages={this.state.searchedLanguages || [multipleLanguageCode]}
									queryTypeId={this.state.queryTypeId}
									query={this.state.query}
									embedded={this.props.embedded}
									placeholder={correctPlaceholder[this.props.languageFromMain]}
									onChange={this.onADVQuery}
									onQuery={this.onQuery}
									onKeyDown={this.handleKey} />

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
										<FormattedMessage
											id='search.for'
											description='Search for translation'
											defaultMessage='Search for'
										/>
									</span>
								</div>
								<div className="input-group">
									<button className="btn btn-outline-secondary dropdown-toggle"
											onClick={this.toggleLanguageSelection}>
										{this.state.language[1]} 
									</button>
								</div>
							</div>
						</form>
					</div>
					<div className="col-auto">
						<form className="form-inline">
							<div className="input-group mb-3">
								<div className="input-group">
									<button className="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
											aria-expanded="false"
											data-toggle="dropdown">
										{queryType.name}
									</button>
									<ul ref="queryTypeDropdownMenu" className="dropdown-menu">
										{ 	this.queryTypes.map((l) => {
												var cls = l.disabled ? 'disabled':'dropdown-item';
												var handler = () => { if (!l.disabled) this.setQueryType(l.id); };
												return (<li key={l.id} className={cls}> <a tabIndex="-1" href="#"
													onClick={handler}> {l.name} </a></li>);
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
										<FormattedMessage
											id='aggregatorpage.in'
											description='in translation'
											defaultMessage='in'
										/>
									</span>
								</div>
								<div className="input-group">
									<button	type="button"
											className="btn btn-outline-secondary dropdown-toggle"
											onClick={this.toggleCorpusSelection}>
										{this.state.corpora.getSelectedMessage()}
									</button>
								</div>
								<div className="input-group-prepend">
									<span className="input-group-text nobkg">
										<FormattedMessage
											id='aggregatorpage.andShowUpTo'
											description='and show up to translation'
											defaultMessage='and show up to'
										/>
									</span>
								</div>
								<div className="input-group">
									<input type="number" className="form-control input" min="10" max="250"
										style={{width:60}}
										onChange={this.setNumberOfResults.bind(this)} value={this.state.numberOfResults}
										onKeyPress={this.stop.bind(this)}/>
								</div>
								<div className="input-group-append">
									<span className="input-group-text nobkg">
										<FormattedMessage 
											id='aggregatorpage.hitsPerEndpoint'
											description='hits per endoint translation'
											defaultMessage='hits per endpoint'
										/>
									</span>
								</div>
							</div>
						</form>
					</div>
				</div>

				<Modal ref="corporaModal" title={<span>
					<FormattedMessage
						id='collections'
						description='collections translation'
						defaultMessage='Collections'
					/>
					</span>}>
					<CorpusView corpora={this.state.corpora} languageMap={this.state.languageMap} />
				</Modal>

				<Modal ref="languageModal" title={<span>
					<FormattedMessage
						id='select.language'
						description='select language translation'
						defaultMessage='Select Language'
					/>
					</span>}>
					<LanguageSelector anyLanguage={[multipleLanguageCode, this.anyLanguages[this.props.languageFromMain]]}
									  languageMap={this.state.languageMap}
									  selectedLanguage={this.state.language}
									  languageFilter={this.state.languageFilter}
									  languageChangeHandler={this.setLanguageAndFilter} />
				</Modal>

				<Modal ref="resultModal" title={this.renderZoomedResultTitle(this.state.zoomedCorpusHit)}>
					<ZoomedResult corpusHit={this.state.zoomedCorpusHit}
								  nextResults={this.nextResults}
								  getDownloadLink={this.getDownloadLink}
								  searchedLanguage={this.state.language}
								  languageMap={this.state.languageMap} 
						          queryTypeId={this.state.queryTypeId} />
				</Modal>

				<div className="top-gap">
					<Results collhits={this.filterResults()}
							 toggleResultModal={this.toggleResultModal}
							 getDownloadLink={this.getDownloadLink}
							 searchedLanguage={this.state.language}
					         queryTypeId={this.state.queryTypeId}/>
				</div>
			</div>
			);
	}//,
}//);

function Corpora(corpora, updateFn) {
/* 	var that = this;
	this.corpora = corpora;
	this.update = function() {
		updateFn(that);
	}; */

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

	// ? yes if the corpus has no language
	// if (!corpus.languages || corpus.languages.length === 0) {
	// 	return true;
	// }
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
	    console.log(endp);
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

	// console.log("ids: ", ids.length, {ids:ids});
	return ids;
};

Corpora.prototype.getSelectedMessage = function() {
	var selectedIdsCount = this.getSelectedIds().length;
	if (this.corpora.length === selectedIdsCount) {
		return (
			<FormattedMessage
				id='front.page.all.collections.selected'
				description='all available collections translation'
				defaultMessage='All available collections ({amount})'
				values= {{
					amount: selectedIdsCount
				}}
			/>
		);
	} else if (selectedIdsCount === 1) {
		return (
			<FormattedMessage
				id='front.page.one.collection.selected'
				description='one selected collection translation'
				defaultMessage='1 selected collection'
			/>
		);
	}
	return (
		<FormattedMessage
			id='front.page.some.collections.selected'
			description='some collections selected translation'
			defaultMessage='{amount} selected collections'
			values= {{
				amount: selectedIdsCount
			}}
		/>
	);
};

// function Corpora(corpora, updateFn) {
// 	var that = this;
// 	this.corpora = corpora;
// 	this.update = function() {
// 		updateFn(that);
// 	};

// 	var sortFn = function(x, y) {
// 		var r = x.institution.name.localeCompare(y.institution.name);
// 		if (r !== 0) {
// 			return r;
// 		}
// 		return x.title.toLowerCase().localeCompare(y.title.toLowerCase());
// 	};

// 	this.recurse(function(corpus) { corpus.subCorpora.sort(sortFn); });
// 	this.corpora.sort(sortFn);

// 	this.recurse(function(corpus, index) {
// 		corpus.visible = true; // visible in the corpus view
// 		corpus.selected = true; // selected in the corpus view
// 		corpus.expanded = false; // not expanded in the corpus view
// 		corpus.priority = 1; // used for ordering search results in corpus view
// 		corpus.index = index; // original order, used for stable sort
// 	});
// }

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

// function Corpora(corpora, updateFn) {
// 	var that = this;
// 	this.corpora = corpora;
// 	this.update = function() {
// 		updateFn(that);
// 	};

// 	var sortFn = function(x, y) {
// 		var r = x.institution.name.localeCompare(y.institution.name);
// 		if (r !== 0) {
// 			return r;
// 		}
// 		return x.title.toLowerCase().localeCompare(y.title.toLowerCase());
// 	};

// 	this.recurse(function(corpus) { corpus.subCorpora.sort(sortFn); });
// 	this.corpora.sort(sortFn);

// 	this.recurse(function(corpus, index) {
// 		corpus.visible = true; // visible in the corpus view
// 		corpus.selected = true; // selected in the corpus view
// 		corpus.expanded = false; // not expanded in the corpus view
// 		corpus.priority = 1; // used for ordering search results in corpus view
// 		corpus.index = index; // original order, used for stable sort
// 	});
// }

function encodeQueryData(data)
{
	var ret = [];
	for (var d in data) {
		ret.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
	}
	return ret.join("&");
}

/* const CqlDefaultMessage = ({intl}) => {
	const placeholder = intl.formatMessage({id: 'cql.query.searchPlaceholder'})
	return (
		<input placeholder={placeholder} />
	);
}

			<FormattedMessage
				id='cql.query.searchPlaceholder'
				description='placeholder in CQL search field translation'
				defaultMessage='Elephant'
			/>,

CqlDefaultMessage.propTypes = {
	intl: intlShape.isRequired
} */

/* const thatThing = {
	ee: 'Koer',
	en: 'Elephant'
}

const 

var queryTypes = [
	{
		id: 'cql',
		name: 
			<FormattedMessage
				id='cql.query.name' 
				description='CQL query name translation'
				defaultMessage='Text layer Contextual Query Language (CQL)'
			/>,
		searchPlaceholder: thatThing['ee'],
		searchLabel:
			<FormattedMessage
				id='cql.query.searchLabel'
				description='search label for CQL query translation'
				defaultMessage='Text layer CQL query'
			/>,
		searchLabelBkColor: 'rgba(220, 133, 46, .3)',
		className: '',
	},
	{
		id: "fcs",
		name: 
			<FormattedMessage
				id='fcsql.query.name'
				description='FCS-QL query name translation'
				defaultMessage='Multi-layer Federated Content Search Query Language (FCS-QL)'
			/>,
		searchPlaceholder: 
			<FormattedMessage
				id='fcsql.query.searchPlaceholder'
				description='placeholder in FCS-QL search field translation'
				defaultMessage="[word = 'annotation'][word = 'focused']"
			/>,
		searchLabel: 
			<FormattedMessage
				id='fcsql.query.searchLabel'
				description='search label for FCS-QL query translation'
				defaultMessage='Multi-layer FCS query'
			/>,
		searchLabelBkColor: "rgba(40, 85, 143, .3)",
		disabled: false,
	},
];

var queryTypeMap = {
     	cql: queryTypes[0],
     	fcs: queryTypes[1],
}; */

// module.exports = AggregatorPage;
export default AggregatorPage;
