import React from 'react'
import {Item} from './Item.js'

export const ItemList = (props) => {
  return (
    <div className="Todo-List">
      <ul>
        {props.items.map(item => <Item key={item.id} handleToggle={props.handleToggle} {...item} handleRemove={props.handleRemove}/>)}
      </ul>
    </div>
  )
}

