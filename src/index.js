import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './assets/js/main.jsx';
import './assets/adv.css';
import './assets/base.css';
import 'bootstrap';
import './assets/lib/bootstrap.min.css';
import './assets/lib/font-awesome.min.css';
import './assets/lib/toggle-switch.css';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Main />, document.getElementById('body'));

serviceWorker.register();
