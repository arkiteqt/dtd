import React, { Component } from 'react';

import {ItemForm, ItemList} from '../../../components/item'
import {addItem,generateId,findById,toggleItem,updateItem,removeItem,filterItems} from '../../../lib/itemHelpers'
import {pipe, partial} from '../../../lib/utils'
import {loadItems,createItem,saveItem,destroyItem} from '../../../lib/itemService'

class Inventory extends Component {
  state = {
    items: [],
    currentItem : '',
  }

  componentDidMount(){
    loadItems()
      .then(items => {
        this.setState({items})
      })
  }

  handleRemove = (id,evt) => {
    evt.preventDefault();
    const updatedItems = removeItem(this.state.items, id)
    this.setState({ items : updatedItems})
    destroyItem(id)
      .then(() => this.showTempMsg('item removed'))
  }

  handleToggle = (id) => {
    const getToggledItem = pipe(findById, toggleItem)
    const updated = getToggledItem(id, this.state.items)
    console.log(updated);
    const getUpdatedItems = partial(updateItem, this.state.items)
    const updatedItems = getUpdatedItems(updated)
    this.setState({ items : updatedItems})
    saveItem(updated)
      .then(() => this.showTempMsg('item updated'))
  }

  handleInputChange = (evt) => {
    this.setState({
      currentItem: evt.target.value
    })
  }

  showTempMsg = (msg) => {
    this.setState({ message : msg})
    setTimeout(() => this.setState({message : ''}), 2500)
  }

  handleSubmit = (evt) => {
    evt.preventDefault()
    const newItem = {title : this.state.currentItem}
    const updatedItems = addItem(this.state.items, newItem)
    this.setState({ items : updatedItems})
    createItem(newItem)
      .then(() => this.showTempMsg('item added'))
  }

  handleEmptySubmit = (evt) => {
    evt.preventDefault();
    this.setState({
      errorMessage : "Please supply an item name"
    })
  }

  render() {
    const submitHandler = this.state.currentItem ? this.handleSubmit : this.handleEmptySubmit
    const displayItems = filterItems(this.state.items, this.context.route)
    
    return (
            <div className="Skew-App">
        
            <div className="Admin-Header">
              <h2>Item List</h2>
            </div>
            <div className="Todo-App">
              {this.state.errorMessage && <span className="error">{this.state.errorMessage}</span>}
              {this.state.message && <span className="success">{this.state.message}</span>}
              <ItemForm
                handleInputChange={this.handleInputChange}
                currentItem={this.state.currentItem}
                handleSubmit={submitHandler}
              />
              <ItemList
                handleToggle={this.handleToggle}
                items={displayItems}
                handleRemove={this.handleRemove}
              />
              </div>
            </div>
        );
    }
}

export default Inventory;
