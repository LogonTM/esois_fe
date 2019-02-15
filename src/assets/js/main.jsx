import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AggregatorPage from './pages/aggregatorpage.jsx'
import HelpPage from './pages/helppage.jsx'
import LoginPage from './pages/loginpage.jsx'
import ManageLogs from './pages/managelogs'
import ManageUsers from './pages/manageusers'
import RegisterPage from './pages/registerpage.jsx'
import ErrorPane from './components/errorpane.jsx'
import Footer from './components/footer.jsx'
import Clarinlogo from '../img/clarin-logo.png'
import EeFlag from '../img/ee-icon.png'
import GbFlag from '../img/gb-icon.png'
import LoginIcon from '../img/login-icon.png'
import SettingsIcon from '../img/settings-icon.png'
import EeEKRKlogo from '../img/ekrk-logo.png'
import EnEKRKlogo from '../img/ekrk-logo-eng.png'
import Rabalogo from '../img/raba11.png'
import Magglass from '../img/magglass.png'
import dictionary from '../../translations/dictionary'
import jQuery from 'jquery'
import { authentication_token } from './constants/constants';
import { getCurrentUser } from './utilities/functions';

const logoIntl = {
	ee: EeEKRKlogo,
	en: EnEKRKlogo
};

window.MyAggregator = window.MyAggregator || {}

var URLROOT = window.MyAggregator.URLROOT = window.location.pathname.substring(0, window.location.pathname.indexOf("/", 2)) || ''

class Main extends Component {
	componentDidMount() {
		routeFromLocation.bind(this)()
		getCurrentUser()
		.then(response => {
		var isAdmin = 'ROLE_USER';
		for(let value in response.authorities) {
			if (response.authorities[value].authority === 'ROLE_ADMIN')
				isAdmin = 'ROLE_ADMIN';
			}
			this.setState({
				userRole: isAdmin,
				userName: response.name,
			});
		}).catch(error => {
			});
	}

	componentDidUpdate() {
		routeFromLocation.bind(this)()
		if(!this.state.loggedInStatus){
			getCurrentUser()
			.then(response => {
				var isAdmin = 'ROLE_USER';
				for(let value in response.authorities) {
				if (response.authorities[value].authority === 'ROLE_ADMIN')
					isAdmin = 'ROLE_ADMIN';
				}
				this.setState({
					userRole: isAdmin,
					userName: response.name,
				});

			}).catch(error => {

			});
		}
	}
  
	constructor(props) {
		super(props)
		this.state = {
			navbarCollapse: false,
			navbarPageFn: this.renderAggregator,
			errorMessages: [],
			language: 'ee',
			loggedInStatus: localStorage.getItem(authentication_token) !== null ? true : false,
			userName: '',
			userRole: ''
		}
	}

	error = errObj => {
		var err = ''
		if (typeof errObj === 'string' || errObj instanceof String) {
			err = errObj
		} else if (typeof errObj === 'object' && errObj.statusText) {
			err = errObj.statusText
		} else {
			return
		}

		var errs = this.state.errorMessages.slice()
		errs.push(err)
		this.setState({ errorMessages: errs })
		setTimeout(() => {
			var errs = this.state.errorMessages.slice()
			errs.shift()
			this.setState({
				errorMessages: errs 
			}, () => this.state.errorMessages)
		}, 2500)
	}

	ajax = ajaxObject => {
		ajaxObject.error = ajaxObject.error || this.handleAjaxError
		jQuery.ajax(ajaxObject)
	}

	handleAjaxError = (jqXHR, textStatus, error) => {
		if (jqXHR.readyState === 0) {
			this.error(dictionary[this.state.language].errors.noNetwork)
		} else if (jqXHR.responseText) {
			this.error(jqXHR.responseText + ' (' + error + ')')
		} else {
			this.error(error + ' (' + textStatus + ')')
		}
	}

	getUserLoginStatus = (userStatus, currentUser) => {
		this.setState({
			loggedInStatus: userStatus,
			userName: currentUser
		})
	}

	getUserRole = role => {
		this.setState({
			userRole: role
		})
	}

	toggleCollapse = () => {
		this.setState({ navbarCollapse: !this.state.navbarCollapse })
	}

	renderAggregator = () => {
		return (
			<AggregatorPage
				ajax={this.ajax}
				error={this.error}
				languageFromMain={this.state.language}
				userRole={this.state.userRole}
			/>
		);
	}

