import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'
import typeOf from './errorReporting/typeOf'

describe(`t.object`, function() {
  const Person = t.object<{ name: any; age?: any }>()({
    name: t.string(),
    age: t.optionalNullOr(t.number()),
  })
  it(`accepts matching object`, function() {
    for (const value of [
      { name: 'Jimbo' },
      { name: 'Jimbo', age: null },
      { name: 'Jimbo', age: 20 },
    ]) {
      expect(Person.accepts(value)).to.be.true
      Person.assert(value)
    }
  })
  it(`rejects missing properties`, function() {
    expect(Person.accepts({ age: 20 })).to.be.false
    expect(() => Person.assert({ age: 20 })).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must have property: name

        Expected: ${Person.toString()}

        Actual Value: ${JSON.stringify({ age: 20 }, null, 2)}

        Actual Type: ${typeOf({ age: 20 })}`
    )
  })
  it(`rejects extraneous properties`, function() {
    const value = { name: 'Jimbo', powerLevel: 9001 }
    expect(Person.accepts(value)).to.be.false
    expect(() => Person.assert(value)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value should not contain the key: powerLevel

        Expected: ${Person.toString()}

        Actual Value: ${JSON.stringify(value, null, 2)}

        Actual Type: ${typeOf(value)}`
    )
  })
  it(`rejects everything else`, function() {
    for (const value of [true, 'foo', null, undefined, 2, []]) {
      expect(Person.accepts(value)).to.be.false
      expect(() => Person.assert(value)).to.throw(
        t.RuntimeTypeError,
        dedent`
        Value must be an object

        Expected: ${Person.toString()}

        Actual Value: ${JSON.stringify(value)}

        Actual Type: ${typeOf(value)}`
      )
    }
  })
})
