import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import AboutPage from './pages/aboutpage.jsx'
import AggregatorPage from './pages/aggregatorpage.jsx'
import HelpPage from './pages/helppage.jsx'
import LoginPage from './pages/loginpage.jsx'
import StatisticsPage from './pages/statisticspage.jsx'
import ErrorPane from './components/errorpane.jsx'
import Footer from './components/footer.jsx'
import EmbeddedFooter from './components/embeddedfooter.jsx'
import logo from '../img/clarindLogo.png'
import ELlogo from '../img/el-reg-fond.png'
import EeEKRKlogo from '../img/logo.png'
import EnEKRKlogo from '../img/logo-eng.png'
import Magglass from '../img/magglass.png'
import PropTypes from 'prop-types'
import { IntlProvider } from "react-intl";
import { addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_ee from 'react-intl/locale-data/ee';
import messages_en from "../../en.js"
import messages_ee from "../../ee.js"
//import createReactClass from "create-react-class";
import jQuery from 'jquery'
// import './main.js'
import { FormattedMessage } from 'react-intl';

// (function() {
// "use strict";

addLocaleData([...locale_ee, ...locale_en])

// var language = 'ee';

const messages = {
    'ee': messages_ee,
    'en': messages_en
};

const logoIntl = {
  ee: EeEKRKlogo,
  en: EnEKRKlogo
};

window.MyAggregator = window.MyAggregator || {}

var VERSION = (window.MyAggregator.VERSION = 'v.2.9.91-57')

var URLROOT = (window.MyAggregator.URLROOT =
  //window.location.pathname.substring(0, window.location.pathname.indexOf("/",2)) ||
  window.location.pathname || '/Aggregator')

var PT = PropTypes

/**
The FCS Aggregator UI is based on reactjs.
- index.html: describes the general page structure, with a push-down footer;
  on that structure the Main and Footer components are plugged.
- main.jsx: composes the simple top components (Main, AggregatorPage, HelpPage, 
  AboutPage, StatisticsPage) in pages/
- pages/aggregatorpage.jsx: defines
	- the Corpora store of collections
	- the AggregatorPage component which deals with search and displays the search results
- components/corpusview.jsx: defines the CorpusView, rendered when the user views the available collections
- plus in components/: various general usage React components

The top-most component, Main, tracks of the window's location URL and, depending on the value,
  renders various components inside its frame:
	- AggregatorPage is the view corresponding to the normal search UI (search bar and all)
	  This is the most complex component.
	- HelpPage renders the help page
	- AboutPage renders the about page
	- StatisticsPage renders the stats page
	- another URL, /Aggregator/embed, determines Main and AggregatorPage to render just the search bar.
	  The embedded view is supposed to work like a YouTube embedded clip.
*/

//var Main = createReactClass({
// fixme! - class Main extends React.Component {
class Main extends Component {
  componentWillMount /*: function*/() {
    routeFromLocation.bind(this)()
  } //,

  // getInitialState/*: function */() {
  // 	return {
  // 		navbarCollapse: false,
  // 		navbarPageFn: this.renderAggregator,
  // 		errorMessages: [],
  // 	};
  // }//,
  constructor(props) {
    super(props)
    this.state = {
      navbarCollapse: false,
      navbarPageFn: this.renderAggregator,
      errorMessages: [],
      language: 'ee',
      logedInStatus: false
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

    // var that = this;
    var errs = this.state.errorMessages.slice()
    errs.push(err)
    this.setState({ errorMessages: errs })

    setTimeout(() => {
      var errs = this.state.errorMessages.slice()
      errs.shift()
      this.setState({ errorMessages: errs })
    }, 10000)
  } //,

  /* 	ajax/*: function(ajaxObject) {
		var that = this;
		if (!ajaxObject.error) {
			ajaxObject.error = function(jqXHR, textStatus, error) {
				if (jqXHR.readyState === 0) {
					that.error("Network error, please check your internet connection");
				} else if (jqXHR.responseText) {
					that.error(jqXHR.responseText + " ("+error+")");
				} else  {
					that.error(error + " ("+textStatus+")");
				}
				console.log("ajax error, jqXHR: ", jqXHR);
			};
		}
		// console.log("ajax", ajaxObject);
		jQuery.ajax(ajaxObject);
	}//, */

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
  } //,

  renderAggregator = () => {
    return (
      <AggregatorPage ajax={this.ajax} error={this.error} embedded={false} languageFromMain={this.state.language} />
    )
  } //,

  renderHelp = () => {
    return <HelpPage />
  } //,

  getUserLoginStatus = (userStatus) => {
    console.log('From main: ' + userStatus)
    this.setState({logedInStatus: userStatus})
  }

  renderLogin = () => {
    return <LoginPage languageFromMain={this.state.language} isUserLogedIn={this.state.logedInStatus} getStatus={this.getUserLoginStatus.bind(this)}/>
  }

  renderAbout = () => {
    return <AboutPage toStatistics={this.toStatistics} />
  } //,

  renderStatistics = () => {
    return <StatisticsPage ajax={this.ajax} />
  } //,

  renderEmbedded = () => {
    return (
      <AggregatorPage ajax={this.ajax} error={this.error} embedded={true} />
    )
  } //,

  getPageFns = () => {
    return {
      '': this.renderAggregator,
      help: this.renderHelp,
      about: this.renderAbout,
      stats: this.renderStatistics,
      embed: this.renderEmbedded,
      login: this.renderLogin //Added this line to allow finding of login - JK
    }
  } //,

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
  } //,

  toAggregator = /*doPushHistory*/ () => {
    this.gotoPage(/*doPushHistory,*/ '')
  }
  toHelp = /*doPushHistory*/ () => {
    this.gotoPage(/*doPushHistory,*/ 'help')
  }
  toAbout = /*doPushHistory*/ () => {
    this.gotoPage(/*doPushHistory,*/ 'about')
  }
  toStatistics = /*doPushHistory*/ () => {
    this.gotoPage(/*doPushHistory,*/ 'stats')
  }
  toEmbedded = /*doPushHistory*/ () => {
    this.gotoPage(/*doPushHistory,*/ 'embed')
  }
  toLogin = /*doPushHistory*/ () => {
    this.gotoPage(/*doPushHistory,*/ 'login')
  } 

  // renderLogin /*: function*/() {
  //   // return  <li className="unauthenticated">
  //   // 			<a href="login" tabIndex="-1"><span className="glyphicon glyphicon-log-in"></span> LOGIN</a>
  //   // 		</li>;
  // } //,

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
          <a className='nav-item navbar-brand' /*href={URLROOT}*/ tabIndex='-1' onClick={this.changeToEE}>
            <img className='ico' src='img/ee-icon.png' alt='EST' />
          </a>
          <a className='nav-item navbar-brand' /*href={URLROOT}*/ tabIndex='-1' onClick={this.changeToEN}>
            <img className='ico' src='img/gb-icon.png' alt='ENG' />
          </a>
          <a /*href={URLROOT}*/ className='nav-item navbar-brand' tabIndex="-1" onClick={this.toAggregator.bind(this, true)}>
            <img className='symbols' src={Magglass} alt='Search' />
          </a>
          <a /*href={URLROOT}*/ className='nav-item navbar-brand' tabIndex="-1" onClick={this.toLogin.bind(this, true)}>
            <img className='symbols' src='img/login-icon.png' alt='Login' />
          </a>
          <a /*href={URLROOT}*/ className='nav-item navbar-brand' tabIndex="-1" onClick={this.toHelp.bind(this, true)}>
            <img className='symbols' src='img/settings-icon.png' alt='Help' />
          </a>
          </div>
        </div>
      </div>
    )
  } //,

  renderTop = () => {
    if (this.state.navbarPageFn === this.renderEmbedded) {
      return false
    }
    return (
      <div>
      <div className='container'>
        <nav className='navbar navbar-expand-md'>
{/*           <div
            className='navbar navbar-default navbar-static-top'
            role='navigation'> */}
            
{/*               <div className='navbar-brand' id='navbar-images'> */}
                <header className="inline navbar-brand" id='navbar-images'>
                  <a tabIndex="-1" href="https://keeleressursid.ee/" target="_blank">
                    <img
                      className='logo'
                      src={logoIntl[this.state.language]}
                      alt='Eesti Keeleressursside Keskus'
                    />
                  </a>
                  <img
                    className='logo2'
                    src={ELlogo}
                    alt='Euroopa Liidu regionaalfond'
                  />
                  <a tabIndex="-1" href="https://clarin.eu/" target="_blank">
                    <img 
                      className='logo2'
                      src={logo}
                      alt='CLARIN ERIC logo'
                    />
                  </a>
                  </header>
                {/* <a className="navbar-brand" href={URLROOT} tabIndex="-1">
                  <img width="28px" height="28px" src="img/magglass1.png"/>
                  <header className="inline"> Content Search </header>
                                  onClick={this.toggleCollapse}
                </a> */}
{/*               </div> */}
              <button
                type='button'
                className='navbar-toggler'
                data-toggle='collapse'
                data-target='#navMenu'
                aria-controls="navMenu"

                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className='sr-only'>Toggle navigation</span>
                <span className='navbar-toggler-icon'><i className="fa fa-bars"></i></span>


              </button>
              {this.renderCollapsible()}


{/*           </div> */}
        </nav>
        </div>
        <hr className='orange-line' />
        <ErrorPane errorMessages={this.state.errorMessages} />
      </div>
    )
  } //,

  render /*: function*/() {
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
} //);

// StatisticsPage

// HelpPage

// AboutPage

// Footer

// EmbeddedFooter

function isEmbeddedView() {
  var path = window.location.pathname.split('/')
  return path.length >= 3 && path[path.length - 1] === 'embed'
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
    } else if (p === 'about') {
      this.toAbout(false)
    } else if (p === 'stats') {
      this.toStatistics(false)
    } else if (p === 'embed') {
      this.toEmbedded(false)
    } else {
      this.toAggregator(false)
    }
  } else {
    this.toAggregator(false)
  }
}

var main = ReactDOM.render(<Main />, document.getElementById('body'))
/* if (!isEmbeddedView()) {
  ReactDOM.render(
    <Footer VERSION={VERSION} toAbout={main.toAbout} />,
    document.getElementById('footer')
  )
} else {
  ReactDOM.render(
    <EmbeddedFooter URLROOT={URLROOT} />,
    document.getElementById('footer')
  )
  if (jQuery) {
    jQuery('body, #footer').addClass('embedded')
  }
} */

window.onpopstate = routeFromLocation.bind(main)

// })();

export default Main
