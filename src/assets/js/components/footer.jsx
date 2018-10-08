import React, { Component } from 'react';
//import logo from "../../img/clarindLogo.png";

class Footer extends Component {
    render() {
	    return (
			<div style={{textAlign:'center'}}>
			<img class="footer-img" src="img/EKRK_logoraamat_2-000.png" alt="" />
				<div class="footer">
				<hr className="orange-line"></hr>
				<p>
					© 2018 Eesti Keeleressursside Keskus | Liivi 2-340, Tartu 50409 | Tel. (+372) 737 6433 | <a className="footer-link" title="contact" href="mailto:info@keeleressursid.ee">info@keeleressursid.ee</a>  
				</p>
				</div>
			</div>);
    }
}

export default Footer;
