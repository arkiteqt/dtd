import React, { Component } from 'react';
import "./styles/main.scss";

import Dashboard from './views/Admin/Dashboard'
import Catalog from './views/Public/Catalog'

class Skew extends Component {
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
			case "dashboard":
				view = <Dashboard />
				break;
			case "catalog":
				view = <Catalog />
				break;
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
							<li>
								<button type="button" name="catalog" onClick={this.handleClick}>Catalog</button>
							</li>
						</ul>
					</nav>
					{view}	
				</div>
        );
    }
}

export default Skew;
