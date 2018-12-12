import React, { Component } from 'react';
import dictionary from '../../../translations/dictionary';
import ELlogo from '../../img/vunk.png'
import FooterImg from '../../img/ekrk-footer-logo.png';
import PropTypes from 'prop-types';

class Footer extends Component {
	static propTypes = {
		languageFromMain: PropTypes.string.isRequired
	}

    render() {
	    return (
			<div id='new-footer' style={{textAlign:'center'}}>
				<div className='bottom-gap' />
				<div className='footer-with-pics'>
					<div className='row' id='footer-row'>
						<div className='col-auto col-sm-auto' id='footer-img-left'>
							<img className='footer-img-left' src={ELlogo} alt='Vunk by Telia' />
						</div>
						<div className='col-xl-8 col-lg-8 col-sm-6 col-5'>
							<div className='row justify-content-center' id='footer-text'>
								<div className='col-12 col-sm-12 col-12'>
									<p>
										© 2018&nbsp;
										{dictionary[this.props.languageFromMain].footer.ekrk}
									</p>
								</div>
								<div className='col-xl-auto col-lg-auto col-md-auto col-sm-12 col-12'>
									<p>
										Pirni 12, Tallinn, Estonia
										{dictionary[this.props.languageFromMain].footer.estonia} |
									</p>
								</div>
								<div className='col-xl-auto col-lg-auto col-md-auto col-sm-12 col-12'>
									<p>
										&nbsp;Tel. (+372)  5176207 |&nbsp;
									</p>
								</div>						
								<div className='col-xl-auto col-lg-auto col-md-auto col-sm-auto col-12'>
									<p>
										<a className="footer-link" title="contact" href="mailto:info@heisi.ee">info@heisi.ee
										</a>
									</p>
								</div>
							</div>
						</div>
					
					</div>
				</div>
			</div>
		);
    }
}

export default Footer;
