import 'bootstrap';
import $ from 'jquery';
import AddCenter from '../components/addcenter.jsx'
import { back_end_host } from '../constants/constants';
import EditCenter from '../components/editcenter.jsx'
import Modal from '../components/modal.jsx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {FormattedMessage } from 'react-intl';

class ManageCenter extends Component {
	static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
	}

    constructor(props) {
		super(props);
		this.state = {
			centers: [],
			oneCenterId: '',
			oneCenterName: '',
			oneCenterLink: ''
		};
		this.headers = [
			{ key: 'id', label: 'Korpuse ID'},
			{ key: 'centerName', label: 'Korpuse nimi' },
			{ key: 'link', label: 'URL' }
		];
	}

	componentDidMount() {
		this.getCenterList();
	}

	getCenterList = () => {
		fetch(back_end_host + 'db/center/list')
		.then(response => response.json())
		.then(result => {
			this.setState({
				centers: result
			});
		});
	}

	deleteCenter = id => {
		if (window.confirm("Kas oled kindel, et soovid kustutada?")) {
			fetch(back_end_host + 'db/center/delete/' + id, {
				method: 'DELETE',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json'
				}
			})
			.then(response => { 
				if (response.status === 200) {
					alert("Korpus on edukalt kustutatud");
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
	    $(ReactDOM.findDOMNode(this.refs.AddCenterModal)).modal();
	}

	toggleEdit = (e, id, name, link) => {
		e.preventDefault();
		$(ReactDOM.findDOMNode(this.refs.editCenterModal)).modal();
		this.setState({
			oneCenterId: id,
			oneCenterName: name,
			oneCenterLink: link
		});
	}

	render() {
		return (
			<div id='container'>
				<div className='top-gap'></div>
				<p className='align-right'>
					<button
						type='button'
						className="btn btn-outline-secondary"
						onClick={this.toggleAdd}
					>
						<FormattedMessage
							id='managecenter.addNewCorpus'
							description='add new corpus translation'
							defaultMessage='Add new corpus'
						/>
					</button>
				</p>
				<table className='table table-striped'>
					<thead className='thead-blue'>
						<tr>
							{
								this.headers.map(function(h) {
									return (
										<th key = {h.key}>{h.label}</th>
									)
								})
							}
							<th>
								<FormattedMessage
									id='managecenter.actions'
									description='actions translation'
									defaultMessage='Actions'
								/>
							</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.centers.map((item, key) => {
								return (
									<tr key = {key}>
										<td>{item.id}</td>
										<td>{item.centerName}</td>
										<td>{item.link}</td>
										<td>
											<button
												type='button'
												className="btn btn-outline-secondary"
												onClick={e => this.toggleEdit(e, item.id, item.centerName, item.link)}
											>
												<FormattedMessage
													id='edit'
													description='edit translation'
													defaultMessage='Edit'
												/>
											</button>
											&nbsp;
											<button
												type='button'
												className="btn btn-outline-secondary"
												onClick={this.deleteCenter.bind(this, item.id)}
											>
												<FormattedMessage
													id='delete'
													description='delete translation'
													defaultMessage='Delete'
												/>
											</button>
										</td>
									</tr>
								)
							})
						}
					</tbody>
				</table>
				<div className='bottom-gap'></div>

				<Modal
					ref='AddCenterModal'
					title={<span>
					<FormattedMessage
						id='managecenter.addNewCorpus'
						description='add new corpus translation'
						defaultMessage='Add new corpus'
					/>
					</span>}
				>
					<AddCenter 
						languageFromMain={this.props.languageFromMain}
						getCenterList={this.getCenterList}
					/>
				</Modal>

				<Modal
					ref='editCenterModal'
					title={<span>
					<FormattedMessage
						id='managecenter.editCenterData'
						description='edit corpus data translation'
						defaultMessage='Edit corpus data'
					/>
					</span>}
				>
					<EditCenter 
						languageFromMain={this.props.languageFromMain}
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