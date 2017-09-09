import {partial} from './utils.js'

const add = (a,b) => a + b

test('partial applies the first argument ahead of time', () => {
  const inc = partial(add, 1)
  const result = inc(2) // expect 3
  expect(result).toBe(3)
})

test('partial applies the multiple arguments ahead of time', () => {
  const inc = partial(addThree, 1, 3)
  const result = inc(2) // expect 6
  expect(result).toBe(6)
})
