import { getConfig } from './snapshot'
test('getConfig测试', () => {
  expect(getConfig()).toMatchSnapshot()
})

