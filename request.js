import axios from 'axios'

// export function getData1() {
//   return axios.get('http://rap2api.taobao.org/app/mock/270835/success')
// }

export const getData1 = fn => {
  axios.get('http://rap2api.taobao.org/app/mock/270835/success').then(res => {
  fn(res)
  console.log(res)
  })
  }
export function getData2(fn) {
  axios.get('http://rap2api.taobao.org/app/mock/270835/success').then(res => {
    fn(res)
  })
}

export function get404() {
  return axios.get('http://rap2api.taobao.org/app/mock/270835/404success')
}
