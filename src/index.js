import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import AggregatorPage from "./assets/js/pages/aggregatorpage.jsx";
import Footer from "./assets/js/components/footer.jsx";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

//ReactDOM.render(<AggregatorPage />, document.getElementById('body'));
ReactDOM.render(<Footer />, document.getElementById('footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
