import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'
import typeOf from './errorReporting/typeOf'

describe(`t.record`, function() {
  const Numbers = t.record(t.string(), t.number())
  it(`accepts matching records`, function() {
    for (const value of [{ a: 1 }, { a: 1, b: 2 }]) {
      Numbers.assert(value)
      expect(Numbers.accepts(value)).to.be.true
    }
  })
  it(`rejects values that don't match`, function() {
    const value = { a: 'one' }
    expect(() => Numbers.assert(value, '', ['value'])).to.throw(
      t.RuntimeTypeError,
      dedent`
        value.a must be a number
        
        Expected: number
        
        Actual Value: "one"
        
        Actual Type: string`
    )
  })
  it(`rejects everything else`, function() {
    for (const value of [true, 'foo', null, undefined, 2, []]) {
      expect(Numbers.accepts(value)).to.be.false
      expect(() => Numbers.assert(value)).to.throw(
        t.RuntimeTypeError,
        dedent`
        Value must be an object

        Expected: Record<string, number>

        Actual Value: ${JSON.stringify(value)}

        Actual Type: ${typeOf(value)}`
      )
    }
  })
})
