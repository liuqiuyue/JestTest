export const run = fn => {
  return fn('this is run!')
}

import axios from 'axios'

export const request = fn => {
    return axios.get('https://jsonplaceholder.typicode.com/todos/1')
}
