const a=require('./index.js')
const {a1,a2}=a

test('first test-300', () => {
	expect(a1(300)).toBe('1a')
});

test('2 test-200', () => {
	expect(a2(1000)).toBe('2a')
});