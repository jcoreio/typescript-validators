import * as t from './'
import { expect } from 'chai'

describe(`t.any`, function() {
  it(`accepts anything`, function() {
    for (const value of [
      null,
      undefined,
      true,
      2,
      'foo',
      Symbol('foo'),
      { foo: 'bar' },
      [],
    ]) {
      t.any().assert(value)
      expect(t.any().accepts(value)).to.be.true
      expect([
        ...t.any().errors(new t.Validation(value), [], value),
      ]).to.deep.equal([])
    }
  })
})
