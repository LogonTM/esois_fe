import React, { Component } from 'react';
import Panel from "./panel.jsx";
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import { FormattedMessage } from 'react-intl';

var PT = PropTypes;

class Results extends Component {
	static propTypes = {
		collhits: PT.object.isRequired,
		searchedLanguage: PT.array.isRequired,
		toggleResultModal: PT.func.isRequired,
		getDownloadLink: PT.func.isRequired,
	    queryTypeId: PT.string.isRequired, 
	}

	constructor(props) {
		super(props);
		this.state = {
			displayKwic: false,
			displayADV: false,
		};
	}

	renderPanelInfo(corpusHit) {
		var corpus = corpusHit.corpus;
		var inline = {display:"inline-block"};
		return (
			<div>
				{" "}
				<div style={inline}>
					<button className="btn btn-outline-secondary zoomResultButton"
							onClick={function(e){this.props.toggleResultModal(e,corpusHit)}.bind(this)}>
						<span className="fa fa-eye"/>
						<FormattedMessage
							id='results.view.button'
							description='view translation'
							defaultMessage='View'
						/>
					</button>
				</div>
			</div>
		);
	}

	renderResultPanel = corpusHit => {
		if (corpusHit.kwics.length === 0 &&
			!corpusHit.exception &&
			corpusHit.diagnostics.length === 0) {
			return false;
		}
		return (
			<CSSTransition key={corpusHit.corpus.id} classNames="fade" timeout={{enter: 200, exit: 200}}>
				<Panel key={corpusHit.corpus.id}
						title={this.renderPanelTitle(corpusHit.corpus)}
						info={this.renderPanelInfo(corpusHit)}>
					{this.renderPanelBody(corpusHit)}
				</Panel>
			</CSSTransition>
		);
	}

	renderProgressMessage = () => {
		var collhits = this.props.collhits;
		var done = collhits.results.length - collhits.inProgress;
		var msg = <FormattedMessage
					id='results.renderProgressMessage'
					description='how many matching collections found in how many searched collections translation'
					defaultMessage='{found} matching collections found in {done} searched collections'
					values= {{
						found: collhits.hits,
						done: done
					}}
			 	/>;
		var percents = Math.round(100 * collhits.hits / collhits.results.length);
		var styleperc = {width: percents+"%"};
		return (
			<div style={{marginTop:10}}>
				<div>{msg}</div>
				{collhits.inProgress > 0 ?
					<div className="progress" style={{marginBottom:10}}>
						<div className="progress-bar progress-bar-striped active" role="progressbar"
							aria-valuenow={percents} aria-valuemin="0" aria-valuemax="100" style={styleperc} />
						{percents > 2 ? false :
							<div className="progress-bar progress-bar-striped active" role="progressbar"
								aria-valuenow='100' aria-valuemin="0" aria-valuemax="100"
								style={{width: '100%', backgroundColor:'#888'}} />
						}
					</div> :
					false}
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
	}

	renderPanelBody = corpusHit => {
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
					<FormattedMessage
						id='resultmixin.display.kwic'
						description='display as key word in context translation'
						defaultMessage='Display as Key Word In Context'
					/>
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
					<FormattedMessage
						id='resultmixin.display.adv'
						description='display as AdvancedDataView translation'
						defaultMessage='Display as AdvancedDataView (ADV)'
					/>
				</label>
			</div>
		);
	}

	renderDownloadLinks = (corpusId) => {
		return (
			<div className="dropdown">
				<button className="btn btn-flat" aria-expanded="false" data-toggle="dropdown">
					<span className="fa fa-download" aria-hidden="true"/>{" "}
						<FormattedMessage
							id='resultmixin.download'
							description='download translation'
							defaultMessage=' Download '
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

	render() {
		var collhits = this.props.collhits;
		if (!collhits.results) {
			return false;
		}
		var showprogress = collhits.inProgress > 0;
	     
		return (
			<div>
				{ showprogress ? this.renderProgressMessage() : <div style={{height:20}} />}
				<div style={{marginBottom:2}}>
					{ showprogress ? false :
						<div className="float-left">
							<FormattedMessage
								id='results.howManyMatchingCollectionsFound'
								description='so many matching collections found translation'
								defaultMessage='{amount} matching collections found'
								values= {{
									amount: collhits.hits
								}}
							/>
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
		);
	}
}

export default Results;