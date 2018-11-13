import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AggregatorPage from './pages/aggregatorpage.jsx'
import HelpPage from './pages/helppage.jsx'
import LoginPage from './pages/loginpage.jsx'
import ErrorPane from './components/errorpane.jsx'
import Footer from './components/footer.jsx'
import Clarinlogo from '../img/clarin-logo.png'
import EeFlag from '../img/ee-icon.png'
import GbFlag from '../img/gb-icon.png'
import LoginIcon from '../img/login-icon.png'
import SettingsIcon from '../img/settings-icon.png'
import EeEKRKlogo from '../img/ekrk-logo.png'
import EnEKRKlogo from '../img/ekrk-logo-eng.png'
import Magglass from '../img/magglass.png'
import PropTypes from 'prop-types'
import { IntlProvider } from "react-intl";
import { addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_ee from 'react-intl/locale-data/ee';
import messages_en from "../../translations/en.js"
import messages_ee from "../../translations/ee.js"
import jQuery from 'jquery'
import { FormattedMessage } from 'react-intl';

addLocaleData([...locale_ee, ...locale_en])

const messages = {
	'ee': messages_ee,
	'en': messages_en
};

const logoIntl = {
	ee: EeEKRKlogo,
	en: EnEKRKlogo
};

window.MyAggregator = window.MyAggregator || {}

var URLROOT = (window.MyAggregator.URLROOT =
	window.location.pathname || '/Aggregator')

var PT = PropTypes

class Main extends Component {
	componentWillMount() {
		routeFromLocation.bind(this)()
	}
  
	constructor(props) {
		super(props)
		this.state = {
			navbarCollapse: false,
			navbarPageFn: this.renderAggregator,
			errorMessages: [],
			language: 'ee',
			loggedInStatus: false,
			userName: ''
		}
	}

	error = errObj => {
		var err = ''
		if (typeof errObj === 'string' || errObj instanceof String) {
			err = errObj
		} else if (typeof errObj === 'object' && errObj.statusText) {
			console.log('ERROR: jqXHR = ', errObj)
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
			this.setState({ errorMessages: errs })
		}, 10000)
	}

	ajax = ajaxObject => {
		ajaxObject.error = ajaxObject.error || this.handleAjaxError
		jQuery.ajax(ajaxObject)
	}

	handleAjaxError = (jqXHR, textStatus, error) => {
		if (jqXHR.readyState === 0) {
			this.error(
				<FormattedMessage
					id='ajax.network.error'
					description='no network connection error translation'
					defaultMessage='Network error, please check your internet connection'
				/>
			)
		} else if (jqXHR.responseText) {
			this.error(jqXHR.responseText + ' (' + error + ')')
		} else {
			this.error(error + ' (' + textStatus + ')')
		}
		console.log('ajax error, jqXHR: ', jqXHR)
	}

	toggleCollapse = () => {
		this.setState({ navbarCollapse: !this.state.navbarCollapse })
	}

	renderAggregator = () => {
		return (
			<AggregatorPage ajax={this.ajax} error={this.error} languageFromMain={this.state.language} />
		)
	}

	renderHelp = () => {
		return <HelpPage />
	}

	getUserLoginStatus = (userStatus) => {
		console.log('From main: ' + userStatus)
		this.setState({loggedInStatus: userStatus})
	}

	renderLogin = () => {
		return <LoginPage backToAggregator={this.toAggregator} languageFromMain={this.state.language} isUserloggedIn={this.state.loggedInStatus} getStatus={this.getUserLoginStatus.bind(this)}/>
	}

	getPageFns = () => {
		return {
			'': this.renderAggregator,
			help: this.renderHelp,
			login: this.renderLogin //Added this line to allow finding of login - JK
		}
	}

	gotoPage = (/*doPushHistory,*/ pageFnName) => {
		var pageFn = this.getPageFns()[pageFnName]
		if (this.state.navbarPageFn !== pageFn) {
			// if (doPushHistory) {
			//   window.history.pushState(
			//     { page: pageFnName },
			//     '',
			//     URLROOT + '/' + pageFnName
			//   )
			// }
			this.setState({ navbarPageFn: pageFn })
			console.log('new page: ' + document.location + ', name: ' + pageFnName)
		}
	}

	toAggregator = /*doPushHistory*/ () => {
		this.gotoPage(/*doPushHistory,*/ '')
	}

	toHelp = /*doPushHistory*/ () => {
		this.gotoPage(/*doPushHistory,*/ 'help')
	}

	toLogin = /*doPushHistory*/ () => {
		this.gotoPage(/*doPushHistory,*/ 'login')
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
							data-toggle='tooltip' title='EE'
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
							data-toggle='tooltip' title='EN'
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
							data-toggle='tooltip' title='Agregator'
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
							data-toggle='tooltip' title='Login/Logout/Register'
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
							data-toggle='tooltip' title='Help'
							onClick={this.toHelp.bind(this, true)}
						>
							<img
								className='symbols'
								src={SettingsIcon}
								alt='Help'
							/>
						</a>
					</div>
				</div>
			</div>
		)
	}

	renderTop = () => {
		return (
			<div>
				<div className='container'>
					<nav className='navbar navbar-expand-md'>
						<header className="inline navbar-brand" id='navbar-images'>
							<a tabIndex="-1" href="https://keeleressursid.ee/" target="_blank">
								<img
									className='logo'
									src={logoIntl[this.state.language]}
									alt='Eesti Keeleressursside Keskus'
								/>
							</a>
							<a tabIndex="-1" href="https://clarin.eu/" target="_blank">
								<img 
									className='logo2'
									src={Clarinlogo}
									alt='CLARIN ERIC logo'
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
								<FormattedMessage
									id='toggle.navigation'
									description='toggle navigation translation'
									defaultMessage='Toggle navigation'
								/>
							</span>
							<span className='navbar-toggler-icon'><i className="fa fa-bars"></i></span>
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
			<IntlProvider locale={this.state.language} messages={messages[this.state.language]}>
				<div>
					<div> {this.renderTop()} </div>
					<div id='push'>
						<div className='container'>{this.state.navbarPageFn()}</div>
					</div>
					<Footer />
				</div>
			</IntlProvider>
		)
	}
}

function endsWith(str, suffix) {
	return str.indexOf(suffix, str.length - suffix.length) !== -1
}

var routeFromLocation = function() {
	console.log('routeFromLocation: ' + document.location)
	if (!this) throw 'routeFromLocation must be bound to main'
	var path = window.location.pathname.split('/')
	console.log('path: ' + path)
	if (path.length >= 3) {
		var p = path[path.length - 1]
		if (p === 'help') {
			this.toHelp(false)
		} else {
			this.toAggregator(false)
		}
	} else {
		this.toAggregator(false)
	}
}

var main = ReactDOM.render(<Main />, document.getElementById('body'))

window.onpopstate = routeFromLocation.bind(main)

export default Main
