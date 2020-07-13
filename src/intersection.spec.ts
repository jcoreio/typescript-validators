import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'

describe(`t.intersection`, function() {
  const ObjectIntersection = t.intersection(
    t.simpleObject({ foo: t.number() }, { exact: false }),
    t.simpleObject({ bar: t.string() }, { exact: false })
  )
  it(`accepts valid values`, function() {
    for (const value of [
      { foo: 2, bar: 'hello' },
      { foo: -5, bar: 'world' },
    ]) {
      ObjectIntersection.assert(value)
      expect(ObjectIntersection.accepts(value)).to.be.true
    }
  })
  it(`rejects invalid values`, function() {
    expect(() => ObjectIntersection.assert({ foo: 3 })).to.throw(
      t.RuntimeTypeError,
      dedent`
          Value must have property: bar
          
          Expected: {
            bar: string
          }
          
          Actual Value: {
            "foo": 3
          }
          
          Actual Type: {
            foo: number
          }`
    )
    expect(ObjectIntersection.accepts({ foo: 3 })).to.be.false
    expect(() => ObjectIntersection.assert({ bar: 'hello' })).to.throw(
      t.RuntimeTypeError,
      dedent`
          Value must have property: foo
          
          Expected: {
            foo: number
          }
          
          Actual Value: {
            "bar": "hello"
          }
          
          Actual Type: {
            bar: string
          }`
    )
    expect(ObjectIntersection.accepts({ bar: 'hello' })).to.be.false
  })
})
