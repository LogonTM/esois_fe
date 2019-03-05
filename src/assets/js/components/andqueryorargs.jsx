import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import dictionary from '../../../translations/dictionary';
import ORArg from '../components/orarg';
import { nextId, queryToORArgs } from '../utilities/queryinputf';

class ANDQueryORArgs extends Component {
	static propTypes = {
		query: PropTypes.string,
		onQueryChange: PropTypes.func.isRequired,
		handleRemoveADVAnd: PropTypes.func.isRequired,
		languageFromMain: PropTypes.string.isRequired,
		layerMap: PropTypes.object.isRequired
	}
	
	constructor(props) {
		super(props);
		this.queryStrCache = {};
		var match = queryToORArgs(this.props.query);
		if (match === null) {
			this.state = {
				ors: ['or-' + nextId()]
			};
		} else {
			var ors = [];
			match.forEach((m) => {
				var id = 'or-' + nextId();
				ors.push(id);
				this.queryStrCache[id] = m;
			});
			this.state = {
				ors
			}
		}
	}
	
	fireQueryChange = () => {
		var orParts = this.state.ors.map( (id) => this.queryStrCache[id] );
		const queryString = orParts.length >= 2 ? '( ' + orParts.join(' | ') + ' )' : orParts[0];
		this.props.onQueryChange(queryString);
	}

	addADVOr = e => {
		this.setState( (oldSt) => {
			oldSt.ors.push('or-' + nextId());
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
						onQueryChange={(qs) => this.onQueryChange(orId, qs)}
						languageFromMain={this.props.languageFromMain}
						layerMap={this.props.layerMap}
						id={orId}
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
						data-testid='addOr'
					>
						{dictionary[this.props.languageFromMain].queryinput.or}
					</span>
					<div style={{clear:"both"}}/>
				</div>
			</div>
		);
	}
}

export default ANDQueryORArgs;