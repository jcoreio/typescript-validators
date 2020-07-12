import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'
import typeOf from './errorReporting/typeOf'

describe(`constraints`, function() {
  const PositiveNumberType = t
    .alias('PositiveNumber', t.number())
    .addConstraint((value: number) => (value > 0 ? undefined : 'must be > 0'))

  it(`accepts valid values`, function() {
    for (const value of [1, 5]) {
      PositiveNumberType.assert(value)
      expect(PositiveNumberType.accepts(value)).to.be.true
    }
  })
  it(`rejects values that fail constraint`, function() {
    for (const value of [0, -1]) {
      expect(PositiveNumberType.accepts(value)).to.be.false
      expect(() => PositiveNumberType.assert(value)).to.throw(
        t.RuntimeTypeError,
        dedent`
          Value must be > 0
          
          Expected: PositiveNumber
          
          Actual Value: ${value}
          
          Actual Type: number`
      )
    }
  })
  it(`rejects values of the wrong type`, function() {
    for (const value of ['two', true, [], {}]) {
      expect(PositiveNumberType.accepts(value)).to.be.false
      expect(() => PositiveNumberType.assert(value)).to.throw(
        t.RuntimeTypeError,
        dedent`
          Value must be a number
          
          Expected: number

          Actual Value: ${JSON.stringify(value)}
          
          Actual Type: ${typeOf(value)}`
      )
    }
  })
})
