import React from 'react';
import ReactDOM from 'react-dom';
// import messages_en from "./translations/en.json";
// import messages_ee from "./translations/ee.json";
import {IntlProvider} from "react-intl";
import { addLocaleData } from 'react-intl';
import locale_en from 'react-intl/locale-data/en';
import locale_ee from 'react-intl/locale-data/ee';
import messages_en from "./en.js";
import messages_ee from "./ee.js";
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

addLocaleData([...locale_ee, ...locale_en])

const language = 'ee';

const messages = {
    'ee': messages_ee,
    'en': messages_en
};

ReactDOM.render(
    <IntlProvider locale={language} messages={messages[language]}>
        <Main />
    </IntlProvider>, 
    document.getElementById('body'));


// ReactDOM.render(<AggregatorPage />, document.getElementById('body'));
// ReactDOM.render(<Footer />, document.getElementById('footer'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
