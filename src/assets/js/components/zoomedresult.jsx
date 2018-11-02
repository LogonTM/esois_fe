// "use strict";
import React, { Component } from 'react';
import classNames from "classnames";
import ResultMixin from "./resultmixin.jsx";
import PropTypes from "prop-types";
//import createReactClass from "create-react-class";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import _ from "./results.jsx";
import { FormattedMessage } from 'react-intl';

var PT = PropTypes;

//var ZoomedResult = createReactClass({
class ZoomedResult extends Component {
	static propTypes = {
		corpusHit: PT.object,
		nextResults: PT.func.isRequired,
		languageMap: PT.object.isRequired,
/* 		weblichtLanguages: PT.array.isRequired, */
		searchedLanguage: PT.array.isRequired,
		getDownloadLink: PT.func.isRequired,
/* 		getToWeblichtLink: PT.func.isRequired, */
		queryTypeId: PT.string.isRequired,
	}//,
	// mixins: [ResultMixin];

	constructor(props) {
		super(props);
		this.state = {
			forceUpdate: 1,
		};
	}
	// getInitialState/*: function*/() {
	// 	return {
	// 		forceUpdate: 1, // hack to force an update, used when searching for next results
	// 	};
	// }//,

	nextResults/*: function*/ = e => {
		this.props.corpusHit.inProgress = true;
		this.setState({forceUpdate: this.state.forceUpdate + 1});
		this.props.nextResults(this.props.corpusHit.corpus.id);
	}//,

	renderLanguages/*: function*/ = languages => {
		return languages
				.map(l => this.props.languageMap[l])
				.sort()
				.join(", ");
	}//,

	renderDisplayKWIC/*: function*/ = () => {
		return (
			<div className="inline btn-group" style={{display:"inline-block"}}>
				<label htmlFor="inputKwic" className="btn btn-flat">
					{ this.state.displayKwic ?
						<input id="inputKwic" type="checkbox" value="kwic" checked onChange={this.toggleKwic} /> :
						<input id="inputKwic" type="checkbox" value="kwic" onChange={this.toggleKwic} />
					}
					&nbsp;
					<FormattedMessage
						id='resultmixin.display.kwic'
						description='display as key word in context translation'
						defaultMessage='Display as Key Word In Context'
					/>
				</label>
			</div>
		);
	}

	renderDownloadLinks/*: function*/ = corpusId => {
		return (
			<div className="dropdown">
				<button className="btn btn-flat" aria-expanded="false" data-toggle="dropdown">
					<span className="fa fa-download" aria-hidden="true"/>{" "}
						<FormattedMessage
							id='resultmixin.download'
							description='download translation'
							defaultMessage='Download'
						/>{" "}
					<span className="caret"/>
				</button>
				<ul className="dropdown-menu">
					<li className="dropdown-item"> <a href={this.props.getDownloadLink(corpusId, "csv")}>{" "}
							<FormattedMessage
								id='resultmixin.download.csv'
								description='as csv file translation'
								defaultMessage='As CSV file'
							/>
						</a></li>
					<li className="dropdown-item"> <a href={this.props.getDownloadLink(corpusId, "json")}>{" "}
					        <FormattedMessage
								id='resultmixin.download.json'
								description='as json file translation'
								defaultMessage='As JSON file'
							/>
						</a></li>
					<li className="dropdown-item"> <a href={this.props.getDownloadLink(corpusId, "xml")}>{" "}
					        <FormattedMessage
								id='resultmixin.download.xml'
								description='as csv file translation'
								defaultMessage='As XML file'
							/>
						</a></li>
				</ul>
			</div>
		);
	}

	renderRowLanguage/*: function*/(hit) {
		return false; //<span style={{fontFace:"Courier",color:"black"}}>{hit.language} </span> ;
	}

