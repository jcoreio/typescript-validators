import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'

describe(`t.tuple`, function() {
  const TheTuple = t.tuple(t.string(), t.number(), t.boolean())
  it(`accepts matching types`, function() {
    for (const value of [
      ['foo', 1, true],
      ['bar', 2, false],
    ]) {
      TheTuple.assert(value)
      expect(TheTuple.accepts(value)).to.be.true
    }
  })
  it(`rejects shorter arrays`, function() {
    for (const value of [['foo'], ['foo', 1]]) {
      expect(() => TheTuple.assert(value)).to.throw(
        t.RuntimeTypeError,
        dedent`
          Value must have length of 3
          
          Expected: [string, number, boolean]
          
          Actual Value: ${JSON.stringify(value, null, 2)}
          
          Actual Type: Array`
      )
      expect(TheTuple.accepts(value)).to.be.false
    }
  })
  it(`rejects longer arrays`, function() {
    for (const value of [['foo', 1, false, null]]) {
      expect(() => TheTuple.assert(value)).to.throw(
        t.RuntimeTypeError,
        dedent`
          Value must have length of 3
          
          Expected: [string, number, boolean]
          
          Actual Value: ${JSON.stringify(value, null, 2)}
          
          Actual Type: Array`
      )
      expect(TheTuple.accepts(value)).to.be.false
    }
  })
  it(`rejects elements of the wrong type`, function() {
    const value = [1, 2, null]
    expect(() => TheTuple.assert(value)).to.throw(
      t.RuntimeTypeError,
      dedent`
        [0] must be a string
        
        Expected: string
        
        Actual Value: 1
        
        Actual Type: number
        
        -------------------------------------------------
        
        [2] must be true or false
        
        Expected: boolean
        
        Actual Value: null
        
        Actual Type: null`
    )
  })
})
