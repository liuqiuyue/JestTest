// import { run } from './mock'

// test('测试1 jest.fn()', () => {
//   const fn = jest.fn(() => {
//       return 'this is mock fn 1'
//   })
// })
// test('测试2 jest.fn()', () => {
//   const func = jest.fn()
//   func.mockImplementation(() => {
//       return 'this is mock fn 1'
//   })
//   func.mockImplementationOnce(() => {
//       return 'this is mock fn 2'
//   })
//   const a = run(func)
//   const b = run(func)
//   const c = run(func)
//   console.log('a',a)
//   console.log('b',b)
//   console.log('c',c)
// })

// test('测试3 jest.fn()', () => {
//   const func = jest.fn()
//   func.mockImplementation(() => {
//       return 'this is mock fn 1'
//   })
//   func.mockImplementationOnce(() => {
//       return 'this is mock fn 2'
//   })
//   func.mockReturnValue('this is mock fn 3')
//   func.mockReturnValueOnce('this is mock fn 4')
//       .mockReturnValueOnce('this is mock fn 5')
//       .mockReturnValueOnce('this is mock fn 6')
//   const a = run(func)
//   const b = run(func)
//   const c = run(func)
//   const d = run(func)
//   console.log(a)
//   console.log(b)
//   console.log(c)
//   console.log(d)
// })

import axios from 'axios'
import { request } from './mock'

jest.mock('axios')

test('测试request', async () => {
    axios.get.mockResolvedValueOnce({ data: 'jordan', position: 'SG' })//只会改变一次返回的数据
    axios.get.mockResolvedValue({ data: 'kobe', position: 'SG' })
    await request().then((res) => {
        expect(res.data).toBe('jordan')
    })
    await request().then((res) => {
        expect(res.data).toBe('kobe')
    })
})
