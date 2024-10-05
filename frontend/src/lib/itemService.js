const baseUrl = 'http://localhost:3000/items'

export const loadItems = () => {
  return fetch(baseUrl)
    .then(res => res.json())
}

export const createItem = (item) => {
  return fetch(baseUrl,{
    method : 'POST',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(item)
  }).then(res => console.log(res))
}

export const saveItem = (item) => {
  return fetch(`${baseUrl}/${item.id}`,{
    method : 'PUT',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    },
    body : JSON.stringify(item)
  }).then(res => res.json())
}

export const destroyItem = (id) => {
  return fetch(`${baseUrl}/${id}`,{
    method : 'DELETE',
    headers : {
      'Accept' : 'application/json',
      'Content-Type' : 'application/json'
    }
  })
}
