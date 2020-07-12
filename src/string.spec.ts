import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'

describe(`t.string`, function() {
  it(`accepts strings`, function() {
    t.string().assert('foo')
    t.string().assert('')
  })
  it(`rejects everything else`, function() {
    expect(() => t.string().assert(true)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be a string

        Expected: string

        Actual Value: true

        Actual Type: boolean`
    )
    expect(() => t.string().assert(2)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be a string

        Expected: string

        Actual Value: 2

        Actual Type: number`
    )
  })
})

describe(`t.string(literal)`, function() {
  it(`accepts literal value`, function() {
    t.string('foo').assert('foo')
    t.string('').assert('')
  })
  it(`rejects everything else`, function() {
    expect(() => t.string('foo').assert('bar')).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be exactly "foo"

        Expected: "foo"

        Actual Value: "bar"

        Actual Type: string`
    )
    expect(() => t.string('foo').assert(3)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be exactly "foo"

        Expected: "foo"

        Actual Value: 3

        Actual Type: number`
    )
  })
})
