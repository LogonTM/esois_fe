import React, { Component, PureComponent } from 'react';
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import dictionary from '../../../translations/dictionary';
import $ from 'jquery';

var PT = PropTypes;

function nextId() {
    return nextId.id++;
}
nextId.id = 0;

class QueryInput extends Component {
    static propTypes = {
		searchedLanguage: PT.array,
		queryTypeId: PT.string.isRequired,
		query: PT.string,
		placeholder: PT.string,
		onKeyDown: PT.func.isRequired,
		handleKeyTextarea: PT.func.isRequired,
		languageFromMain: PT.string.isRequired,
		onQueryChange: PT.func.isRequired,
		fcsTextAreaVisibility: PT.bool.isRequired
	}

	render() {
		if (this.props.queryTypeId === "cql") {
			return (
				<input
					className="form-control input-lg search" 
					id="query-cql"
					name="query-cql"
					type="text"
					value={this.props.query}
					placeholder={this.props.placeholder}
					tabIndex="1"
					onChange={evt => this.props.onQueryChange(evt.target.value)}
					onKeyDown={this.props.onKeyDown}
					ref="cqlOrEmbeddedQuery"
				/>
			);
		} else if (this.props.queryTypeId === "fcs" && this.props.fcsTextAreaVisibility) {
			return (
				<textarea
					className="form-control input-lg search"
					id="query-fcs"
					name="query-fcs"
					type="text"
					rows="1"
					value={this.props.query}
					placeholder={this.props.placeholder}
					tabIndex="1"
					onChange={evt => this.props.onQueryChange(evt.target.value)} 
					onKeyDown={this.props.handleKeyTextarea} 
					ref="fcsOrEmbeddedQuery"
				/>
			);
		}
		return (
			<div>
				<div id="adv_query_input_group" className="container-fluid">
					<ADVTokens
						query={this.props.query}
						ref="fcsGQB"
						onQueryChange={this.props.onQueryChange}
						languageFromMain={this.props.languageFromMain}
					/>
				</div>
			</div>
		);
	}
}

class ADVTokens extends Component {

	static propTypes = {
		query: PT.string, // initial state query
		onQueryChange: PT.func.isRequired,
		languageFromMain: PT.string.isRequired
	}

	constructor(props) {
		super(props);

		this.queryStrCache = {};
	
		var match = queryToTokens(this.props.query);
		if (match === null) {
			this.state = {
				tokens: ['token-' + nextId()]
			}
		} else {
			var tokens = [];
			match.forEach((m) => {
				var id = 'token-' + nextId();
				tokens.push(id);
				this.queryStrCache[id] = m;
			});
			this.state = {
				tokens: tokens
			}
		}
	}

	addADVToken = () => {
		this.setState( (oldSt) => {
			oldSt.tokens.push('token-' + nextId());
			return {tokens: oldSt.tokens}
		});
	}
	
	removeADVToken = id => {
		this.setState( (oldSt) => {
			delete this.queryStrCache[id];
			oldSt.tokens.splice(oldSt.tokens.indexOf(id), 1);
			return {tokens: oldSt.tokens}
		}, this.fireQueryChange);
	}
	
	fireQueryChange = () => {
			var tokenParts = this.state.tokens.map( (id) => this.queryStrCache[id] );
			const queryString = tokenParts.join(' ')
			this.props.onQueryChange(queryString);
	}
	
	onQueryChange = (tokenId, queryStr) => {
			this.queryStrCache[tokenId] = queryStr;
			this.fireQueryChange();
	}

	render() {
		var i = 0;
		var tokens = this.state.tokens.map( (tokenId, i) => {
			return (
				<CSSTransition key={tokenId} classNames="token" timeout={{enter: 250, exit: 250}}>
					<ADVToken
						query={this.queryStrCache[tokenId]}
						onQueryChange={(qs) => this.onQueryChange(tokenId, qs)}
						handleRemoveADVToken={() => this.removeADVToken(tokenId)}
						languageFromMain={this.props.languageFromMain}
					/>
				</CSSTransition>
			);
		});

		return (
			<div id="adv-tokens" className="d-flex flex-row flex-nowrap">
				<TransitionGroup>{tokens}</TransitionGroup>
				<button
					className="btn btn-xs btn-default image_button insert_token"
					type="button"
					onClick={this.addADVToken}
				>
					<i className="fa fa-plus"></i>
				</button>
			</div>
		);
	}
}

