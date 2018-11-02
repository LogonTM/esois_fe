import React, { Component } from 'react'
import classNames from "classnames";
import { FormattedMessage } from 'react-intl';

window.MyAggregator = window.MyAggregator || {};
var NO_MORE_RECORDS_DIAGNOSTIC_URI = window.MyAggregator.NO_MORE_RECORDS_DIAGNOSTIC_URI = "info:srw/diagnostic/1/61";

class ResultMixin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			displayKwic: false,
			displayADV: false,
		};
	}

	getDefaultProps(){
		return {hasPopover: true};
	}

	toggleKwic = () => {
		this.setState({displayKwic:!this.state.displayKwic});
	}

	toggleADV = () => {
	 	this.setState({displayADV:!this.state.displayADV});
	}

	renderPanelTitle(corpus) {
		return (
			<div className='inline'>
				<span className="corpusName"> {corpus.title}</span>
				<span className="institutionName"> — {corpus.institution.name}</span>
			</div>
		);
	}

	renderRowLanguage(hit) {
		return false; //<span style={{fontFace:"Courier",color:"black"}}>{hit.language} </span> ;
	}

	renderRowsAsHits(hit,i) {
		function renderTextFragments(tf, idx) {
			return (<span key={idx} className={tf.hit?"keyword":""}>{tf.text}</span>);
		}
		return (
			<p key={i} className="hitrow">
				{this.renderRowLanguage(hit)}
				{hit.fragments.map(renderTextFragments)}
			</p>
		);
	}

	renderRowsAsKwic(hit,i) {
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
	}

	renderRowsAsADV(hit,i) {
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

	renderDiagnostics(corpusHit) {
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
		return 	(
			<div className="alert alert-danger" role="alert">
				<div>
					<FormattedMessage
						id='resultmixin.exception'
						description='exception translation'
						defaultMessage='Exception: '
					/>
					{xc.message}</div>
				{ xc.cause ? 
					<div>
						<FormattedMessage 
							id='resultmixin.causedBy'
							description='caused by translation'
							defaultMessage='Caused by: '
						/>{xc.cause}
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

	renderDisplayKWIC = () => {
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

	renderDisplayADV = () => {
	 	return (
		 	<div className="inline btn-group" style={{display:"inline-block"}}>
				<label htmlFor="inputADV" className="btn btn-flat">
					{ this.state.displayADV ?
						<input id="inputADV" type="checkbox" value="adv" checked onChange={this.toggleADV} /> :
						<input id="inputADV" type="checkbox" value="adv" onChange={this.toggleADV} />
					}
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

};

export default ResultMixin;
