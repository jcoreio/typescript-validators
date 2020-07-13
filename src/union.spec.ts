import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'
import typeOf from './errorReporting/typeOf'

describe(`t.union`, function() {
  const NumberOrString = t.union(t.number(), t.string())

  const ObjectUnion = t.union(
    t.simpleObject({ foo: t.number() }),
    t.simpleObject({ bar: t.string() })
  )
  it(`accepts valid values`, function() {
    for (const value of [1, 2, 'three', 'four']) {
      NumberOrString.assert(value)
      expect(NumberOrString.accepts(value)).to.be.true
    }
    for (const value of [
      { foo: 2 },
      { foo: 3 },
      { bar: 'hello' },
      { bar: 'world' },
    ]) {
      ObjectUnion.assert(value)
      expect(ObjectUnion.accepts(value)).to.be.true
    }
  })
  it(`rejects invalid values`, function() {
    for (const value of [true, false, null, undefined, [], {}]) {
      expect(() => NumberOrString.assert(value)).to.throw(
        t.RuntimeTypeError,
        dedent`
          Value must be one of: number | string
          
          Expected: number | string
          
          Actual Value: ${JSON.stringify(value, null, 2)}
          
          Actual Type: ${typeOf(value)}`
      )
      expect(NumberOrString.accepts(value)).to.be.false
    }
    for (const value of [
      true,
      false,
      null,
      undefined,
      [],
      {},
      { foo: '3' },
      { bar: 2 },
    ]) {
      expect(() => ObjectUnion.assert(value)).to.throw(
        t.RuntimeTypeError,
        dedent`
          Value must be one of: {
            foo: number
          } | {
            bar: string
          }
          
          Expected: {
            foo: number
          } | {
            bar: string
          }
          
          Actual Value: ${JSON.stringify(value, null, 2)}
          
          Actual Type: ${typeOf(value)}`
      )
      expect(ObjectUnion.accepts(value)).to.be.false
    }
  })
})
