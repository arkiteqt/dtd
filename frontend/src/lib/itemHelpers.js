export const addItem = (list,item) => [...list,item]
export const generateId = () => Math.floor(Math.random() * 100000)
export const findById = (id,list) => list.find(item => item.id === id )
export const toggleItem = (item) => ({...item, isComplete: !item.isComplete})
export const updateItem = (list, updated) => {
  const updatedIndex = list.findIndex(item => item.id === updated.id)
  return [
    ...list.slice(0, updatedIndex), // get all items before updated item
    updated, // the updated item
    ...list.slice(updatedIndex+1) // get all items after updated item
  ]
}
export const removeItem = (list,id) => {
  const removedIndex = list.findIndex(item => item.id === id)
  return [
    ...list.slice(0,removedIndex),
    ...list.slice(removedIndex+1)
  ]
}
export const filterItems = (list,route) => {
  switch(route){
    case '/active':
      return list.filter(item => !item.isComplete)
    case '/complete':
      return list.filter(item => item.isComplete)
    default:
      return list
  }

}
