import React, { Component } from 'react';
import Panel from "./panel.jsx";
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import dictionary from '../../../translations/dictionary';

var PT = PropTypes;

class Results extends Component {
	static propTypes = {
		collhits: PT.object,
		searchedLanguage: PT.array,
		toggleResultModal: PT.func,
		getDownloadLink: PT.func,
		queryTypeId: PT.string,
		languageFromMain: PT.string
	}

	constructor(props) {
		super(props);
		this.state = {
			displayKwic: false,
			displayADV: false,
		};
	}

	renderPanelInfo(corpusHit) {
		// var corpus = corpusHit.corpus;
		// var inline = {display:"inline-block"};
		// return 
		// (
		// 	// <div>
		// 	// 	{" "}
		// 	// 	<div style={inline}>
		// 	// 		{/* <button className="btn btn-outline-secondary zoomResultButton"
		// 	// 				onClick={e => this.props.toggleResultModal(e,corpusHit)}>
		// 	// 			<span className="fa fa-eye"/>
		// 	// 			{dictionary[this.props.languageFromMain].results.viewButton}
		// 	// 		</button> */}
		// 	// 	</div>
		// 	// </div>
		// );
	}

	renderResultPanel = () => {
		var collhits = this.props.collhits
		console.log("Within renderResultsPanel" + collhits.id)
		
			return (
				<CSSTransition key={collhits.id} classNames="fade" timeout={{enter: 200, exit: 200}}>
					<Panel
						key={collhits.id}
						title={this.renderPanelTitle(collhits.tootekood)}
						info={this.renderPanelInfo(collhits.tootekood)}
					>
						{this.renderPanelBody(collhits.results)}
					</Panel>
				</CSSTransition>
			);	
		
	}

	// renderProgressMessage = () => {
	// 	var collhits = this.props.collhits;
	// 	var done = collhits.results.length - collhits.inProgress;
	// 	var msg = `${collhits.hits} ${dictionary[this.props.languageFromMain].results.renderProgressMessageP1} ${done} ${dictionary[this.props.languageFromMain].results.renderProgressMessageP2}`
	// 	var percents = Math.round(100 * collhits.hits / collhits.results.length);
	// 	var styleperc = {width: percents+"%"};
	// 	return (
	// 		<div style={{marginTop:10}}>
	// 			<div>{msg}</div>
	// 			{collhits.inProgress > 0 ?
	// 				<div className="progress" style={{marginBottom:10}}>
	// 					<div className="progress-bar progress-bar-striped active" role="progressbar"
	// 						aria-valuenow={percents} aria-valuemin="0" aria-valuemax="100" style={styleperc} />
	// 					{percents > 2 ? false :
	// 						<div className="progress-bar progress-bar-striped active" role="progressbar"
	// 							aria-valuenow='100' aria-valuemin="0" aria-valuemax="100"
	// 							style={{width: '100%', backgroundColor:'#888'}} />
	// 					}
	// 				</div> :
	// 				false}
	// 		</div>
	// 	);
	// }

	// toggleKwic = () => {
	// 	this.setState({displayKwic:!this.state.displayKwic});
	// }

	// toggleADV = () => {
	// 	 this.setState({displayADV:!this.state.displayADV});
	// }

	renderPanelTitle(corpusId) {
		var collhits = this.props.collhits
		return	(
			<div class="container">
				<div className='inline'>
					Search query for product code: {collhits.tootekood}
				</div>
					<br></br> <hr/>
				 <div className="row"> 
					<div class="col-sm">
						Vendor
					</div>
					<div class="col-sm">
						Price
					</div>
					<div class="col-sm">
						Quantity
					</div>
					<div class="col-sm">
						First avaliable
					</div>
				</div>
			</div>
		);
	}

	renderRowsAsHits = (hit,i) => {
		return (
			<div class="container">
				<div class="row">
					<div class="col-sm">
						{hit.name}
					</div>
					<div class="col-sm">
						{hit.hind}
					</div>
					<div class="col-sm">
						{hit.qty}
					</div>
					<div class="col-sm">
						{ hit.date === null ? 'N/A' : hit.date }
						
					</div>
				</div>
			</div>
			// <div class="row">
			// 	<div class="col-mm-6"></div>
			// 	<div class="col-mm-6"></div>
			// 	<div class="col-mm-6"></div>
			// 	<div class="col-mm-6"></div>
			// </div>
			// <p className="hitrow">
				 
			// </p>
		);
	}

