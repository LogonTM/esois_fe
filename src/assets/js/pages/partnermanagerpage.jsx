import 'bootstrap';
import $ from 'jquery';
import AddPartner from '../components/addpartner.jsx'
import { back_end_host } from '../constants/constants';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';
import { register, getPartnersList } from '../utilities/functions';
import EditPartner from '../components/editpartner.jsx'
import Modal from '../components/modal.jsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchCorpusBox from '../components/searchcorpusbox';
import { TableHeaderRow } from '../constants/admintable';

class ManageCenter extends Component {
	static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
	}

    constructor(props) {
		super(props);
		this.state = {
            partners: [
				{id:"P001", name:"Esimene Partner", link:"www.test.ee/api", username: "User name", password:"passw"}
			],
		    id: {
	            value: '',
	            valid: false,
	            errormessage: null
	        },
	        name: {
                value: '',
                valid: false,
                errormessage: null
            },
            link: {
                value: '',
                valid: false,
                errormessage: null
            },
            username: {
                value: '',
                valid: false,
                errormessage: null
            },
            password: {
                value: '',
                valid: false,
                errormessage: null
            },
			centers: [],
			oneCenterId: '',
			oneCenterName: '',
			oneCenterLink: ''
		};
	}

	componentDidMount() {
		this.getCenterList();
	}

	getCenterList = () => {
		fetch(back_end_host + 'partner')
		.then(response => response.json())
		.then(result => {
			this.setState({
				centers: result
			});
		});
    }
    
    getList = () => {
        getPartnersList()
        .then(response => response.json())
        .then(result => {
            this.setState({
                users: result
            });
        });
    }

	deleteCenter = id => {
		if (window.confirm(dictionary[this.props.languageFromMain].managecenter.confirmDelete)) {
			fetch(back_end_host + 'db/center/delete/' + id, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then(response => { 
				if (response.status === 200) {
					alert(dictionary[this.props.languageFromMain].managecenter.corpusIsDeleted);
					this.getCenterList();
				} 
			});
		}
	}

	handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
	}
	
	toggleAdd = () => {
	    $(ReactDOM.findDOMNode(this.refs.AddPartnerModal)).modal();
	}

	toggleEdit = (e, id, name, link, username, password) => {
		e.preventDefault();
		$(ReactDOM.findDOMNode(this.refs.editPartnerModal)).modal();
		this.setState({
			id: {
	            value: id
	        },
	        name: {
                value: name
            },
            link: {
                value: link
            },
            username: {
                value: username
            },
            password: {
                value: password
            }

		});
	}

	searchPartner = query => {
		query = query.toLowerCase();
		let table, tr, td, i, j, found;
		table = document.getElementById("partnerList");
		tr = table.getElementsByTagName("tr");

		// Loop through all table rows, and hide those who don't match the search query
		for (i = 0; i < tr.length; i++) {
			td = tr[i].getElementsByTagName("td");
			for (j = 0; j < td.length; j++) {
				if (td[j].innerHTML.toLowerCase().indexOf(query) > -1) {
					found = true;
				}
			}
			if (found) {
				tr[i].style.display = "";
				found = false;
			} else {
				tr[i].style.display = "none";
			}
		}
	}

	render() {
		return (
			<div id='container'>
            <div className='top-gap'></div>
                <div id='searchBox'>
					<SearchCorpusBox
						search={this.searchPartner}
						placeholder={dictionary[this.props.languageFromMain].common.search}
					/>
				</div>
				<p className='align-right'>
					<Button
						label={dictionary[this.props.languageFromMain].partner.manage.add}
						onClick={this.toggleAdd}
					/>
				</p>
				<table className='table table-striped'>
					<thead className='thead-blue'>
						<tr>
							<TableHeaderRow headers={dictionary[this.props.languageFromMain].partner.manage.headers} />
							<th>
								{dictionary[this.props.languageFromMain].common.actions}
							</th>
						</tr>
					</thead>
					<tbody id='partnerList'>
						{
							this.state.partners.map((item, key) => {
								return (
									<tr key = {key}>
										<td>{item.id}</td>
										<td>{item.name}</td>
										<td>{item.link}</td>
										<td>{item.username}</td>
										<td>{item.password}</td>
										<td>
											<Button
												label={dictionary[this.props.languageFromMain].common.edit}
												onClick={e => this.toggleEdit(e, item.id, item.name, item.link, item.username, item.password)}
											/>
											&nbsp;
											<Button
												label={dictionary[this.props.languageFromMain].common.delete}
												onClick={this.deleteCenter.bind(this, item.id)}
											/>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
				<div className='bottom-gap'></div>

				<Modal
					ref='AddPartnerModal'
					title={
						<span>
							{dictionary[this.props.languageFromMain].partner.manage.add}
						</span>
					}
					languageFromMain={this.props.languageFromMain}
				>
					<AddPartner 
						languageFromMain={this.props.languageFromMain}
						getCenterList={this.getCenterList}
					/>
				</Modal>

				<Modal
					ref='editPartnerModal'
					title={
						<span>
							{dictionary[this.props.languageFromMain].managecenter.editCenterData}
						</span>
					}
					languageFromMain={this.props.languageFromMain}
				>
					<EditPartner 
						languageFromMain={this.props.languageFromMain}
						partnerID={this.state.id.value}
						partnerName={this.state.name.value}
						APIUrl={this.state.link.value}
						APIUsername={this.state.username.value}
						APIPassword={this.state.password.value}
						getCenterList={this.getCenterList}
						oneCenterId={this.state.oneCenterId}
						oneCenterName={this.state.oneCenterName}
						oneCenterLink={this.state.oneCenterLink}
						handleChange={this.handleChange}
					/>				
				</Modal>

			</div>
		)
	}
}

export default ManageCenter;