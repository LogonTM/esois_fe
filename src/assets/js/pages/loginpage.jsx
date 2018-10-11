import React, { Component } from 'react';

class LoginPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: ""
		};
	}
	
	logIn () {
		// TODO
	}

	backToAggregator () {
		// TODO
	}

	handleUsernameChange = event => {
		var username = event.target.value;
		this.setState({username: username})	
	}

	handlePasswordChange = event => {
		var password = event.target.value;
		this.setState({password: password})
		event.stopPropagation();
	}

	render () {
		return	(
			<div>
				<div className="top-gap">
					<input className="form-control search search-collection" type="text" 
						value={this.state.username} placeholder="Username" 
						onChange={this.handleUsernameChange.bind(this)} />
						<input className="form-control search search-collection" type="password" name="password"
						value={this.state.password} placeholder="Password" 
						onChange={this.handlePasswordChange.bind(this)} />
					<button type="button" className="btn btn-default btn-lg" onClick={this.logIn} >
						<span aria-hidden="true"></span>
						&nbsp;Login
					</button>
					<button type="button" className="btn btn-default btn-lg" onClick={this.backToAggregator} >
						<span aria-hidden="true"></span>
						&nbsp;Tagasi aggregaatorisse
					</button>
				</div>
			</div>
		);
	}
}

export default LoginPage;