class ADVToken extends Component {
	static propTypes = {
		query: PT.string,
		onQueryChange: PT.func.isRequired,
		handleRemoveADVToken: PT.func.isRequired,
		languageFromMain: PT.string.isRequired
	}
	
	render() {
		return (
			<div className="token query_token inline btn-group" style={{display:"inline-block"}}>
				<div className="token_header">
					<span
						className="image_button close_btn"
						type="button"
						onClick={this.props.handleRemoveADVToken}
						ref="removeToken"
					>
						<i className="fa fa-times-circle" />
					</span>
					<div style={{clear:"both"}} />
					</div>
					<div className="args">
					{ /* and.query_arg* and token_footer */ }
						<ANDQueryArgs
							onQueryChange={this.props.onQueryChange}
							query={this.props.query}
							languageFromMain={this.props.languageFromMain}
						/>
					<div className="lower_footer">
					</div>
				</div>
			</div>
		);
	}
}

class ADVTokenMenu extends PureComponent {
	
	static propTypes = {
		onChange: PT.func.isRequired,
		repeat1: PT.string,
		repeat2: PT.string,
		languageFromMain: PT.string.isRequired
	}
	
    constructor(props) {
		super(props);
		var repeat1 = this.props.repeat1||'';
		var repeat2 = this.props.repeat2||'';
		this.state = {
			repeat1,
			repeat2,
			hideMenu: (repeat1||repeat2) ? false : true,
			isStart: false,
			isEnd: false,
		}
	}

	getMenuState = () => {
		if (this.state.hideMenu) {
			return {};
		} else {
			return $.extend({}, this.state); // copy of state
		}
	}

	toggleRepeatMenu = e => {
		this.setState((st) =>({hideMenu: !st.hideMenu}));
	}

	toggleStart = e => {
		this.setState((st) => ({isStart: !st.isStart}));
	}

	toggleEnd = e => {
		this.setState((st) => ({isEnd: !st.isEnd}));
	}
	
	componentDidMount() {
		// make this compoent controlled to so that this awkward ref.getMenuState() stuff can be removed
		this.props.onChange(this.getMenuState());
	}

	componentDidUpdate() {
		// safe because of pure render mixin: will only update on state change.
		this.props.onChange(this.getMenuState());
	}

