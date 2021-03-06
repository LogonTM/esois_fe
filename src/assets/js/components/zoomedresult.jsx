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

	componentDidUpdate(prevProps) {
		if (this.props.queryTypeId !== prevProps.queryTypeId) {
			this.setState({
				displayKwic: false,
				displayADV: false
			})
		}
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
		this.setState(oldState => ({
			displayKwic:!oldState.displayKwic
		}));
	}

	toggleADV = () => {
		this.setState(oldState => ({
			displayADV:!oldState.displayADV
		}));
	}

	renderRowsAsHits = (hit,i) => {
		function renderTextFragments(tf, idx) {
		    if (tf.html) {
					return (
						<span
							key={idx}
							className="beHTML"
							dangerouslySetInnerHTML={{__html: tf.text}}
						></span>
					);
            }
			return (
				<span
					key={idx}
					className={tf.hit?"keyword":""}
				>
					{tf.text}
				</span>
			);
		}
		return (
			<p key={i} className="hitrow" data-testid='z-rows-hits'>
				{hit.fragments.map(renderTextFragments)}
			</p>
		);
	}

	renderRowsAsKwic = (hit,i) => {
		var sleft={textAlign:"left", verticalAlign:"top", width:"50%"};
		var scenter={textAlign:"center", verticalAlign:"top", maxWidth:"50%"};
		var sright={textAlign:"right", verticalAlign:"top", maxWidth:"50%"};
		const leftContent = left => {
			if (left.startsWith('<audio')) {
				const parts = hit.left.split('</audio><br/>')
				return parts[1];
			} else {
				return left
			}
		}
		const rightContent = right => {
			if (right.startsWith('<ol><li><div>')) {
				return (
					<span
						className="beHTML"
						dangerouslySetInnerHTML={{__html: right}}
					></span>
				);
			} else {
				return right
			}
		}
		return	(
			<tr key={i} className="hitrow" data-testid='z-rows-kwic'>
				<td style={sright}>
					{ leftContent(hit.left) }
				</td>
				<td style={scenter} className="keyword">
					{ (hit.keyword.startsWith('<div')) ?
					<span className="beHTML" dangerouslySetInnerHTML={{__html: hit.keyword}}></span>
					: hit.keyword }
				</td>
				<td style={sleft}>
					{ rightContent(hit.right) }
				</td>
			</tr>
		);
	}

	renderRowsAsADV = (hit, background) => {
	    var sleft={textAlign:"left", verticalAlign:"top", width:"50%"};
	    function renderSpans(span, idx) {
			return (<td key={idx} className={span.hit?"keyword":""}>{span.text}</td>);
	    }
	    return (
			<tr key={hit.pid+hit.reference} className={`hitrow${background}`} data-testid='z-rows-adv'>
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
		let counter = 0;
		let pid = 0;
		let advBackground = '';
		if (this.state.displayADV) {
			return (
				<div id="adv-results">
					{this.renderErrors(corpusHit)}
					{this.renderDiagnostics(corpusHit)}
					<table className="table table-condensed table-hover" style={fulllength}>
						<tbody>
							{
								corpusHit.advancedLayers.map(hit => {
									if (hit.pid === pid) {
										advBackground = counter % 2 === 1 ? '' : '-odd';
										return this.renderRowsAsADV(hit, advBackground)
									}
									else {
										counter += 1;
										advBackground = counter % 2 === 1 ? '' : '-odd';
										pid = hit.pid;
										return this.renderRowsAsADV(hit, advBackground)
									}
								})
							}
						</tbody>
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
				<label htmlFor="inputKwicz" className={`btn btn-flat${this.state.displayADV ? ' disabled' : ''}`}>
					<input
						id="inputKwicz"
						type="checkbox"
						value="kwic"
						checked={this.state.displayKwic}
						onChange={this.toggleKwic}
						disabled={this.state.displayADV}
						data-testid='z-display-kwic'
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
			   <label htmlFor="inputADVz" className={`btn btn-flat${this.state.displayKwic ? ' disabled' : ''}`}>
			   		<input
						id="inputADVz"
						type="checkbox"
						value="adv"
						checked={this.state.displayADV}
						onChange={this.toggleADV}
						disabled={this.state.displayKwic}
						data-testid='z-display-adv'
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
				<button className="btn btn-flat" aria-expanded="false" data-toggle="dropdown" data-testid='z-download'>
					<span className="fa fa-download" aria-hidden="true"/>
						{dictionary[this.props.languageFromMain].button.download}
					<span className="caret"/>
				</button>
				<ul className="dropdown-menu">
					<li className="dropdown-item">
						<a href={this.props.getDownloadLink(corpusId, "csv")}>
							{dictionary[this.props.languageFromMain].resultfunctions.download.csv}
						</a>
					</li>
					<li className="dropdown-item">
						<a href={this.props.getDownloadLink(corpusId, "json")}>
							{dictionary[this.props.languageFromMain].resultfunctions.download.json}
						</a>
					</li>
					<li className="dropdown-item">
						<a href={this.props.getDownloadLink(corpusId, "xml")}>
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
						<div data-testid='zoomed-result'>
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
