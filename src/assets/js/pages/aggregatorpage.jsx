import $ from 'jquery';
import { back_end_host } from '../constants/constants';
import 'bootstrap';
import Button from '../utilities/button';
import CorpusView from '../components/corpusview.jsx';
import dictionary from '../../../translations/dictionary';
import Modal from '../components/modal.jsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Results from '../components/results.jsx';
import QueryInput from '../components/queryinput.jsx';
import ZoomedResult from '../components/zoomedresult.jsx';

var PT = PropTypes;

window.MyAggregator = window.MyAggregator || {};
var multipleLanguageCode = window.MyAggregator.multipleLanguageCode = "mul"; // see ISO-693-3

class AggregatorPage extends Component {
	static propTypes = {
	 	ajax: PT.func,
	 	error: PT.func,
		languageFromMain: PT.string,
	} 

	nohits = {
	    tootekood: null,
		results: null,
	}
	
	anyLanguage = [multipleLanguageCode, dictionary[this.props.languageFromMain].common.anyLanguage];

	queryTypes = [
		{
			id: 'cql',
			searchLabelBkColor: 'rgba(100, 45, 150, 0.4)',
			className: '>>',
		},
		{
			id: 'fcs',
			searchLabelBkColor: 'rgba(40, 85, 143, .3)',
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
			hits: [this.nohits],

			zoomedCorpusHit: null,
		};
	}

	componentDidMount() {
	    this._isMounted = true;
			
		this.props.ajax({
			url: back_end_host + 'search',
			success: (json, textStatus, jqXHR) => {
				if (this._isMounted) {
					var corpora = new Corpora(json.corpora, this.updateCorpora);
                    var aggregationContext = json['x-aggregation-context'] || this.state.aggregationContext;
				    
				    window.MyAggregator.mode = getQueryVariable('mode') || json.mode;
					window.MyAggregator.corpora = json.corpora;
					window.MyAggregator.xAggregationContext = aggregationContext;
					
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
                        console.log("no context set, selecting all available");
                        corpora.recurse(c => {c.visible ? c.selected=true : c.selected=false})
                    }

                    this.setState({
	                    corpora : corpora,
	                    languageMap: json.languages,
	                    aggregationContext: aggregationContext,
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
		this.setState({corpora});
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
		var selectedIds = [1,2].toString()
		// if (!selectedIds.length) {
		// 	this.props.error("Palun vali partnerite ladusid");
		// 	return;
		// }
		console.log(query)
		this.props.ajax({
			url: back_end_host + 'search',
			type: "POST",
			data: {
				query: query,
				queryType: queryTypeIdForSearch,
				language: this.state.language[0],
				numberOfResults: this.state.numberOfResults,
				partnerIds: selectedIds,
			},
			success: (searchId, textStatus, jqXHR) => {
					console.log("Search response? : " + searchId[0].tootekood)
			        if (Location.hostname !== "localhost") {
					_paq.push(['trackSiteSearch', query, queryTypeIdForSearch, false]);
			        }

				var timeout = 250;
				setTimeout(this.refreshSearchResults, timeout);
				this.setState({ searchId, timeout, hits: searchId });
				//console.log("Current state of searchId: " + this.state.searchId)
				//console.log("First occurence of hits: " + this.state.hits)
			}
		});
	}

	

	setQueryType = queryTypeId => {
		this.state.corpora.setVisibility(queryTypeId, this.state.language[0]);
		setQueryVariable('queryType', queryTypeId);
		setQueryVariable('query', queryTypeId === 'cql' ? this.state.cqlQuery : this.state.fcsQuery)
		this.setState({
			queryTypeId: queryTypeId,
			hits: this.nohits,
			searchId: null,
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

	

	toggleCorpusSelection = e => {
	    $(ReactDOM.findDOMNode(this.refs.corporaModal)).modal();
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
	
	toggleFcsView = (e, fcsTextAreaVisibility) => {
		e.preventDefault();
		this.setState({
			fcsTextAreaVisibility: fcsTextAreaVisibility
		});
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
			/>
		);
	}
	
	renderCql = () => {
		var queryType = this.queryTypeMap[this.state.queryTypeId];
	    
	    return (
			<div className="aligncenter" style={{marginLeft:16, marginRight:16}}>
							<div className="input-group mb-3">
								<div className="input-group-prepend">
									<span className="input-group-text" style={{backgroundColor:queryType.searchLabelBkColor}}>
							{dictionary[this.props.languageFromMain][this.state.queryTypeId].searchLabel}
									</span>
								</div>
					{ this.renderQueryInput() }
					<div className="input-group-append">
						{this.renderSearchButtonOrLink()}
					</div>
				</div>
			</div>
		);
	}

	renderGQB = () => {
	    var queryType = this.queryTypeMap[this.state.queryTypeId];
	    return (
			<div style={{marginLeft:16, marginRight:16}}>
				<div className="card">
					<div
						id='fcsFormHeading'
						className="card-heading"
						style={{backgroundColor:queryType.searchLabelBkColor, fontSize: "120%"}}
					>
						{dictionary[this.props.languageFromMain][this.state.queryTypeId].searchLabel}
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
					<div className="col-12">
						{  this.renderCql() }
					</div>
				</div>
				<div className="top-gap">
						{this.state.hits.map( (hit) => 
                             <Results
                            collhits={hit}
                            toggleResultModal={this.toggleResultModal}
                            // getDownloadLink={this.getDownloadLink}
                            searchedLanguage={this.state.language}
                            queryTypeId={this.state.queryTypeId}
                            languageFromMain={this.props.languageFromMain}
                        />
                  )}

					
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
			// return false; // top-most collection in tree, don't delve deeper
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
    console.log("set url", newUrl);
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

export default AggregatorPage;
