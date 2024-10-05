import React from 'react'
import {Item} from './Item.js'

export const ItemList = (props) => {
  return (
    <div className="Todo-List">
      <ul>
        {props.items.map(item => <Item handleToggle={props.handleToggle} key={item.id} {...item} handleRemove={props.handleRemove}/>)}
      </ul>
    </div>
  )
}

