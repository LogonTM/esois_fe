import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import ELlogo from '../../img/el-reg-fond.jpg'
import FooterImg from '../../img/ekrk-footer-logo.png';

class Footer extends Component {
    render() {
	    return (
			<div id='new-footer' style={{textAlign:'center'}}>
				<div className='bottom-gap' />
				<hr className='orange-line'></hr>
				<div className='footer-with-pics'>
					<div className='row' id='footer-row'>
						<div className='col-auto col-sm-auto' id='footer-img-left'>
							<img className='footer-img-left' src={ELlogo} alt='Euroopa Liidu regionaalfond' />
						</div>
						<div className='col-xl-auto col-lg-8 col-sm-6'>
							<div className='row justify-content-center' id='footer-text'>
								<div className='col-12 col-sm-12'>
									<p>
										© 2018&nbsp;
										<FormattedMessage
											id='footer.ekrk'
											description='Eesti Keeleressursside Keskus translation'
											defaultMessage='Center of Estonian Language Resources'
										/>
									</p>
								</div>
								<div className='col-xl-auto col-lg-auto col-md-auto col-sm-12'>
									<p>
										Liivi 2-340, Tartu 50409
										<FormattedMessage
											id='footer.estonia'
											description='Estonia for page in English'
											defaultMessage=' '
										/>|
									</p>
								</div>
								<div className='col-xl-auto col-lg-auto col-md-auto col-sm-12'>
									<p>
										&nbsp;Tel. (+372) 737 6433 |&nbsp;
									</p>
								</div>						
								<div className='col-xl-auto col-lg-auto col-md-auto col-sm-auto'>
									<p>
										<a className="footer-link" title="contact" href="mailto:info@keeleressursid.ee">info@keeleressursid.ee
										</a>
									</p>
								</div>
							</div>
						</div>
						<div className='col-auto col-sm-auto' id='footer-img-right'>
							<img className='footer-img-right' src={FooterImg} alt="" />
						</div>
					</div>
				</div>
			</div>
		);
    }
}

export default Footer;