	renderHelp = () => {
		return <HelpPage languageFromMain={this.state.language} />
	}

	renderRegister = () => {
		return (
			<RegisterPage
				backToAggregator={this.toAggregator.bind(this, true)}
				isUserloggedIn={this.state.loggedInStatus}
				getStatus={this.getUserLoginStatus.bind(this)}
				languageFromMain={this.state.language}
				getRole={this.getUserRole.bind(this)}
			/>
		);
	}

	renderLogin = () => {
		return (
			<LoginPage
				toRegistration={this.toRegister.bind(this, true)}
				backToAggregator={this.toAggregator.bind(this, true)}
				isUserloggedIn={this.state.loggedInStatus}
				userName={this.state.userName}
				getStatus={this.getUserLoginStatus.bind(this)}
				languageFromMain={this.state.language}
				getRole={this.getUserRole.bind(this)}
			/>
		);
	}

	renderManageUsers = () => {
		return (
			<ManageUsers 
				languageFromMain={this.state.language}
			/> // For admins only
		)
	}

	renderManageLogs = () => {
		return (
			<ManageLogs
				languageFromMain={this.state.language}
			/>
		)
	}

	getPageFns = () => {
		return {
			'': this.renderAggregator,
			help: this.renderHelp,
			login: this.renderLogin,
			register: this.renderRegister,
			manageUsers: this.renderManageUsers, // For admins only
			manageLogs: this.renderManageLogs // For admins only
		}
	}

	gotoPage = (doPushHistory, pageFnName) => {
		var pageFn = this.getPageFns()[pageFnName]
		if (this.state.navbarPageFn !== pageFn) {
			if (doPushHistory) {
			  	window.history.pushState(
					{ page: pageFnName },
					'',
					URLROOT + '/' + pageFnName
				)
			}
			this.setState({ navbarPageFn: pageFn })
		}
	}

	toAggregator = doPushHistory => {
		this.gotoPage(doPushHistory, '')
	}

	toHelp = doPushHistory => {
		this.gotoPage(doPushHistory, 'help')
	}

	toLogin = doPushHistory => {
		this.gotoPage(doPushHistory, 'login')
	}

	toRegister = doPushHistory => {
		this.gotoPage(doPushHistory, 'register')
	}

	toManageUsers = doPushHistory => {
		if(localStorage.getItem(authentication_token) !== null && this.state.userRole === 'ROLE_ADMIN') {
			this.gotoPage(doPushHistory, 'manageUsers')
		}
	}

	toManageLogs = doPushHistory => {
		if(localStorage.getItem(authentication_token) !== null && this.state.userRole === 'ROLE_ADMIN') {
			this.gotoPage(doPushHistory, 'manageLogs')
		}
	}

	changeToEE = () => {
		this.setState({
			language: 'ee'
		}) 
 	}

	changeToEN = () => {
		this.setState({
			language: 'en'
		})
	}

	renderCollapsible = () => {
		var classname =
			'navbar-collapse collapse ' + (this.state.navbarCollapse ? 'show' : '')
		return (
			<div className={classname} id='navMenu'>
				<div className='navbar-nav navbar-right' id='navbar-right'>
					<div className="d-flex flex-nowrap w-100">
						<a
							className='nav-item navbar-brand'
							tabIndex='-1'
							data-toggle='tooltip'
							title='EE'
							onClick={this.changeToEE}
						>
							<img
								className='ico'
								src={EeFlag}
								alt='EST'
							/>
						</a>
						<a
							className='nav-item navbar-brand'
							tabIndex='-1'
							data-toggle='tooltip'
							title='EN'
							onClick={this.changeToEN}
						>
							<img
								className='ico'
								src={GbFlag}
								alt='ENG'
							/>
						</a>
						<a
							className='nav-item navbar-brand'
							tabIndex="-1"
							data-toggle='tooltip'
							title='Aggregator'
							onClick={this.toAggregator.bind(this, true)}
						>
							<img
								className='symbols'
								src={Magglass}
								alt='Search'
							/>
						</a>
						<a
							className='nav-item navbar-brand'
							tabIndex="-1"
							data-toggle='tooltip'
							title='Login/Logout/Register'
							onClick={this.toLogin.bind(this, true)}
						>
							<img
								className='symbols'
								src={LoginIcon}
								alt='Login'
							/>
						</a>
						<a
							className='nav-item navbar-brand'
							tabIndex="-1"
							data-toggle='tooltip'
							title='Help'
							onClick={this.toHelp.bind(this, true)}
						>
							<img
								className='symbols'
								src={SettingsIcon}
								alt='Help'
							/>
						</a>
						{this.state.userRole === 'ROLE_ADMIN' ? this.renderAdmin() : null}
					</div>
				</div>
			</div>
		)
	}

