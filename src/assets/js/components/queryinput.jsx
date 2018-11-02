import React, { Component } from 'react';
import classNames from "classnames";
import PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import { FormattedMessage } from 'react-intl';

var PT = PropTypes;

class QueryInput extends Component {
    static propTypes = {
		searchedLanguage: PT.array,
		queryTypeId: PT.string.isRequired,
		query: PT.string,
		embedded: PT.bool.isRequired,
		placeholder: PT.string,
		onChange: PT.func.isRequired,
		onQuery: PT.func.isRequired,
		onKeyDown: PT.func.isRequired,
    }

    render() {
	// if (this.props.queryTypeId === "cql") {
	    return (
		<input className="form-control input-lg search" 
		       id="query-cql" name="query-cql" type="text"
		       value={this.props.query} placeholder={this.props.placeholder}
		       tabIndex="1" onChange={this.props.onChange} 
		       //onQuery={this.props.onQuery}
		       onKeyDown={this.props.onKeyDown} 
		       ref="cqlOrEmbeddedQuery"/>
	    );
/* 	} else if (this.props.embedded && this.props.queryTypeId === "fcs") {
	    return (
		<textarea className="form-control input-lg search"
		       id="query-fcs" name="query-fcs"
		       type="text" rows="1"
		       value={this.props.query} placeholder={this.props.placeholder}
		       tabIndex="1" onChange={this.props.onChange} 
		       //onQuery={this.props.onQuery}
		       onKeyDown={this.props.onKeyDown} 
		       ref="fcsOrEmbeddedQuery" />
	    );
	}
	return (<div id="adv_query_input_group" className="input-group-addon">
		    <ADVTokens
	                query={this.props.query}
	                ref="fcsGQB"
	            />
	</div>); */
    }
}

class ADVTokens extends Component {
    static propTypes = {
		query: PT.string,
    }
	constructor(props) {
		super(props);
		this.state = {
			tokenCounter: 1,
			tokens: ["token1"],
		};
	}

    addADVToken = () => {
		var i = this.state.tokenCounter + 1;
		this.state.tokens.push('token' + i);
		this.setState({tokenCounter: i, tokens: this.state.tokens});
    }
    
    removeADVToken = id => {
		var tokens = this.state.tokens;
		var i = tokens.indexOf(id);
		if (tokens.length > 1) {
			var one = tokens;
			var two = one.slice(0, i - 1).concat(one.slice(i));;
			this.setState({tokens: two});
		}
    }

    render() {
	var i = 0;
	var tokens = this.state.tokens.map((token, i) => {
	    return (
			<CSSTransition key={i} classNames="token" timeout={{enter: 250, exit: 250}}>
				<ADVToken 
					key={token}
					parentToken={token}
					handleRemoveADVToken={this.removeADVToken} />
			</CSSTransition>);
	});

	return (
		<div>
			<TransitionGroup>{tokens}</TransitionGroup>
			<button className="btn btn-xs btn-default image_button insert_token" type="button" onClick={this.addADVToken} ref="addToken">
				<i className="fa fa-plus"></i>
			</button>
		</div>);
    }
}

class ADVToken extends Component {
    static propTypes = {
		parentToken: PT.string.isRequired,
		handleRemoveADVToken: PT.func.isRequired,
    }
    render() {
	return (
		<div className="token query_token inline btn-group" style={{display:"inline-block"}}>
			<div className="token_header">
				<button className="btn btn-xs btn-default image_button close_btn" type="button"
					onClick={this.props.handleRemoveADVToken(this.props.parentToken)} ref="removeToken">
					<i className="fa fa-minus-circle" />
				</button>
				<div style={{clear:"both"}} />
			</div>
			<div className="args">
					{ /* and.query_arg* and token_footer */ }
					<ANDQueryArgs />
				<div className="lower_footer">
				</div>
			</div>
		</div>);
    }
}

class ADVTokenMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			"hideRepeatMenu": true,
		};
	}

	toggleRepeatMenu = e => {
	    this.setState({"hideRepeatMenu": !this.state.hideRepeatMenu});
	    e.preventDefault();
	}
	
	render() {
	    return (
		<div>
			<button className="btn btn-xs btn-default image_button repeat_menu" onClick={this.toggleRepeatMenu} ref="repeatMenu">
				<i className="fa fa-cog" />
			</button>
			<div id="repeatMenu" className={"repeat hide-" + this.state.hideRepeatMenu}>
				<span>
					<FormattedMessage
						id='repeatMenu.repeat'
						description='repeat translation'
						defaultMessage='repeat'
					/>&nbsp;
				</span>
				<input type="number" id="repeat1" value={this.state.repeat1} ref="repeat1"/>
				<span>&nbsp;
					<FormattedMessage
						id='repeatMenu.to'
						description='to translation'
						defaultMessage='to'
					/>&nbsp;
				</span>
				<input type="number" id="repeat2" value={this.state.repeat2} ref="repeat2"/>
				<span>&nbsp;
					<FormattedMessage
						id='repeatMenu.times'
						description='times translation'
						defaultMessage='times'
					/>
				</span>
			</div>
	    </div>);
	}
}

class ANDQueryArgs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			andCounter: 1,
			ands: ["and1"],
		};
	}

	setADVTokenLayer(layer) {
	    //fixme! - check against valid layers
	    return;
	}

	addADVAnd = () => {
	    var i = this.state.andCounter + 1;
	    this.state.ands.push('and' + i);
	    this.setState({andCounter: i, ands: this.state.ands});

	}

	removeADVAnd = id => {
	    var ands = this.state.ands;
	    var i = ands.indexOf(id);
	    if (ands.length > 1) {
			var one = ands;
			var two = one.slice(0, i - 1).concat(one.slice(i));;
			this.setState({ands: two});
	    }
	}

	renderANDTokenFooter = () => {
	    return (
			<div className="token_footer">
				<button className="btn btn-xs btn-default image_button insert_arg"
					onClick={this.addADVAnd} ref="addAndButton">
					<i className="fa fa-plus"/>
				</button>
				<ADVTokenMenu/>
				<div style={{clear:"both"}}/>
			</div>
		);
	}

	renderANDQueryArg = and => {
	    return (
			<div className="and query_arg">
				<span className="hidden">
					<FormattedMessage
						id='and'
						description='and translation'
						defaultMessage='and'
					/>
				</span>
				<ANDQueryORArgs 
					numAnds={this.state.ands.length}
					parentAnd={and}
					handleRemoveADVAnd={this.removeADVAnd}/>
			</div>
		);
	}
	
	render() {
	    var andQueryArgs = this.state.ands.map((and, i) => {
	    return (
			<CSSTransition key={i} classNames="fade" timeout={{enter: 200, exit: 200}}>
				<div key={and}>{this.renderANDQueryArg(and)}</div>
			</CSSTransition>);
			}
		);
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

class ANDQueryORArgs extends Component{
    static propTypes = {
		numAnds: PT.number.isRequired,
		parentAnd: PT.string.isRequired,
		handleRemoveADVAnd: PT.func.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			orCounter: 1,
			ors: [{id: "or1", layerType: "string:lemma", placeholder: "Bagdad"}],
		};
	}

    setADVTokenOp(op) {
	//fixme! - check against valid layers
		return;
    }

    setADVInputDefault(or) {
	//fixme! - disable SearchButton if not atleast 1 token is in the query filter
		return;
    }

    validateADV(value) {
	//fixme! - disable SearchButton if not atleast 1 token is in the query filter
		return;
    }

    addADVOr = e => {
		var i = this.state.orCounter + 1;
		this.state.ors.push({id: 'or' + i, layerType: "string:pos", placeholder: "PROPN"});
		this.setState({orCounter: i, ors: this.state.ors});
    }

    removeADVOr = (id, e) => {
		var ors = this.state.ors;
		var i = ors.indexOf(id);
		if (ors.length > 1) {
			var one = ors;
			var two = one.slice(0, i - 1).concat(one.slice(i));;
			this.setState({ors: two});
		} else if (ors.length === 1 && this.props.numAnds > 1) {
			this.props.handleRemoveADVAnd(this.props.parentAnd);
		}
    }

    render() {
		var orArgs = this.state.ors.map( (or, i) => {
			return ( 		
				<CSSTransition key={i} classNames="fade" timeout={{enter: 200, exit: 200}}>
					<ORArg 
						key={or.id} 
						data={or} 
						handleRemoveADVOr={this.removeADVOr}
						handleSetADVInputDefault={this.setADVInputDefault}
						handleSetADVTokenOp={this.setADVTokenOp}
						handleValidateADV={this.validateADV}
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
					<span className="link" onClick={this.addADVOr} ref={'addOR' + this.props.numAnds}>
						<FormattedMessage
							id='or'
							description='or translation'
							defaultMessage='or'
						/>
					</span>
					<div style={{clear:"both"}}/>
				</div>
			</div>
		);
    }
}

class ORArg extends Component {
    static propTypes = {
		data: PT.object.isRequired,
		handleRemoveADVOr: PT.func.isRequired,
		handleSetADVInputDefault: PT.func.isRequired,
		handleSetADVTokenOp: PT.func.isRequired,
		handleValidateADV: PT.func.isRequired,
    }

    render() {
	return (
		<div className="or or_arg">
			<div className="left_col" >
				<button className="btn btn-xs btn-default image_button remove_arg" onClick={this.props.handleRemoveADVOr.bind(null, this.props.data.id)}
					ref={'removeADVOr_' + this.props.data.id}>
					<i className="fa fa-minus"></i>
				</button>
			</div>
			<div className="right_col inline_block" style={{display:"inline-block"}}> { /* , margin-left: "5px" */ }
				<div className="arg_selects lemma">
					<select className="arg_type" onChange={this.props.handleSetADVInputDefault("or")} defaultValue={this.props.data.layerType}
						ref={'ANDLayerType_' + this.props.data.id}>
						{ /* onChange={this.handleSetADVTokenLayer("value")} */}
						<FormattedMessage
							id='orarg.word'
							description='word in ORArg translation'
							defaultMessage='word'
						>
							{word => (
								<optgroup label={word}>
									{ /* ::before */ }
									<FormattedMessage
										id='orarg.word'
										description='word in ORArg translation'
										defaultMessage='word'
									>
										{text => (
											<option value="string:word">{text}</option>
										)}
									</FormattedMessage>
								</optgroup>
							)}
						</FormattedMessage>
						<FormattedMessage
							id='orarg.wordAttribute'
							description='word attribute translation'
							defaultMessage='wordAttribute'
						>
							{wordAttribute => (
								<optgroup label={wordAttribute}>
									{ /* ::before */ }
									<FormattedMessage
										id='orarg.partofspeech'
										description='part-of-speech in ORArg translation'
										defaultMessage='part-of-speech'
									>
										{pos => (
											<option value="string:pos" label="word">{pos}</option>
										)}
									</FormattedMessage>
									<FormattedMessage
										id='orarg.lemma'
										description='lemma in ORArg translation'
										defaultMessage='lemma'
									>
										{lemma => (
											<option value="string:lemma">{lemma}</option>
										)}
									</FormattedMessage>
								</optgroup>
							)}
						</FormattedMessage>
						<FormattedMessage
							id='orarg.textAttribute'
							description='text attribute translation'
							defaultMessage='textAttribute'
						>
							{textAttribute => (
								<optgroup label={textAttribute}>
									<FormattedMessage
										id='orarg.language'
										description='language in ORArg translation'
										defaultMessage='language'
									>
										{language => (
											<option value="string:_.text_language" label="language">{language}</option>
										)}
									</FormattedMessage>
								</optgroup>
							)}
						</FormattedMessage>
					</select>
					<select className="arg_opts" defaultValue="string:contains" onChange={this.props.handleSetADVTokenOp("op")}>
						<FormattedMessage
							id='is'
							description='is translation'
							defaultMessage='is'
						>
							{is => (
								<option value="string:contains" label="is">{is}</option>
							)}
						</FormattedMessage>
						<FormattedMessage
							id='is.not'
							description='is not translation'
							defaultMessage='is not'
						>
							{isnot => (
								<option value="string:not contains" label="is not">{isnot}</option>
							)}
						</FormattedMessage>
					</select>
				</div>
				<div className="arg_val_container">
					<input id={'inputADV_' + this.props.data.id} type="text" defaultValue={this.props.data.placeholder}
						onChange={this.props.handleValidateADV} ref={'textEntry_' + this.props.data.id}/>
				</div>
				<select> 
					<FormattedMessage
						id='orarg.properNoun'
						description='proper noun in ORArg translation'
						defaultMessage='Proper Noun'
					>
						{propn => (
							<option label="PROPN" value="string:PROPN">{propn}</option>
						)}
					</FormattedMessage>
				</select>
			</div>
		</div>);
    }
}

export default QueryInput;
