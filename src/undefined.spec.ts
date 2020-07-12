import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'
import typeOf from './errorReporting/typeOf'

describe(`t.undefined`, function() {
  it(`accepts undefined`, function() {
    t.undefined().assert(undefined)
    expect(t.undefined().accepts(undefined)).to.be.true
  })
  it(`rejects everything else`, function() {
    for (const value of [true, 'foo', null, 2, [], {}]) {
      expect(t.undefined().accepts(value)).to.be.false
      expect(() => t.undefined().assert(value)).to.throw(
        t.RuntimeTypeError,
        dedent`
        Value must be undefined

        Expected: undefined

        Actual Value: ${JSON.stringify(value)}

        Actual Type: ${typeOf(value)}`
      )
    }
  })
})
