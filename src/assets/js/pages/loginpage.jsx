import React, { Component } from 'react';

class LoginPage extends Component {
	logIn () {
		
	}

	render () {
		return	(
			<div>
				<div className="top-gap">
					<h1>Login</h1>
					<h3>Hetkel tühi, vaja luua.</h3>
					<button type="button" className="btn btn-default btn-lg" onClick={this.logIn} >
						<span aria-hidden="true"></span>
						&nbsp;Login
					</button>
				</div>
			</div>
		);
	}
}

export default LoginPage;
