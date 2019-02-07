import React, { Component } from 'react';
import Panel from "./panel.jsx";
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import dictionary from '../../../translations/dictionary';
import favicon from '../../img/favicon.ico';

var PT = PropTypes;

class Results extends Component {
	static propTypes = {
		collhits: PT.object.isRequired,
		searchedLanguage: PT.array.isRequired,
		toggleResultModal: PT.func.isRequired,
		getDownloadLink: PT.func.isRequired,
		queryTypeId: PT.string.isRequired,
		languageFromMain: PT.string.isRequired
	}

	constructor(props) {
		super(props);
		this.state = {
			displayKwic: false,
			displayADV: false,
		};
	}

	renderPanelInfo(corpusHit) {
		var inline = {display:"inline-block"};
		return (
			<div>
				{` `}
				<div style={inline}>
					<button className="btn btn-outline-secondary zoomResultButton"
							onClick={this.props.toggleResultModal.bind(this,corpusHit)}>
						<span className="fa fa-eye"/>
						{dictionary[this.props.languageFromMain].button.view}
					</button>
				</div>
			</div>
		);
	}

	renderResultPanel = (corpusHit, searchInitiated) => {
		if (corpusHit.kwics.length === 0 &&
			!corpusHit.exception &&
			corpusHit.diagnostics.length === 0) {
			return false;
		}
		return (
			<CSSTransition
				key={corpusHit.corpus.id}
				classNames="fade"
				timeout={{enter: 200, exit: 200}}
			>
				<Panel
					key={corpusHit.corpus.id}
					title={this.renderPanelTitle(corpusHit.corpus)}
					info={this.renderPanelInfo(corpusHit)}
				>
					{this.renderPanelBody(corpusHit)}
				</Panel>
			</CSSTransition>
		);
	}

	renderProgressMessage = () => {
		return (
			<div style={{marginTop:10}}>
				<div className="raba-loading-text">{dictionary[this.props.languageFromMain].results.loading}</div>
					<div className="raba-loading-icon-div">
						<img src={favicon} className="raba-loading-icon" alt="raba-loading-icon"/>
					</div>
			</div>
		);
	}

	toggleKwic = () => {
		this.setState({displayKwic:!this.state.displayKwic});
	}

	toggleADV = () => {
		 this.setState({displayADV:!this.state.displayADV});
	}

	renderPanelTitle(corpus) {
		return	(
			<div className='inline'>
				<span className="corpusName"> {corpus.title}</span>
				<span className="institutionName"> — {corpus.institution.name}</span>
			</div>
		);
	}

	renderRowsAsHits = (hit,i) => {
		function renderTextFragments(tf, idx) {
		    
		    if (tf.html) {
		        console.log(tf);
		        return (<span key={idx} className="beHTML" dangerouslySetInnerHTML={{__html: tf.text}}></span>)
		                    
	        }
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
		return 	(
			<div className="alert alert-warning" key={key}>
				<div>{d.message}</div>
			</div>
		);
	}

	renderDiagnostics = (corpusHit) => {
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
		var collhits = this.props.collhits;
		if (!collhits.results && !this.props.searchInitiated) {
			return false;
		} else if (this.props.searchInitiated) {
			return (
				this.renderProgressMessage()
			)
		}
		var showprogress = collhits.inProgress > 0;
		return (
			<div>
				<div style={{marginBottom:2}}>
					{ showprogress ? false :
						<div className="float-left">
							{`${collhits.hits} ${dictionary[this.props.languageFromMain].results.collectionsFound}`}
						</div>
					}
					{ collhits.hits === 0 ? false :
						<div className="float-right">
							<div>
							   {this.renderDisplayKWIC()}
							   {this.props.queryTypeId !== "fcs" ? "" : this.renderDisplayADV()}
								{ collhits.inProgress === 0 ?
									<div className="inline"> {this.renderDownloadLinks()} </div>
									:false
								}
							</div>
						</div>
					}
					<div style={{clear:'both'}}/>
				</div>
				<TransitionGroup>
					{collhits.results.map(this.renderResultPanel)}
				</TransitionGroup>
			</div>
		)
	}
}

export default Results;