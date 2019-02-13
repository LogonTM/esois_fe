import 'bootstrap';
import $ from 'jquery';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';
import EditUser from '../components/edituser.jsx'
import Modal from '../components/modal.jsx';
import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import SearchCorpusBox from '../components/searchcorpusbox';
import { TableHeaderRow } from '../constants/admintable';
import { getCurrentUsers, getUserRoles, deleteUser } from '../utilities/functions';

class ManageUsers extends PureComponent {
	static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
	}

    constructor(props) {
		super(props);
		this.state = {
			users: [],
			oneUserId: 0,
            oneUserName: '',
			oneUserEmail: '',
			oneUserAccountstate: false,
			oneUserRole: [],
			availableRoles: [],
		}
	}

	componentDidMount() {
		this.getUserList();
		this.loadUserRoles();
	}

	getUserList = () => {
		getCurrentUsers()
		.then(result => {
			this.setState({
				users: result
			});
		});
	}

	loadUserRoles = () => {
        getUserRoles()
        .then(response => {
            this.setState({
                availableRoles: response
            })
        })
	}

	removeUser = (e, id) => {
		if (window.confirm(dictionary[this.props.languageFromMain].user.delete.confirm)) {
			deleteUser(id)
			.then(response => {
				if (response.success === true) {
					alert(dictionary[this.props.languageFromMain].user.delete.success);
					this.getUserList();
				}else{
				    alert(`${dictionary[this.props.languageFromMain].user.delete.fail}:\nmessage: ${response.message}`);
				}
			}).catch(err => {
				alert(`${dictionary[this.props.languageFromMain].user.delete.fail}:\nmessage: ${err.message}`);
			})
		}
	}

	handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
	}
	
    
    handleAccountState = (e, enabled) => {
        e.preventDefault();
        this.setState({
            oneUserAccountstate: !enabled
        });
    }

	searchUser = query => {
		query = query.toLowerCase();
		let table, tr, td, i, j, found;
		table = document.getElementById("userList");
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

	toggleEdit = (e, id, name, email, enabled, role) => {
		e.preventDefault();
		$(ReactDOM.findDOMNode(this.refs.editUserModal)).modal();
		this.setState({
			oneUserId: id,
			oneUserName: name,
			oneUserEmail: email,
			oneUserAccountstate: enabled,
			oneUserRole: role
		});
	}

	render() {
		return (
			<div id='container'>
				<div className='top-gap'></div>
				<div id='searchBox'>
					<SearchCorpusBox
						search={this.searchUser}
						placeholder={dictionary[this.props.languageFromMain].common.search}
					/>
				</div>
				<table className='table table-striped'>
					<thead className='thead-blue'>
						<tr>
							<TableHeaderRow headers={dictionary[this.props.languageFromMain].user.headers} />
							<th>
								{dictionary[this.props.languageFromMain].common.actions}
							</th>
						</tr>
					</thead>
					<tbody id='userList'>
						{
							this.state.users.map((item, key) => {
								return (
									<tr key = {key}>
										<td>{item.name}</td>
										<td>{item.username}</td>
										<td>{item.email}</td>
										{/* <td>{dictionary[this.props.languageFromMain].user.manage.enabled[item.enabled]}</td> */}
										<td>{item.roles.map(role => dictionary[this.props.languageFromMain].user.manage.role[role.name])}</td>
										<td>
											<Button
												label={dictionary[this.props.languageFromMain].button.edit}
												onClick={e => this.toggleEdit(e, item.id, item.name, item.email, item.enabled, item.roles)}
											/>
											{" "}
											<Button
												label={dictionary[this.props.languageFromMain].button.delete}
												onClick={e => this.removeUser(e, item.id)}
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
					ref='editUserModal'
					title={
						<span>
							{dictionary[this.props.languageFromMain].user.manage.edit}
						</span>
					}
					languageFromMain={this.props.languageFromMain}
				>
					<EditUser 
						languageFromMain={this.props.languageFromMain}
						getUserList={this.getUserList}
						oneUserId={this.state.oneUserId}
						oneUserName={this.state.oneUserName}
						oneUserEmail={this.state.oneUserEmail}
						oneUserRole={this.state.oneUserRole}
						oneUserAccountstate={this.state.oneUserAccountstate}
						handleChange={this.handleChange}
						handleAccountState={this.handleAccountState}
						handleUserRole={this.handleUserRole}
						availableRoles={this.state.availableRoles}
					/>				
				</Modal>

			</div>
		)
	}

}

export default ManageUsers;