	render() {
		return (
			<div id="ADVtokenMenu">
				<button
					className="btn btn-xs btn-default image_button repeat_menu"
					onClick={this.toggleRepeatMenu}
					ref="repeatMenu"
				>
					<i className="fa fa-cog" />
				</button>
				<div id="ADVtokenMenu-items" className={"hide-" + this.state.hideMenu}>
					<div id="repeatMenu" className={"input-group input-group-sm repeat"}>
						<span>{dictionary[this.props.languageFromMain].queryinput.repeatMenu.repeat}</span>&nbsp;
						<input
							type="text"
							id="repeat1"
							value={this.state.repeat1}
							onChange={(evt) => this.setState({repeat1: evt.target.value})}
							ref="repeat1"
						/>&nbsp;
						<span>{dictionary[this.props.languageFromMain].queryinput.repeatMenu.to}</span>&nbsp;
						<input
							type="text"
							id="repeat2"
							value={this.state.repeat2}
							onChange={(evt) => this.setState({repeat2: evt.target.value})}
							ref="repeat2"
						/>&nbsp;
						<span>{dictionary[this.props.languageFromMain].queryinput.repeatMenu.times}</span>
					</div>
					<div id="start-end-menu">
						<div>
							<label>
								<input
									type="checkbox"
									checked={this.state.isStart}
									onChange={this.toggleStart}
								/>&nbsp;
								{dictionary[this.props.languageFromMain].queryinput.sentenceStart}
							</label>
						</div>
						<div>
							<label>
								<input
									type="checkbox"
									checked={this.state.isEnd}
									onChange={this.toggleEnd}
								/>&nbsp;
								{dictionary[this.props.languageFromMain].queryinput.sentenceEnd}
							</label>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

class ANDQueryArgs extends Component {
	static propTypes = {
		query: PT.string,
		onQueryChange: PT.func.isRequired,
		languageFromMain: PT.string.isRequired
	}

	constructor(props) {
		super(props);
		this.queryStrCache = {};

		var repeat1, repeat2;
		var qlean = this.props.query;
		if (qlean) {
			var repeatMatch = qlean.match(/{ *(\d)* *(?:, *(\d)*)? *} *$/);

			if (repeatMatch !== null) {
				repeat1 = repeatMatch[1];
				repeat2 = repeatMatch[2] || repeat1;
				qlean = qlean.substring(0, qlean.length - repeatMatch[0].length);
			}

			// replace token's [ and ]
			qlean = qlean.replace(/^\s*\[\s*/, '').replace(/\s*\]\s*$/, '');
		}

		var match = queryToANDArgs(qlean);
		if (match === null) {
			this.state = {
				ands: ["and-" + nextId()]
			};
		} else {
			var ands = [];
			match.forEach((m) => {
				var id = 'and-' + nextId();
				ands.push(id);
				this.queryStrCache[id] = m;
			});
			this.state = {
				ands,
				repeat1,
				repeat2,
			}
		}
	}

	addADVAnd = () => {
		this.setState( (oldSt) => {
			oldSt.ands.push('and-'+nextId());
			return {ands: this.state.ands}
		});
	}

	removeADVAnd = id => {
		this.setState( (oldSt) => {
			delete this.queryStrCache[id];
			oldSt.ands.splice(oldSt.ands.indexOf(id), 1);
			return {ands: oldSt.ands}
		}, this.fireQueryChange);
	}

	onMenuChange = menust => {
		this.setState({
			menuState_isStart: menust.isStart,
			menuState_isEnd: menust.isEnd,
			menuState_repeat1: menust.repeat1,
			menuState_repeat2: menust.repeat2,
		}, () =>  this.fireQueryChange() );
	}
	
	fireQueryChange = () => {
		var andParts = this.state.ands.map( id => this.queryStrCache[id] );
		
		if (this.state.menuState_isStart) {
			andParts.push('lbound(sentence)')
		}
		if (this.state.menuState_isEnd) {
			andParts.push('rbound(sentence)')
		}

		var queryString = andParts.length >= 2 ? andParts.join(' & ') : andParts[0];
		queryString = `[ ${queryString} ]`;

		if (this.state.menuState_repeat1 || this.state.menuState_repeat2 ) {
			queryString = queryString + '{' + (this.state.menuState_repeat1||this.state.menuState_repeat2 ) + ',' + (this.state.menuState_repeat2 || this.state.menuState_repeat1) + '}'
		}

		this.props.onQueryChange(queryString);
	}
	
	onQueryChange = (andId, queryStr) => {
			this.queryStrCache[andId] = queryStr;
			this.fireQueryChange();
	}

	renderANDTokenFooter = () => {
		return (
		<div className="token_footer">
			<button
				className="btn btn-xs btn-default image_button insert_arg"
				onClick={this.addADVAnd}
				ref="addAndButton"
			>
				<i className="fa fa-plus"/>
			</button>
			<ADVTokenMenu
				ref={(ref) => this.menuRef = ref}
				onChange={this.onMenuChange}
				repeat1={this.state.repeat1}
				repeat2={this.state.repeat2}
				languageFromMain={this.props.languageFromMain}
			/>
			<div style={{clear:"both"}}/>
		</div>);
	}

	render() {
		var andQueryArgs = this.state.ands.map(( andId ) => {
			return (
				<CSSTransition key={andId} classNames="fade" timeout={{enter: 200, exit: 200}}>
					<div className="and query_arg">
						<ANDQueryORArgs
							query={this.queryStrCache[andId]}
							onQueryChange={(qs) => this.onQueryChange(andId, qs)}
							handleRemoveADVAnd={() => this.removeADVAnd(andId)}
							languageFromMain={this.props.languageFromMain}
						/>
					</div>
				</CSSTransition>
			);
		});
		return (
			<div>
				<TransitionGroup>
					{andQueryArgs}
				</TransitionGroup>
				{this.renderANDTokenFooter()}
			</div>
		);
	}
}

class ANDQueryORArgs extends Component {
	static propTypes = {
		query: PT.string,
		onQueryChange: PT.func.isRequired,
		handleRemoveADVAnd: PT.func.isRequired,
		languageFromMain: PT.string.isRequired
	}
	
	constructor(props) {
		super(props);
		this.queryStrCache = {};
		var match = queryToORArgs(this.props.query);
		if (match === null) {
			this.state = {
				ors: ["or-"+nextId()]
			};
		} else {
			var ors = [];
			match.forEach((m) => {
				var id = 'or-'+nextId();
				ors.push(id);
				this.queryStrCache[id] = m;
			});
			this.state = {
				ors
			}
		}
	}

	validateADV(value) {
		//fixme! - disable SearchButton if not atleast 1 token is in the query filter
		return;
	}
	
	fireQueryChange = () => {
		var orParts = this.state.ors.map( (id) => this.queryStrCache[id] );
		const queryString = orParts.length >= 2 ? '( ' + orParts.join(' | ') + ' )' : orParts[0];
		this.props.onQueryChange(queryString);
	}

	addADVOr = e => {
		this.setState( (oldSt) => {
			oldSt.ors.push('or-'+nextId());
			return {ors: this.state.ors}
		});
	}

	removeADVOr = id => {
		this.setState( (oldSt) => {
			delete this.queryStrCache[id];
			oldSt.ors.splice(oldSt.ors.indexOf(id), 1);
			return {ors: oldSt.ors}
		}, () => {
			if (this.state.ors.length===0) {
					this.props.handleRemoveADVAnd();
			} else {
					this.fireQueryChange();
			}
	 });
	}
	
	onQueryChange = (orId, queryStr) => {
		this.queryStrCache[orId] = queryStr;
		this.fireQueryChange();
	}

	render() {
		var orArgs = this.state.ors.map((orId)  => {
			return ( 		
				<CSSTransition key={orId} classNames="fade" timeout={{enter: 200, exit: 200}}>
					<ORArg
						query={this.queryStrCache[orId]}
						handleRemoveADVOr={() => this.removeADVOr(orId)}
						handleValidateADV={() => {return true}}
						onQueryChange={(qs) => this.onQueryChange(orId, qs)}
						languageFromMain={this.props.languageFromMain}
					/>
				</CSSTransition>
			)
		});
		return (
			<div>
				<div className="or_container">
					<TransitionGroup>
						{orArgs}
					</TransitionGroup>
				</div>
				<div className="arg_footer">
					<span
						className="link"
						onClick={this.addADVOr}
					>
						{dictionary[this.props.languageFromMain].queryinput.or}
					</span>
					<div style={{clear:"both"}}/>
				</div>
			</div>
		);
	}
}

class ORArg extends PureComponent {
	
	static propTypes = {
		query: PT.string,
		handleValidateADV: PT.func.isRequired,
		handleRemoveADVOr: PT.func.isRequired,
		onQueryChange: PT.func.isRequired,
		languageFromMain: PT.string.isRequired
	}

	constructor(props) {
		super(props);
		var qp = queryParse(this.props.query);
			
		if (qp !== null) {
			var layer = qp.layer;
			var op = qp.op;
			var val = qp.val;
		}

		this.state = {
			layer: layer||'word',
			argOpt: op||'is',
			argValue: val||'',
			
			editingText: false,
		}
	}

	fireQueryChange() {
		const queryString = layerToQueryString(this.state.layer, this.state.argOpt, this.state.argValue);
		this.props.onQueryChange(queryString);
	}
	
	onlayerChange = evt => {
		var layer = evt.target.value;
		this.setState((st) => {
			var argOpt  = getLayerArgOpts(layer)[0].value;
			var lvo = getLayerValueOptions(layer, argOpt, st.argValue);
		var argValue = '';
			if (lvo === undefined) argValue = '';
			else argValue= lvo[0].value;
			
			return {
				layer,
				argOpt,
				argValue,
			}
		})
	}
	
	onArgOptChange = evt => {
		var argOpt = evt.target.value;
		this.setState({argOpt});
	}
	
	onArgValueChange = evt => {
		var value = evt.target.value;
		//console.log("picked arg value", value);
		
		this.setState({argValue: value});
	}

	componentDidMount(){
		this.fireQueryChange();
	}
	
	componentDidUpdate(prevProps, prevState) {
		// after state update.
		if (prevState.layer !== this.state.layer
			|| prevState.argOpt !== this.state.argOpt
			|| prevState.argValue !== this.state.argValue
			/*|| (!this.state.editingText && prevState.argValue !== this.state.argValue) // only update text-value input on field blur 
			|| (prevState.editingText !== this.state.editingText && prevState.editingText) // stopped editing text field.
			*/
		) {
			this.fireQueryChange();
		}
	}
	
	renderInput() {
		var valueOptions = getLayerValueOptions(this.state.layer, this.state.argOpt, this.state.argValue);
		if (valueOptions === undefined) {
			return (
				<input
					type="text"
					className="form-control"
					value={this.state.argValue}
					onChange={this.onArgValueChange}
					onFocus={() => this.setState({editingText: true})}
					onBlur={() => this.setState({editingText: false})}
				/>
			);
		} else {
			return (
				<select
					className="form-control"
					value={this.state.argValue}
					onChange={this.onArgValueChange}
					onFocus={() => this.setState({editingText: true})}
					onBlur={() => this.setState({editingText: false})}
				>
				{
					valueOptions.map( (valOpt) => {
						return <option value={valOpt.value}>{valOpt.label}</option>
					})
				}
				</select>
			);
		}
	}

	getLayerLabel(layer) {
		return dictionary[this.props.languageFromMain].queryinput.layers[layer].label;
	}

	getLayerArgOpts(layer) {
		return dictionary[this.props.languageFromMain].queryinput.layers[layer].argOpts;
	}

	render() {
		return (
			<div className="or or_arg">
				<div className="left_col" >
					<button
						className="btn btn-xs btn-default image_button remove_arg"
						onClick={this.props.handleRemoveADVOr}
					>
						<i className="fa fa-minus"></i>
					</button>
				</div>
				<div className="right_col inline_block" style={{display:"inline-block"}}> { /* , margin-left: "5px" */ }
					<div className="arg_selects form-inline">
						<select
							className="arg_type form-control"
							value={this.state.layer}
							onChange={this.onlayerChange}
						>
							{
								dictionary[this.props.languageFromMain].queryinput.layerCategories.map(cat => {
									return (
										<optgroup key={cat.cat} label={cat.label}>
											{
												cat.layers.map(layer => {
													return <option key={layer} value={layer}>{this.getLayerLabel(layer)}</option>;
												})
											}
										</optgroup>
									);
								})
							}
						</select>
						<select
							className="arg_opts form-control"
							value={this.state.argOpt}
							onChange={this.onArgOptChange}>
							{
								dictionary[this.props.languageFromMain].queryinput[this.getLayerArgOpts(this.state.layer)].map(argOpt => {
									return <option key={argOpt.value} value={argOpt.value}>{argOpt.label}</option>;
								})
							}
						</select>
					</div>
					<div className="arg_val_container">
						{ this.renderInput() }
					</div>
				</div>
			</div>
		);
	}
}

function getLayers() {
	const layers_arr = [];
	for (var l in layers) {
			layers_arr.push(l);
	}
	return layers_arr;
}

function getLayerArgOpts(layer) {
	return layers[layer].argOpts;
}

function isValidLayerOperator(layer, operator) {
	return !!layers[layer].argOpts.find((e) => e.value===operator);
}
function isValidLayerValue(layer, operator, value) {
	var valopts = getLayerValueOptions(layer);
	if (!valopts) {
			return true
	}
	return valopts.indexOf(value) !== -1;
}

function layerToQueryString(layer, operator, value) {
	var toStr = layers[layer].toQueryString
	if (! toStr) {
			toStr = getLayerArgOpts(layer).defaultToStr;
	}
	if (! toStr) {
			toStr = wordOptions.defaultToStr;
			console.warn("layerToQueryString: couldnt find a toQueryString method!");
	}
	var qstr = toStr(layer, operator, value);
	if (qstr === undefined) {
			console.warn("layerToQueryString: qstr undefined!");
			return 'undefined';
	}
	return qstr;
}

function getOperatorLabel(layer, operator) {
	return layers[layer].argOpts[operator].label;
}

function getLayerValueOptions(layer, operator, value) {
	var valopts = layers[layer].valueOptions;
	if (! valopts) {
			return;
	}
	if (typeof valopts === 'function') {
			return valopts(layer, operator, value);
	}
	else if (valopts.length) {
			return valopts; // array
	}
}

// a RE string matching a "double-quote"d string
const quotedStringRE = /(?:"(?:\\"|[^"])*")/.source;

// in: 'word = "zebra" '
// out: ['word', '=', 'zebra']
function queryParse(q) {
	if (!q) return null;
	var match = q.match(/^\s*(\w+) *(=|!=) *"((?:\\"|.)*?)"/);
	if(match===null) {
		return null;
	}
	
	const layer = match[1];
	const op = match[2];
	const value = match[3];
	
	var fromStr = getLayerArgOpts(layer).fromQueryString
	if (! fromStr) {
		fromStr = getLayerArgOpts(layer).defaultFromString;
	}
	
	return fromStr(layer, op, value);
}

// in: '(word = "zebra" | word = "zoo" ...)'
// out: ['word = "zebra" ', ' (word = "zoo" ...)']
function queryToORArgs(q) {
	if (!q) return null;
	var match = q.trim().match(queryToORArgs.re);
	return match;
}
queryToORArgs.re = RegExp('(?:'+quotedStringRE+'|[^()|])+', 'g')

// in: '[word = "zebra" & (word = "zoo" ...)]'
// out: ['word = "zebra" ', ' (word = "zoo" ...)']
function queryToANDArgs(q) {
	if (!q) return null
	
	var match = q.trim().match(queryToANDArgs.re);
	return match;
}
queryToANDArgs.re = RegExp('(?:'+quotedStringRE+'|[^&])+', 'g')


// in: '[word = "zebra"] [word = "zoo"]'
// out: ['[word = "zebra"]', '[word = "zoo"]']
function queryToTokens(q) {
	if (!q) return null;
	var match = q.match(queryToTokens.re);
	return match;
}
queryToTokens.re = RegExp('\\[(?:'+quotedStringRE+'|.)*?\\] *(?:\\{.*?\\})?', 'g');

var filteredWords = []
/*To simplify matching regex filter out words within "quotemarks". This help to not stumble on any special characters that can occur there. */
function filterWords(s, f) {
	const filteredString = s.replace(/("(?:\\"|[^"])*")/g, (m) => {
		filteredWords.push(m)
		return '""'
	})
	const ret = f(filteredString)
	// restore words
	
	// return return value
	return ret;
}

var wordOptions = [
	{value: 'is', label: 'is'},
	{value: 'is_not', label: 'is not'},
	{value: 'contains', label: 'contains'},
	{value: 'starts_with', label: 'starts with'},
	{value: 'ends_with', label: 'ends with'},
	{value: 'regex', label: 'regex'},
	{value: 'not_regex', label: 'not regex'},
]
var liteOptions = [
	{value: "is", label: "is"},
	{value: "is_not", label: "is not"},
]
var setOptions = [
	{value: "is", label: "is"},
	{value: "is_not", label: "is not"},
]
var probabilitySetOptions = [
	{value: "is", label: "highest_rank"},
	{value: "is_not", label: "not_highest_rank"},
	{value: "contains", label: "rank_contains"},
	{value: "contains_not", label: "not_rank_contains"},
]

setOptions.defaultToStr = (layer, op, val) => {
	switch(op) {
	case 'is': 
			return `${layer} = "${val}"`
	case 'is_not': 
			return `${layer} != "${val}"`
	}
}
setOptions.defaultFromString = (layer, op, val) => {
	return {layer, op: op==='!='?'is_not':'is', val}
}

wordOptions.defaultToStr = (layer, op, val) => {
	var unescVal = val;
	var val = escapeRegExp(val);
	switch(op) {
	case 'is': 
			return `${layer} = "${val}"`
	case 'is_not': 
			return `${layer} != "${val}"`
	case 'contains': 
			return `${layer} = ".*${val}.*"`
	case 'starts_with': 
			return `${layer} = "${val}.*"`
	case 'ends_with': 
			return `${layer} = ".*${val}"`
	case 'regex': 
			return `${layer} = "${unescVal}"`
	case 'not_regex': 
			return `${layer} != "${unescVal}"`
	}
}
wordOptions.defaultFromString = (layer, op, val) => {
	// layer should be good. Now figure out op, and if val is escaped or not
	if (op === '=') {
			var strippedOfSemiRE = val.replace(/^\.\*/, '').replace(/\.\*$/, '');
			if ( strippedOfSemiRE.length !== val.length ) {
					// could be one of: startswith, contains, endswith.
					if ( ! guessIfRegexp(strippedOfSemiRE) ) {
							// Ok, it is one of: startswith, contains, endswith.
							if (val.startsWith('.*') && val.endsWith('.*')) {
									var op2 = 'contains';
							} else if (val.startsWith('.*')) {
									op2 = 'starts_with';
							} else if (val.endsWith('.*')) {
									op2 = 'ends_with'
							} else {
									console.error("parsing query failed due to coding error");
									return null;
							}
							return {
									layer: layer,
									op: op2,
									val: unescapeRegExp(strippedOfSemiRE)
							}
					}
					// its regexp.
			}
	}
	
	if (guessIfRegexp(val)) {
			// its regexp
			return {layer, op: op==='='?'regex':'not_regex', val: val};
	}
	
	// its not regexp
	return {layer, op: op==='='?'is':'is_not', val: unescapeRegExp(val)};
}
function guessIfRegexp(s) {
	return !! s.match(/[^\\][-[\]{}()*+\\?.,^$|#]/); // find if it contains any unescaped regex characters
}
function unescapeRegExp(text) {
return text.replace(/\\([-[\]{}()*+?.,\\^$|#])/g, '$1');
}
function escapeRegExp(text) {
return text.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&');
}

const layers = {
	'word': {
			label: 'word',
			argOpts: wordOptions,
	},
	'pos': {
			label: 'part-of-speech UD v2.0 tagset',
			argOpts: setOptions,
			valueOptions: [
					{value: "ADJ", label: "Adjective"},
					{value: "ADV", label: "Adverb"},
					{value: "INTJ", label: "Interjection"},
					{value: "NOUN", label: "Noun"},
					{value: "PROPN", label: "Proper noun"},
					{value: "VERB", label: "Verb"},
					{value: "ADP", label: "Adposition"},
					{value: "AUX", label: "Auxiliary"},
					{value: "CCONJ", label: "Coordinating conjunction"},
					{value: "DET", label: "Determiner"},
					{value: "NUM", label: "Numeral"},
					{value: "PART", label: "Particle"},
					{value: "PRON", label: "Pronoun"},
					{value: "SCONJ", label: "Subordinating conjunction"},
					{value: "PUNCT", label: "Punctuation"},
					{value: "SYM", label: "Symbol"},
					{value: "X", label: "Other"},
			],
	},
	'lemma': {
			label: 'lemmatization of tokens',
			argOpts: wordOptions,
	},
	'orth': {
			label: 'orthographic transcription',
			argOpts: wordOptions,
	},
	'norm': {
			label: 'orthographic normalization',
			argOpts: wordOptions,
	},
	'phonetic': {
			label: 'phonetic transcription SAMPA',
			argOpts: wordOptions, // TODO special toString/parse? (probably due to regex character handling)
	},
	'text': {
			label: 'Layer only for Basic Search',
			argOpts: wordOptions,
	},
	'_.text_language': {
			label: 'language',
			argOpts: wordOptions,
	},
};

const layerCategories = [
	{cat: 'word', label: 'Word', layers: ['word']},
	{cat: 'wordAttribute', label: 'Word attribute', layers: ['pos', 'lemma', 'orth', 'norm', 'phonetic', 'text']},
	{cat: 'textAttribute', label: 'Text attribute', layers: ['_.text_language']},
];

export default QueryInput;
