import React from 'react'

export const ItemForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <input type="text"
      onChange={props.handleInputChange}
      value={props.currentItem}
    />
  </form>
)

