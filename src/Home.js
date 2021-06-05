import React, { Component } from 'react';
//import { Input, Button, IconButton } from '@material-ui/core';

import "./Home.css"

class Home extends Component {
  	constructor (props) {
		super(props)
		this.state = {
			url: ''
		}
	}

	handleChange = (e) => this.setState({ url: e.target.value })

	join = () => {
		if (this.state.url !== "") {
			var url = this.state.url.split("/")
			window.location.href = `/${url[url.length-1]}`
		} else {
			var url = Math.random().toString(36).substring(2, 7)
			window.location.href = `/${url}`
		}
	}

	render() {
		return (
			<div className="videoHomeScr">
				<div>
					<p>Simply click on <b>"GO"</b> button to start video chatting</p>
					<input placeholder="URL" onChange={e => this.handleChange(e)} />
					<button onClick={this.join}>Go</button>
				</div>
			</div>
		)
	}
}

export default Home;