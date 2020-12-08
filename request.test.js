import {getData1, getData2, get404} from './request'

test('getData1 方法1', (done) => {
  getData1().then(res => {
    expect(res.data).toEqual({
      success: false
    })
    // done()  // 如果不加 done，还没执行到 .then 方法，测试用例已经结束了
  })
})

test('getData1 方法2', () => {
  return getData1().then(res => {
    expect(res.data).toEqual({
      success: true
    })
  })
})

test('getData2 方法2', (done) => {
  getData2((res) => {
    expect(res.data).toEqual({
      success: true
    })
    done()
  })
})

test('getData1 方法3', async () => {
  const res = await getData1()
  expect(res.data).toEqual({
    success: true
  })
})

/*********** 重点关注 ***********/
test('get404', (done) => {
  expect.assertions(1)//加上 expect.assertions(1) 进行断言：下面一定会执行一个 expect
  get404().catch(r => {
    expect(r.toString()).toMatch('404')
    done()
  })
})
