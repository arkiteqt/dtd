import React from 'react'
import {partial} from '../../lib/utils.js'
import placeholderImg from '../../img/uploads/image-alignment-150x1501.jpg';
export const Item = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  const handleRemove = partial(props.handleRemove, props.id)
  return (
    <div className="list-group-item list-group-item-action">
      <div className="d-flex w-100 justify-content-between">
        <input type="checkbox"
          onChange={handleToggle}
          checked={props.isComplete}
        />
         <img src={placeholderImg} class="img-fluid rounded-start" alt="..." />
        <h5 clclassNameass="mb-1">
          {props.title}
        </h5>
        <small>
          3 days ago
        </small>
        <span className="remove-item"><a href="#" onClick={handleRemove}>X</a></span>
      </div>
    </div>
  )
}

