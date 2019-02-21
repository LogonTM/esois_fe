import React, { Component } from 'react';
import PropTypes from 'prop-types';
import dictionary from '../../../translations/dictionary';
import { getLayerOperators, getLayerValueOptions, layerToQueryString, queryParse } from '../utilities/queryinputf';
import { Tooltip } from 'reactstrap';

class ORArg extends Component {
	
	static propTypes = {
		query: PropTypes.string,
		handleRemoveADVOr: PropTypes.func.isRequired,
		onQueryChange: PropTypes.func.isRequired,
		languageFromMain: PropTypes.string.isRequired,
		layerMap: PropTypes.object.isRequired,
		id: PropTypes.string.isRequired
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
			layerOperator: op||'IS',
			argValue: val||'',
			
			editingText: false,

			tooltipIsOpen: false
		}
	}

	componentDidMount() {
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
			|| prevState.layerOperator !== this.state.layerOperator
			|| prevState.argValue !== this.state.argValue
		) {
			this.fireQueryChange();
		}
	}
	
	fireQueryChange = () => {
		const queryString = layerToQueryString(this.state.layer, this.state.layerOperator, this.state.argValue);
		this.props.onQueryChange(queryString);
	}

	onlayerChange = e => {
		const layer = e.target.value;
		this.setState((st) => {
			const layerOperator  = getLayerOperators(this.props.layerMap, layer)[0];
			const valueOptions = getLayerValueOptions(this.props.layerMap, layer, layerOperator, st.argValue);
		var argValue = '';
			if (valueOptions === undefined) {
				argValue = '';
			} else {
				argValue = valueOptions[0];
			}
			return {
				layer,
				layerOperator,
				argValue,
			}
		})
	}
	
	onLayerOptChange = e => {
		const layerOperator = e.target.value;
		this.setState({layerOperator});
	}
	
	onArgValueChange = e => {
		const argValue = e.target.value;
		this.setState({argValue});
	}

	toggleTooltip = () => {
		this.setState(oldState => ({
			tooltipIsOpen: !oldState.tooltipIsOpen
		}));
	}

	renderInput = () => {
		const valueOptions = getLayerValueOptions(this.props.layerMap, this.state.layer, this.state.layerOperator, this.state.argValue);
		if (valueOptions === undefined) {
			return (
				<input
					type="text"
					className="form-control"
					value={this.state.argValue}
					onChange={this.onArgValueChange}
					onFocus={() => this.setState({editingText: true})}
					onBlur={() => this.setState({editingText: false})}
					data-testid='fcsquery-form-textinput'
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
					data-testid='valOpts'
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
			<div className="or or_arg" data-testid='orarg'>
				<div className="left_col" >
					<button
						className="btn btn-xs btn-default image_button remove_arg"
						onClick={this.props.handleRemoveADVOr}
						data-testid='removeORarg'
					>
						<i className="fa fa-minus"></i>
					</button>
				</div>
				<div className="right_col inline_block" style={{display:"inline-block"}}>
					<div className="arg_selects form-inline">
						<select
							className="arg_type form-control"
							value={this.state.layer}
							onChange={this.onlayerChange}
							id={`orarg-${this.props.id}`}
						>
						{ dictionary[this.props.languageFromMain].queryinput.tooltips[this.state.layer] ?
							<Tooltip
								placement="auto"
								isOpen={this.state.tooltipIsOpen}
								target={`orarg-${this.props.id}`}
								toggle={this.toggleTooltip}
							>
								{dictionary[this.props.languageFromMain].queryinput.tooltips[this.state.layer]}
							</Tooltip>
							: false
						}
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
							value={this.state.layerOperator}
							onChange={this.onLayerOptChange}
						>
							{ (this.props.layerMap.hasOwnProperty(this.state.layer)) ?
								getLayerOperators(this.props.layerMap, this.state.layer).map(layerOpt => {
									return (
										<option key={layerOpt} value={layerOpt}>
											{(dictionary[this.props.languageFromMain].queryinput.layerOperators[layerOpt]) ?
											dictionary[this.props.languageFromMain].queryinput.layerOperators[layerOpt] : layerOpt}
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