import React, { Component } from 'react';
import "./styles/main.scss";

import Dashboard from './views/Dashboard'

class Dtd extends Component {
  state = {
    view : ''
  }

	handleClick = (evt) => {
		console.log(evt.target.name)
		this.setState({
			view : evt.target.name
		})
	}

  render() {
		const route = this.state.view;
		let view = "";
		switch(route){
			default:
				view = <Dashboard />
				break;
		}
        return (

				<div>
					<nav>
						<ul>
							<li>
								<button type="button" name="dashboard" onClick={this.handleClick}>Dashboard</button>
              				</li>
						</ul>
					</nav>
					{view}	
				</div>
        );
    }
}

export default Dtd;