	renderRowsAsHits/*: function*/ = (hit,i) => {
		function renderTextFragments(tf, idx) {
			return (<span key={idx} className={tf.hit?"keyword":""}>{tf.text}</span>);
		}
		return (
			<p key={i} className="hitrow">
				{this.renderRowLanguage(hit)}
				{hit.fragments.map(renderTextFragments)}
			</p>
		);
	}//,

	renderRowsAsKwic/*: function*/ = (hit,i) => {
		var sleft={textAlign:"left", verticalAlign:"top", width:"50%"};
		var scenter={textAlign:"center", verticalAlign:"top", maxWidth:"50%"};
		var sright={textAlign:"right", verticalAlign:"top", maxWidth:"50%"};
		return	(
			<tr key={i} className="hitrow">
				<td>{this.renderRowLanguage(hit)}</td>
				<td style={sright}>{hit.left}</td>
				<td style={scenter} className="keyword">{hit.keyword}</td>
				<td style={sleft}>{hit.right}</td>
			</tr>
		);
	}//,

	renderRowsAsADV/*: function*/ = (hit,i) => {
	    var sleft={textAlign:"left", verticalAlign:"top", width:"50%"};
	    var scenter={textAlign:"center", verticalAlign:"top", maxWidth:"50%"};
	    var sright={textAlign:"right", verticalAlign:"top", maxWidth:"50%"};
	    
	    function renderSpans(span, idx) {
		return (<td key={idx} className={span.hit?"keyword":""}>{span.text}</td>);
	    }
	    return (
			<tr key={i} className="hitrow">
				{this.renderRowLanguage(hit)}
				<td style={sleft}>{hit.pid}</td>
				<td style={sleft}>{hit.reference}</td>
				{hit.spans.map(renderSpans)}
			</tr>
		);
	}

	renderDiagnostic/*: function*/(d, key) {
		if (d.uri === window.MyAggregator.NO_MORE_RECORDS_DIAGNOSTIC_URI) {
			return false;
		}
		return 	(
			<div className="alert alert-warning" key={key}>
				<div>{d.message}</div>
			</div>
		);
	}//,

	renderDiagnostics/*: function*/ = corpusHit => {
		if (!corpusHit.diagnostics || corpusHit.diagnostics.length === 0) {
			return false;
		}
		return corpusHit.diagnostics.map(this.renderDiagnostic);
	}//,

	renderErrors/*: function*/(corpusHit) {
		var xc = corpusHit.exception;
		if (!xc) {
			return false;
		}
		return 	(
			<div className="alert alert-danger" role="alert">
				<div>
					<FormattedMessage
						id='resultmixin.exception'
						description='exception translation'
						defaultMessage='Exception:'
					/>&nbsp;
					{xc.message}</div>
				{ xc.cause ? 
					<div>
						<FormattedMessage 
							id='resultmixin.causedBy'
							description='caused by translation'
							defaultMessage='Caused by:'
						/>&nbsp;
						{xc.cause}
					</div> : false
				}
			</div>
		);
	}//,

	renderPanelBody/*: function*/ = corpusHit => {
	    var fulllength = {width:"100%"};

        if (this.state.displayADV) {
			return (
				<div>
					{this.renderErrors(corpusHit)}
					{this.renderDiagnostics(corpusHit)}
					<table className="table table-condensed table-hover" style={fulllength}>
						<tbody>{corpusHit.advancedLayers.map(this.renderRowsAsADV)}</tbody>
					</table>
				</div>
			);
	    } else if (this.state.displayKwic) {
			return (
				<div>
					{this.renderErrors(corpusHit)}
					{this.renderDiagnostics(corpusHit)}
					<table className="table table-condensed table-hover" style={fulllength}>
						<tbody>{corpusHit.kwics.map(this.renderRowsAsKwic)}</tbody>
					</table>
				</div>
			);
	    } else  {
			return (
				<div>
					{this.renderErrors(corpusHit)}
					{this.renderDiagnostics(corpusHit)}
					{corpusHit.kwics.map(this.renderRowsAsHits)}
				</div>
			);
	    }
	}

