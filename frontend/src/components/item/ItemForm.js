import React from 'react'

export const ItemForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <input 
      type="text"
      name="ItemName"
      onChange={props.handleInputChange}
      value={props.currentItem}
    />
  </form>
)