	renderAdmin = () => {
		return(
			<div className="d-flex flex-nowrap w-100">
				<a
					className='nav-item navbar-brand'
					tabIndex="-1"
					data-toggle='tooltip'
					title='Manage Logs'
					onClick={this.toManageLogs.bind(this, true)}
				>
					<i className="fa fa-database"/>
				</a>		
				<a
					className='nav-item navbar-brand'
					tabIndex="-1"
					data-toggle='tooltip'
					title='Manage Users'
					onClick={this.toManageUsers.bind(this, true)}
				>
					<i className="fa fa-users"/>
				</a>
			</div>
		)
	}

	renderTop = () => {
		return (
			<div>
				<div className='container'>
					<nav className='navbar navbar-expand-md'>
						<header className="inline navbar-brand" id='navbar-images'>
							<a
								tabIndex="-1"
								href="https://clarin.eu/"
								target="external"
								data-toggle='tooltip'
								title='CLARIN ERIC'
							>
								<img 
									className='logo2'
									src={Clarinlogo}
									alt='CLARIN ERIC logo'
								/>
							</a>
							<a
								tabIndex="-1"
								href="https://keeleressursid.ee/"
								target="external"
								data-toggle='tooltip'
								title='Eesti Keeleressursside Keskus'
							>
								<img
									className='logo'
									src={logoIntl[this.state.language]}
									alt='Eesti Keeleressursside Keskus'
								/>
							</a>
							<a
								tabIndex="-1"
								href="/"
								title='Raba ühendatud sisuotsing'
							>
								<img
									className='logo'
									src={Rabalogo}
									alt='Raba ühendatud sisuotsing'
								/>
							</a>
						</header>
						<button
							type='button'
							className='navbar-toggler'
							data-toggle='collapse'
							data-target='#navMenu'
							aria-controls="navMenu"
							aria-expanded="false"
							aria-label="Toggle navigation"
						>
							<span className='sr-only'>
								{dictionary[this.state.language].common.toggleNavigation}
							</span>
							<span className='navbar-toggler-icon'>
								<i className="fa fa-bars"></i>
							</span>
						</button>
						{this.renderCollapsible()}
					</nav>
				</div>
				<hr className='orange-line' />
				<ErrorPane errorMessages={this.state.errorMessages} />
			</div>
		)
	}

	render() {
		return (
			<div>
				<div>
					{this.renderTop()}
				</div>
				<div id='push'>
					<div className='container'>{this.state.navbarPageFn()}</div>
				</div>
				<Footer languageFromMain={this.state.language} />
			</div>
		)
	}
}

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1
}

function getUrlParameter(name) {
	name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
	var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
	var results = regex.exec(document.location);
	return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

function tokenParser() {
	var path = window.location.pathname
	const token = getUrlParameter('token');
	if(token) {
		localStorage.setItem(authentication_token, token);
		path = '/'
		document.location = '/'
	} else {
		path = '/'
		document.location = '/'
	}
}

var routeFromLocation = function() {
	if (!this) throw 'routeFromLocation must be bound to main'
	var path = window.location.pathname
	if (path !== '/') {
		if (path === '/help') {
			this.toHelp()
		} else if (path === '/login') {
			this.toLogin()
		} else if (path === '/register'){
			this.toRegister()
		} else if (path === '/manageUsers' && localStorage.getItem(authentication_token) !== null && this.state.userRole === 'ROLE_ADMIN')  {
			this.toManageUsers()
		} else if (path === '/oauth2/redirect') {
			tokenParser();
		} else if (path === '/saml/') {
			tokenParser();
		} else if (path === '/manageLogs' && localStorage.getItem(authentication_token) !== null && this.state.userRole === 'ROLE_ADMIN') {
			this.toManageLogs()
		} else {
			this.toAggregator()
		}
	} else {
		this.toAggregator()
	}
}

var main = ReactDOM.render(<Main />, document.getElementById('body'))

window.onpopstate = routeFromLocation.bind(main)

export default Main;