	renderMoreResults/*: function*/ = () => {
		if (this.props.corpusHit.inProgress)
			return (
				<span style={{fontStyle:'italic'}}>
					<FormattedMessage
						id='zoomedresult.pleaseWait'
						description='retrieving results, please wait translation'
						defaultMessage='Retrieving results, please wait...'
					/>
				</span>
			);

		var moreResults = true;
		for (var i = 0; i < this.props.corpusHit.diagnostics.length; i++) {
			var d = this.props.corpusHit.diagnostics[i];
			if (d.uri === window.MyAggregator.NO_MORE_RECORDS_DIAGNOSTIC_URI) {
				moreResults = false;
				break;
			}
		}

		if (!moreResults)
			return (
				<span style={{fontStyle:'italic'}}>
					<FormattedMessage
						id='zoomedresult.noMoreResults'
						description='no other results available for this query translation'
						defaultMessage='No other results available for this query'
					/>
				</span>
			);
		return (
			<button className="btn btn-outline-secondary" onClick={this.nextResults}>
				<span className="fa fa-ellipsis-h" aria-hidden="true"/>
				<FormattedMessage
					id='zoomedresult.moreResults'
					description='more results translation'
					defaultMessage='More Results'
				/>
			</button>
		);
	}//,

	render/*: function*/() {
		var corpusHit = this.props.corpusHit;
		if (!corpusHit) {
			return false;
		}

/* 		var forceLanguage = null, wlerror = null;
		if (this.props.weblichtLanguages.indexOf(this.props.searchedLanguage[0]) < 0) {
			// the search language is either AnyLanguage or unsupported
			if (this.props.searchedLanguage[0] === window.MyAggregator.multipleLanguageCode) {
				if (corpusHit.corpus.languages && corpusHit.corpus.languages.length === 1) {
					forceLanguage = corpusHit.corpus.languages[0];
				} else {
					var langs = corpusHit.kwics.map(function(kwic) {return kwic.language;});
					langs = /*_.*uniq(langs.filter(function(l){ return l !== null; }));
					if (langs.length === 1) {
						forceLanguage = langs[0];
					}
				}
			}
			if (!forceLanguage) {
				wlerror = "Cannot use WebLicht: unsupported language ("+this.props.searchedLanguage[1]+")";
			}
		} */
		var corpus = corpusHit.corpus;
		return (
			<div>
				<div className='corpusDescription'>
					<p><i className="fa fa-institution"/> {corpus.institution.name}</p>
					{corpus.description ?
						<p><i className="fa fa-info-circle"/> {corpus.description}</p>: false}
					<p><i className="fa fa-language"/> {this.renderLanguages(corpus.languages)}</p>
				</div>
				<div style={{marginBottom:2}}>
					<div className="float-right">
						<div>
							{this.renderDisplayKWIC()}
							{this.props.queryTypeId !== "fcs" ? "" : this.renderDisplayADV()}
							<div className="inline"> {this.renderDownloadLinks(corpusHit.corpus.id)} </div>
							{/* <div className="inline"> {this.renderToWeblichtLinks(corpus.id, forceLanguage, wlerror)} </div> */}
						</div>
					</div>
					<div style={{clear:'both'}}/>
				</div>
				<TransitionGroup>
					<CSSTransition classNames="fade" timeout={{enter: 200, exit: 200}}>
						<div className="panel">
							<div className="panel-body corpusResults">{this.renderPanelBody(corpusHit)}</div>
						</div>
					</CSSTransition>
				</TransitionGroup>
				<div style={{textAlign:'center', marginTop:10}}>
					{ this.renderMoreResults() }
				</div>
			</div>
		);
	}//,
}//);

/* function uniq/*: function*(a) {
	var r = [];
	for (var i = 0; i < a.length; i++) {
		if (r.indexOf(a[i]) < 0) {
			r.push(a[i]);
		}
	}
	return r;
} */

// module.exports = ZoomedResult;
export default ZoomedResult;
