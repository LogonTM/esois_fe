import 'bootstrap';
import $ from 'jquery';
import AddCenter from '../components/addcenter.jsx'
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';
import EditCenter from '../components/editcenter.jsx'
import Modal from '../components/modal.jsx';
import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';
import ReactDOM from 'react-dom';
import { TableHeaderRow } from '../constants/admintable';
import { getCurrentCenters, removeCenter } from '../utilities/functions';

class ManageCenter extends PureComponent {
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
	}

	componentDidMount() {
		this.getCenterList();
	}

	getCenterList = () => {
		getCurrentCenters()
		.then(result => {
			this.setState({
				centers: result
			});
		});
	}

	deleteCenter = id => {
		if (window.confirm(dictionary[this.props.languageFromMain].center.delete.confirm)) {
			removeCenter(id)
			.then(response => { 
				if(response) {
					alert(dictionary[this.props.languageFromMain].center.delete.success);
					this.getCenterList();
				} 
			}).catch(error => {
				alert(dictionary[this.props.languageFromMain].center.delete.success);
			}).then(this.getCenterList())
		}
	}

	handleChange = event => {
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
					<Button
						label={dictionary[this.props.languageFromMain].center.manage.add}
						onClick={this.toggleAdd}
					/>
				</p>
				<table className='table table-striped'>
					<thead className='thead-blue'>
						<tr>
							<TableHeaderRow headers={dictionary[this.props.languageFromMain].center.headers} />
							<th>
								{dictionary[this.props.languageFromMain].common.actions}
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
											<Button
												label={dictionary[this.props.languageFromMain].button.edit}
												onClick={e => this.toggleEdit(e, item.id, item.centerName, item.link)}
											/>
											&nbsp;
											<Button
												label={dictionary[this.props.languageFromMain].button.delete}
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
					ref='AddCenterModal'
					title={
						<span>
							{dictionary[this.props.languageFromMain].center.manage.add}
						</span>
					}
					languageFromMain={this.props.languageFromMain}
				>
					<AddCenter 
						languageFromMain={this.props.languageFromMain}
						getCenterList={this.getCenterList}
					/>
				</Modal>

				<Modal
					ref='editCenterModal'
					title={
						<span>
							{dictionary[this.props.languageFromMain].center.manage.edit}
						</span>
					}
					languageFromMain={this.props.languageFromMain}
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