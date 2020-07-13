import { keyToString } from './keyToString'
import { expect } from 'chai'

describe(`keyToString`, function() {
  it(`formats symbol correctly`, function() {
    expect(keyToString(Symbol('foo'))).to.equal('[Symbol(foo)]')
  })
  it(`formats number correctly`, function() {
    expect(keyToString(2)).to.equal('2')
  })
  it(`formats non-identifiers correctly`, function() {
    expect(keyToString('2pac')).to.equal('"2pac"')
    expect(keyToString('-foobus-')).to.equal('"-foobus-"')
  })
})
