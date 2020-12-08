import { add, minus } from './math'

test('测试加法 5 + 5', () => {
    expect(add(5, 5)).toBe(10)
})

test('测试减法 10 - 5', () => {
    expect(minus(10, 5)).toBe(5)
})
