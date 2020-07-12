import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'

describe(`t.symbol`, function() {
  it(`accepts symbols`, function() {
    t.symbol().assert(Symbol('foo'))
    t.symbol().assert(Symbol())
  })
  it(`rejects everything else`, function() {
    expect(() => t.symbol().assert(true)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be a symbol

        Expected: symbol

        Actual Value: true

        Actual Type: boolean`
    )
    expect(() => t.symbol().assert(2)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be a symbol

        Expected: symbol

        Actual Value: 2

        Actual Type: number`
    )
  })
})

describe(`t.symbol(literal)`, function() {
  const foo = Symbol('foo')
  const bar = Symbol()
  it(`accepts literal value`, function() {
    t.symbol(foo).assert(foo)
    t.symbol(bar).assert(bar)
  })
  it(`rejects everything else`, function() {
    expect(() => t.symbol(foo).assert(bar)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be exactly typeof Symbol(foo)

        Expected: typeof Symbol(foo)

        Actual Value: Symbol()

        Actual Type: symbol`
    )
    expect(() => t.symbol(foo).assert(3)).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be exactly typeof Symbol(foo)

        Expected: typeof Symbol(foo)
        
        Actual Value: 3
        
        Actual Type: number`
    )
  })
})
