const { excerpt } = require('../lib/excerpt')

describe('excerpt', () => {
  it('should noop if string is equal or shorter than maxlength', async () => {
    let s = "hello"
    let length = 5
    expect(excerpt(s, { length })).toEqual(s)
  })
  it ('should return null if sample if falsy', async () => {
    let s = ''
    let length = 5
    expect(excerpt(s, { length })).toEqual(null)
  })
  it ('should excerpt a string over length', async () => {
    let s = 'hello!'
    let length = 5
    expect(excerpt(s, { length })).toEqual('hello')
  })
  it ('should excerpt a string accounting for custom suffix', async () => {
    let s = 'hello!'
    let length = 5
    let suffix = "..."
    expect(excerpt(s, { length, suffix })).toEqual('he...')
  })
})