// dom.js
export const generateDiv = () => {
  const div = document.createElement('div')
  div.className = 'test-div'
  document.body.appendChild(div)
}
