import React, { Component } from 'react';
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import dictionary from '../../../translations/dictionary';

var PT = PropTypes;

class ZoomedResult extends Component {
	static propTypes = {
		corpusHit: PT.object,
		nextResults: PT.func.isRequired,
		languageMap: PT.object.isRequired,
		searchedLanguage: PT.array.isRequired,
		getDownloadLink: PT.func.isRequired,
		queryTypeId: PT.string.isRequired,
		languageFromMain: PT.string.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			forceUpdate: 1,
			displayKwic: false,
			displayADV: false,
		};
	}

	nextResults = e => {
		this.props.corpusHit.inProgress = true;
		this.setState({forceUpdate: this.state.forceUpdate + 1});
		this.props.nextResults(this.props.corpusHit.corpus.id);
	}

	renderLanguages = languages => {
		return languages
				.map(l => this.props.languageMap[l])
				.sort()
				.join(", ");
	}

	renderMoreResults = () => {
		if (this.props.corpusHit.inProgress)
			return (
				<span style={{fontStyle:'italic'}}>
					{dictionary[this.props.languageFromMain].zoomedresult.pleaseWait}
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
					{dictionary[this.props.languageFromMain].zoomedresult.noMoreResults}
				</span>
			);
		return (
			<button className="btn btn-outline-secondary" onClick={this.nextResults}>
				<span className="fa fa-ellipsis-h" aria-hidden="true"/>
				{dictionary[this.props.languageFromMain].zoomedresult.moreResults}
			</button>
		);
	}

	toggleKwic = () => {
		this.setState({displayKwic:!this.state.displayKwic});
	}

	toggleADV = () => {
		this.setState({displayADV:!this.state.displayADV});
	}

	renderRowsAsHits = (hit,i) => {
		function renderTextFragments(tf, idx) {
			return (<span key={idx} className={tf.hit?"keyword":""}>{tf.text}</span>);
		}
		return (
			<p key={i} className="hitrow">
				{hit.fragments.map(renderTextFragments)}
			</p>
		);
	}

	renderRowsAsKwic = (hit,i) => {
		var sleft={textAlign:"left", verticalAlign:"top", width:"50%"};
		var scenter={textAlign:"center", verticalAlign:"top", maxWidth:"50%"};
		var sright={textAlign:"right", verticalAlign:"top", maxWidth:"50%"};
		return	(
			<tr key={i} className="hitrow">
				<td style={sright}>{hit.left}</td>
				<td style={scenter} className="keyword">{hit.keyword}</td>
				<td style={sleft}>{hit.right}</td>
			</tr>
		);
	}

	renderRowsAsADV = (hit,i) => {
	    var sleft={textAlign:"left", verticalAlign:"top", width:"50%"};
	    function renderSpans(span, idx) {
			return (<td key={idx} className={span.hit?"keyword":""}>{span.text}</td>);
	    }
	    return (
			<tr key={i} className="hitrow">
				<td style={sleft}>{hit.pid}</td>
				<td style={sleft}>{hit.reference}</td>
				{hit.spans.map(renderSpans)}
			</tr>
		);
	}

	renderDiagnostic(d, key) {
		if (d.uri === window.MyAggregator.NO_MORE_RECORDS_DIAGNOSTIC_URI) {
			return false;
		}
		return (
			<div className="alert alert-warning" key={key}>
				<div>{d.message}</div>
			</div>
		);
	}

	renderDiagnostics = corpusHit => {
		if (!corpusHit.diagnostics || corpusHit.diagnostics.length === 0) {
			return false;
		}
		return corpusHit.diagnostics.map(this.renderDiagnostic);
	}

	renderErrors(corpusHit) {
		var xc = corpusHit.exception;
		if (!xc) {
			return false;
		}
		return (
			<div className="alert alert-danger" role="alert">
				<div>
					{dictionary[this.props.languageFromMain].resultfunctions.exception}&nbsp;
					{xc.message}
				</div>
				{ xc.cause ? 
					<div>
						{dictionary[this.props.languageFromMain].resultfunctions.causedBy}&nbsp;
						{xc.cause}
					</div> : false
				}
			</div>
		);
	}

	renderPanelBody = corpusHit => {
	    var fulllength = {width:"100%"};

        if (this.state.displayADV) {
			return (
				<div id="adv-results">
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
	    } else {
			return (
				<div>
					{this.renderErrors(corpusHit)}
					{this.renderDiagnostics(corpusHit)}
					{corpusHit.kwics.map(this.renderRowsAsHits)}
				</div>
			);
	    }
	}

	renderDisplayKWIC = () => {
		return (
			<div className="inline btn-group" style={{display:"inline-block"}}>
				<label htmlFor="inputKwic" className="btn btn-flat">
					<input
						id="inputKwic"
						type="checkbox"
						value="kwic"
						checked={this.state.displayKwic}
						onChange={this.toggleKwic}
					/>
					&nbsp;
					{dictionary[this.props.languageFromMain].resultfunctions.display.kwic}
				</label>
			</div>
		);
	}

	renderDisplayADV = () => {
		return (
			<div className="inline btn-group" style={{display:"inline-block"}}>
			   <label htmlFor="inputADV" className="btn btn-flat">
			   		<input
						id="inputADV"
						type="checkbox"
						value="adv"
						checked={this.state.displayADV}
						onChange={this.toggleADV}
					/>
				   &nbsp;
				   {dictionary[this.props.languageFromMain].resultfunctions.display.adv}
			   </label>
		   </div>
	   );
	}

	renderDownloadLinks = corpusId => {
		return (
			<div className="dropdown">
				<button className="btn btn-flat" aria-expanded="false" data-toggle="dropdown">
					<span className="fa fa-download" aria-hidden="true"/>{" "}
						{dictionary[this.props.languageFromMain].button.download}{" "}
					<span className="caret"/>
				</button>
				<ul className="dropdown-menu">
					<li className="dropdown-item">
						<a href={this.props.getDownloadLink(corpusId, "csv")}>{" "}
							{dictionary[this.props.languageFromMain].resultfunctions.download.csv}
						</a>
					</li>
					<li className="dropdown-item">
						<a href={this.props.getDownloadLink(corpusId, "json")}>{" "}
							{dictionary[this.props.languageFromMain].resultfunctions.download.json}
						</a>
					</li>
					<li className="dropdown-item">
						<a href={this.props.getDownloadLink(corpusId, "xml")}>{" "}
							{dictionary[this.props.languageFromMain].resultfunctions.download.xml}
						</a>
					</li>
				</ul>
			</div>
		);
	}

	render() {
		var corpusHit = this.props.corpusHit;
		if (!corpusHit) {
			return false;
		}

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
						</div>
					</div>
					<div style={{clear:'both'}}/>
				</div>
				<TransitionGroup>
					<CSSTransition classNames="fade" timeout={{enter: 200, exit: 200}}>
						<div className="card">
							<div className="card-body corpusResults">{this.renderPanelBody(corpusHit)}</div>
						</div>
					</CSSTransition>
				</TransitionGroup>
				<div style={{textAlign:'center', marginTop:10}}>
					{ this.renderMoreResults() }
				</div>
			</div>
		);
	}
}

export default ZoomedResult;
