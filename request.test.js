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
// 最后一个测试用例，假设我们现在有一个返回的是 404 的接口，我们需要对这个接口测试，期望他返回 404。 我们用 catch 捕获，在 catch 中判断。但是，假如这个接口返回的不是 404，而是正常返回 200，这个 catch 则不会执行，expect 也不会执行，测试依然是通过的。这不符合我们的预期！所以，我们需要加上 expect.assertions(1) 进行断言：下面一定会执行一个 expect