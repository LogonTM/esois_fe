import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import Main from './assets/js/main.jsx';
// import AggregatorPage from "./assets/js/pages/aggregatorpage.jsx";
// import Footer from "./assets/js/components/footer.jsx";
import './assets/adv.css';
import './assets/CLARIN.css';
import './assets/base.css';
import 'bootstrap';
import './assets/lib/bootstrap.min.css';
import './assets/lib/font-awesome.min.css';


import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Main />, document.getElementById('body'));


// ReactDOM.render(<AggregatorPage />, document.getElementById('body'));
// ReactDOM.render(<Footer />, document.getElementById('footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
