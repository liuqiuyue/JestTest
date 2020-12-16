import { add, minus,parseTime } from './math'

test('测试加法 5 + 5', () => {
    expect(add(5, 5)).toBe(10)
})

test('测试减法 10 - 5', () => {
    expect(minus(10, 5)).toBe(5)
})
describe('Utils:parseTime', () => {
    const d = new Date('2018-07-13 17:54:01') // "2018-07-13 17:54:01"
    test('timestamp', () => {
      expect(parseTime(d)).toBe('2018-07-13 17:54:01')
    })
    test('timestamp string', () => {
      expect(parseTime((d + ''))).toBe('2018-07-13 17:54:01')
    })
    test('ten digits timestamp', () => {
      expect(parseTime((d / 1000).toFixed(0))).toBe('2018-07-13 17:54:01')
    })
    test('new Date', () => {
      expect(parseTime(new Date(d))).toBe('2018-07-13 17:54:01')
    })
    test('format', () => {
      expect(parseTime(d, '{y}-{m}-{d} {h}:{i}')).toBe('2018-07-13 17:54')
      expect(parseTime(d, '{y}-{m}-{d}')).toBe('2018-07-13')
      expect(parseTime(d, '{y}/{m}/{d} {h}-{i}')).toBe('2018/07/13 17-54')
    })
    test('get the day of the week', () => {
      expect(parseTime(d, '{a}')).toBe('五') // 星期五
    })
    test('get the day of the week', () => {
      expect(parseTime(+d + 1000 * 60 * 60 * 24 * 2, '{a}')).toBe('日') // 星期日
    })
    test('empty argument', () => {
      expect(parseTime()).toBeNull()
    })

    test('null', () => {
      expect(parseTime(null)).toBeNull()
    })
  })
