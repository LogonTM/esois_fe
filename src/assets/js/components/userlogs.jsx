import 'bootstrap';
import dictionary from '../../../translations/dictionary';
import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import SearchCorpusBox from '../components/searchcorpusbox';
import { TableHeaderRow } from '../constants/admintable';
import { getUsersLog } from '../utilities/functions';

class UserLogs extends PureComponent {
    static propTypes = {
		languageFromMain: PropTypes.string.isRequired,
	}

    constructor(props) {
		super(props);
		this.state = {
			userLogs: [],
		}
	}

	componentDidMount() {
		this.getUserLogs();
	}

	getUserLogs = () => {
		getUsersLog()
		.then(result => {
			this.setState({
				userLogs: result
			});
		});
	}

	handleChange = event => {
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value})
	}

	userQuery = query => {
		query = query.toLowerCase();
		let table, tr, td, i, j, found;
		table = document.getElementById("userLogList");
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
			<div id='container' data-testid='user-logs'>
				<div className='top-gap'></div>
				<div id='searchBox'>
					<SearchCorpusBox
						search={this.userQuery}
						placeholder={dictionary[this.props.languageFromMain].common.search}
					/>
				</div>
				<table className='table table-striped'>
					<thead className='thead-blue'>
						<tr>
							<TableHeaderRow headers={dictionary[this.props.languageFromMain].userlogs.headers} />
						</tr>
					</thead>
					<tbody id='userLogList'>
						{this.state.userLogs.map((item, key) => {
							return (
								<tr key = {key}>
									<td>{item.createdAt}</td>
									<td>{item.username}</td>
									<td>{dictionary[this.props.languageFromMain].userlogs.consent[item.consent]}</td>
                  <td>{dictionary[this.props.languageFromMain].userlogs.initialregister[item.initialregister]}</td>
                  <td>{dictionary[this.props.languageFromMain].userlogs.logedin[item.logedin]}</td>
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

export default UserLogs;