import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'

describe(`t.array`, function() {
  it(`accepts matching arrays`, function() {
    t.array(t.number()).assert([1, 2, 3])
    expect(t.array(t.number()).accepts([1, 2, 3])).to.be.true
    t.array(t.string()).assert(['foo', 'bar', 'baz'])
    expect(t.array(t.string()).accepts(['foo', 'bar', 'baz'])).to.be.true
  })
  it(`rejects non-arrays`, function() {
    expect(t.array(t.number()).accepts({ foo: 'bar' })).to.be.false
    expect(() => t.array(t.number()).assert({ foo: 'bar' })).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be an Array

        Expected: Array<number>

        Actual Value: {
          "foo": "bar"
        }

        Actual Type: {
          foo: string
        }`
    )
  })
  it(`rejects nonmatching array elements`, function() {
    expect(t.array(t.number()).accepts([1, 'bar'])).to.be.false
    expect(() =>
      t.array(t.number()).assert([1, 'bar'], '', ['array'])
    ).to.throw(
      t.RuntimeTypeError,
      dedent`
        array[1] must be a number

        Expected: number

        Actual Value: "bar"

        Actual Type: string`
    )
    expect(t.array(t.string()).accepts(['foo', 2])).to.be.false
    expect(() =>
      t.array(t.string()).assert(['foo', 2], '', ['array'])
    ).to.throw(
      t.RuntimeTypeError,
      dedent`
        array[1] must be a string

        Expected: string

        Actual Value: 2

        Actual Type: number`
    )
  })
})
