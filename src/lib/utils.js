export const partial = (fn,...args) => fn.bind(null,...args) // takes comma separated list as arg and turns it into an array, then binds them into an array and passes it into the fn
