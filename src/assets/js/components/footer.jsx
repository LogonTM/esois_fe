import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ELlogo from '../../img/el-reg-fond.jpg'
import FooterImg from '../../img/ekrk-footer-logo.png';

class Footer extends Component {
    render() {
	    return (
			<div id='new-footer' style={{textAlign:'center'}}>
				<img className="footer-img-left" src={ELlogo} alt='Euroopa Liidu regionaalfond' />
				<div>
					<div className='bottom-gap' />
					<hr className="orange-line"></hr>
					<div className="row justify-content-center" id="footer-text">
						<div className="col-xl-auto col-lg-12 col-sm-12 col-md-12">
							<p>
								© 2018&nbsp;
								<FormattedMessage
									id='footer.ekrk'
									description='Eesti Keeleressursside Keskus translation'
									defaultMessage='Center of Estonian Language Resources'
								/>
							</p>
						</div>
						<div className="col-xl-auto col-lg-auto col-sm-12 col-md-12">
							<p>
								&nbsp;| Liivi 2-340, Tartu 50409
								<FormattedMessage
									id='footer.estonia'
									description='Estonia for page in English'
									defaultMessage=' '
								/>|
							</p>
						</div>
						<div className="col-xl-auto col-lg-auto col-sm-auto col-md-auto">
							<p>
								&nbsp;Tel. (+372) 737 6433 |&nbsp;
							</p>
						</div>						
						<div className="col-xl-auto col-lg-auto col-sm-auto col-md-auto">
							<p>
								<a className="footer-link" title="contact" href="mailto:info@keeleressursid.ee">info@keeleressursid.ee
								</a>
							</p>
						</div>
					</div>
				</div>
				<img className="footer-img-right" src={FooterImg} alt="" />
			</div>);
    }
}

export default Footer;
