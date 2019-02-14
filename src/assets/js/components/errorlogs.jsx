import 'bootstrap';
import Button from '../utilities/button';
import dictionary from '../../../translations/dictionary';
import PropTypes from 'prop-types';
import React, { Component, PureComponent } from 'react';
import SearchCorpusBox from '../components/searchcorpusbox';
import { TableHeaderRow } from '../constants/admintable';
import { getErrorsLog } from '../utilities/functions';

class ErrorLogs extends PureComponent {
    static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
	}

    constructor(props) {
		super(props);
		this.state = {
			errorLogs: [],
		}
	}

	componentDidMount() {
		this.getErrorLogs();
	}

	getErrorLogs = () => {
		getErrorsLog()
		.then(result => {
			this.setState({
				errorLogs: result
			});
		});
	}

	handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
	}

	errorQuery = query => {
		query = query.toLowerCase();
		let table, tr, td, i, j, found;
		table = document.getElementById("errorLogList");
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
						search={this.errorQuery}
						placeholder={dictionary[this.props.languageFromMain].common.search}
					/>
				</div>
				<table className='table table-striped'>
					<thead className='thead-blue'>
						<tr>
							<TableHeaderRow headers={dictionary[this.props.languageFromMain].errorlogs.headers} />
						</tr>
					</thead>
					<tbody id='userLogList'>
						{this.state.errorLogs.map((item, key) => {
							return (
								<tr key = {key}>
									<td>{item.createdAt}</td>
									<td>{item.errorType}</td>
									<td>{item.errorValue}</td>
								</tr>
								)
							})
						}
					</tbody>
				</table>
				<div className='bottom-gap'></div>
			</div>
		)
	}
}

export default ErrorLogs;