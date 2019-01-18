import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dictionary from '../../../translations/dictionary';
import { getLayerArgOpts, getLayerValueOptions, layerToQueryString, queryParse } from '../utilities/queryinputf';

class ORArg extends Component {
	
	static propTypes = {
		query: PropTypes.string,
		handleRemoveADVOr: PropTypes.func.isRequired,
		onQueryChange: PropTypes.func.isRequired,
		languageFromMain: PropTypes.string.isRequired,
		layerMap: PropTypes.object.isRequired
	}

	constructor(props) {
		super(props);
		var qp = queryParse(this.props.query, this.props.layerMap);
			
		if (qp !== null) {
			var layer = qp.layer;
			var op = qp.op;
			var val = qp.val;
		}

		this.state = {
			layer: layer||'word',
			argOpt: op||'IS',
			argValue: val||'',
			
			editingText: false,
		}
	}

	componentDidMount(){
		this.fireQueryChange();
	}

	componentDidUpdate(prevProps, prevState) {
		// after deselecting corpus if the layer no longer exists change the state of layer to 'word'
		if (Object.keys(this.props.layerMap).length < Object.keys(prevProps.layerMap).length 
			&& !this.props.layerMap.hasOwnProperty(this.state.layer)) {
				this.setState({
					layer: 'word'
				});
		}
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
	
	fireQueryChange = () => {
		const queryString = layerToQueryString(this.state.layer, this.state.argOpt, this.state.argValue);
		this.props.onQueryChange(queryString);
	}

	onlayerChange = evt => {
		const layer = evt.target.value;
		this.setState((st) => {
			const argOpt  = getLayerArgOpts(this.props.layerMap, layer)[0];
			const valueOptions = getLayerValueOptions(this.props.layerMap, layer, argOpt, st.argValue);
		var argValue = '';
			if (valueOptions === undefined) {
				argValue = '';
			} else {
				argValue = valueOptions[0];
			}
			return {
				layer,
				argOpt,
				argValue,
			}
		})
	}
	
	onArgOptChange = evt => {
		const argOpt = evt.target.value;
		this.setState({argOpt});
	}
	
	onArgValueChange = evt => {
		const argValue = evt.target.value;
		this.setState({argValue});
	}

	renderInput = () => {
		const valueOptions = getLayerValueOptions(this.props.layerMap, this.state.layer, this.state.argOpt, this.state.argValue);
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
					valueOptions.map(valOpt => {
						return (
							<option key={valOpt} value={valOpt}>
								{(dictionary[this.props.languageFromMain].queryinput.valueOptions[valOpt]) ?
								dictionary[this.props.languageFromMain].queryinput.valueOptions[valOpt] : valOpt}
							</option>
						);
					})
				}
				</select>
			);
		}
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
							{ Object.keys(this.props.layerMap).map(layer => {
									return (
										<option key={layer} value={layer}>
											{(dictionary[this.props.languageFromMain].queryinput.layer[layer]) ? 
											dictionary[this.props.languageFromMain].queryinput.layer[layer] : layer}
										</option>
									);
								})
							}
						</select>
						<select
							className="arg_opts form-control"
							value={this.state.argOpt}
							onChange={this.onArgOptChange}>
							{ (this.props.layerMap.hasOwnProperty(this.state.layer)) ?
								getLayerArgOpts(this.props.layerMap, this.state.layer).map(argOpt => {
									return (
										<option key={argOpt} value={argOpt}>
											{(dictionary[this.props.languageFromMain].queryinput.argOpts[argOpt]) ?
											dictionary[this.props.languageFromMain].queryinput.argOpts[argOpt] : argOpt}
										</option>
									);
								}) : false
							}
						</select>
					</div>
					<div className="arg_val_container">
						{ (this.props.layerMap.hasOwnProperty(this.state.layer)) ? this.renderInput() : false }
					</div>
				</div>
			</div>
		);
	}
}

export default ORArg;