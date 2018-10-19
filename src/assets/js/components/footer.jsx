import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
//import logo from "../../img/clarindLogo.png";

class Footer extends Component {
    render() {
	    return (
			<div id='new-footer' style={{textAlign:'center'}}>
				<div>
				<div className='bottom-gap' />
				<hr className="orange-line"></hr>
				<p>
					© 2018 
					<FormattedMessage
						id='ekrk'
						description='Eesti Keeleressursside Keskus translation'
						defaultMessage=' Center of Estonian Language Resources '
					/>
						| Liivi 2-340, Tartu 50409
					<FormattedMessage
						id='estonia'
						description='Estonia for page in English'
						defaultMessage=' '
					/>
						| Tel. (+372) 737 6433 | <a 
					className="footer-link" title="contact" href="mailto:info@keeleressursid.ee">info@keeleressursid.ee</a>  
				</p>
				</div>
				<img className="footer-img" src="img/EKRK_logoraamat_2-000.png" alt="" />
			</div>);
    }
}

export default Footer;
