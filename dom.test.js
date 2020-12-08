
// dom.test.js
import { generateDiv } from './dom'

test('测试dom操作', () => {
  generateDiv()
  generateDiv()
  generateDiv()
  expect(document.getElementsByClassName('test-div').length).toBe(3)
})
