import React, { Component } from 'react';
import logo from "../../img/clarindLogo.png";

class Footer extends Component {
    render() {
	    return (
			
		<div className="container" style={{textAlign:'center'}}>
		 <p>
           Hetkel siin on clarini info aga peaks panema EKRK oma  
		   </p>
		   <div className="row">
		      <div style={{position:'relative', float:'left'}}>
		         <div className="leftist" style={{position:'absolute'}}>
		            <div>
		               <a title="about" href="about" onClick={this.toAbout}>About</a>
		            </div>
		           <div style={{color:'#777'}}>{this.props.VERSION}</div>
		         </div>
		      </div>
		      <a title="CLARIN ERIC" href="https://www.clarin.eu/">
		         <img src={logo} alt="CLARIN ERIC logo" style={{height:60}}/>
		      </a>
		      <div style={{position:'relative', float:'right'}}>
		         <div className="rightist" style={{position:'absolute', right:'0'}}>
		            <a title="contact" href="mailto:fcs@clarin.eu">Contact</a>
		         </div>
		      </div>
		 </div>
	      </div>
	    );
    }
}

export default Footer;