	// renderRowsAsKwic = (hit,i) => {
	// 	var sleft={textAlign:"left", verticalAlign:"top", width:"50%"};
	// 	var scenter={textAlign:"center", verticalAlign:"top", maxWidth:"50%"};
	// 	var sright={textAlign:"right", verticalAlign:"top", maxWidth:"50%"};
	// 	return	(
	// 		<tr key={i} className="hitrow">
	// 			<td style={sright}>{hit.left}</td>
	// 			<td style={scenter} className="keyword">{hit.keyword}</td>
	// 			<td style={sleft}>{hit.right}</td>
	// 		</tr>
	// 	);
	// }

	// renderRowsAsADV = (hit,i) => {
	// 	var sleft={textAlign:"left", verticalAlign:"top", width:"50%"};
	// 	function renderSpans(span, idx) {
	// 		return (<td key={idx} className={span.hit?"keyword":""}>{span.text}</td>);
	// 	}
	// 	return (
	// 		<tr key={i} className="hitrow">
	// 			<td style={sleft}>{hit.pid}</td>
	// 			<td style={sleft}>{hit.reference}</td>
	// 			{hit.spans.map(renderSpans)}
	// 		</tr>
	// 	);
	// }

	renderDiagnostic(d, key) {
		// if (d.uri === window.MyAggregator.NO_MORE_RECORDS_DIAGNOSTIC_URI) {
		// 	return false;
		// }
		// return 	(
		// 	<div className="alert alert-warning" key={key}>
		// 		<div>{d.message}</div>
		// 	</div>
		// );
	}

	renderDiagnostics = (corpusHit) => {
		// if (!corpusHit.diagnostics || corpusHit.diagnostics.length === 0) {
		// 	return false;
		// }
		// return corpusHit.diagnostics.map(this.renderDiagnostic);
	}

	renderErrors(corpusHit) {
		// var xc = corpusHit.exception;
		// if (!xc) {
		// 	return false;
		// }
		// return (
		// 	<div className="alert alert-danger" role="alert">
		// 		<div>
		// 			{dictionary[this.props.languageFromMain].resultfunctions.exception}&nbsp;
		// 			{xc.message}
		// 		</div>
		// 		{ xc.cause ? 
		// 			<div>
		// 				{dictionary[this.props.languageFromMain].resultfunctions.causedBy}&nbsp;
		// 				{xc.cause}
		// 			</div> : false
		// 		}
		// 	</div>
		// );
	}

	renderPanelBody = corpusHit => {
		var fulllength = {width:"100%"};
		var collhits = this.props.collhits;

		
			return (
				<div>
					{/* {this.renderErrors(corpusHit)}
				 	{this.renderDiagnostics(corpusHit)} */}
					{collhits.results.map(this.renderRowsAsHits)}
				</div>
			);
		// }
	}

	

	render() {
		var collhits = this.props.collhits;
		console.log("Collhits: " + collhits.tootekood)
		console.log("Collhits: " + collhits.results)
		if (!collhits.results) {
			return false;
		}
		var showprogress = collhits.inProgress > 0;
	     
		return (
			<div>
				{/* { showprogress ? this.renderProgressMessage() : <div style={{height:20}} />} */}
				<div style={{marginBottom:2}}>
					{/* { showprogress ? false :
						<div className="float-left">
							{`${collhits.hits} ${dictionary[this.props.languageFromMain].results.howManyMatchingCollectionsFound}`}
						</div>
					} */}
					{/* { collhits.hits === 0 ? false : */}
						<div className="float-right">
							<div>
							   {/* {this.renderDisplayKWIC()} */}
							   {this.props.queryTypeId !== "fcs" ? "" : this.renderDisplayADV()}
								{/* { collhits.inProgress === 0 ?
									<div className="inline"> {this.renderDownloadLinks()} </div>
									:false
								} */}
							</div>
						</div>
					{/* } */}
					<div style={{clear:'both'}}/>
				</div>
				<TransitionGroup>
					{this.renderResultPanel(collhits.results)}
				</TransitionGroup>
			</div>
		);
	}
}

export default Results;