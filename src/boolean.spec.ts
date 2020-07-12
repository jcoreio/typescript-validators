import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'

describe(`t.boolean`, function() {
  it(`accepts booleans`, function() {
    t.boolean().assert(true)
    t.boolean().assert(false)
    expect(t.boolean().accepts(true)).to.be.true
    expect(t.boolean().accepts(false)).to.be.true
  })
  it(`rejects everything else`, function() {
    expect(t.boolean().accepts(2)).to.be.false
    expect(() => t.boolean().assert(2)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be true or false

        Expected: boolean

        Actual Value: 2

        Actual Type: number`
    )
    expect(t.boolean().accepts('foo')).to.be.false
    expect(() => t.boolean().assert('foo')).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be true or false

        Expected: boolean

        Actual Value: "foo"

        Actual Type: string`
    )
    expect(t.boolean().accepts([])).to.be.false
    expect(() => t.boolean().assert([])).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be true or false

        Expected: boolean

        Actual Value: []

        Actual Type: Array`
    )
  })
})

describe(`t.boolean(literal)`, function() {
  it(`accepts literal value`, function() {
    t.boolean(true).assert(true)
    t.boolean(false).assert(false)
    expect(t.boolean(true).accepts(true)).to.be.true
    expect(t.boolean(false).accepts(false)).to.be.true
  })
  it(`rejects everything else`, function() {
    expect(t.boolean(true).accepts(false)).to.be.false
    expect(t.boolean(false).accepts(true)).to.be.false
    expect(t.boolean(false).accepts(2)).to.be.false
    expect(t.boolean(false).accepts('foo')).to.be.false
    expect(t.boolean(false).accepts([])).to.be.false
    expect(() => t.boolean(true).assert(false)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be true

        Expected: true

        Actual Value: false

        Actual Type: boolean`
    )
    expect(() => t.boolean(false).assert(true)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be false

        Expected: false

        Actual Value: true

        Actual Type: boolean`
    )
    expect(() => t.boolean(true).assert(2)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be true

        Expected: true

        Actual Value: 2

        Actual Type: number`
    )
    expect(() => t.boolean(false).assert('foo')).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be false

        Expected: false

        Actual Value: "foo"

        Actual Type: string`
    )
  })
})
