import * as t from './'
import { expect } from 'chai'
import dedent from 'dedent-js'

class Foo {}

describe(`t.instanceOf`, function() {
  it(`accepts instances of class type`, function() {
    t.instanceOf(Date).assert(new Date())
    t.instanceOf(Foo).assert(new Foo())
    expect(t.instanceOf(Date).accepts(new Date())).to.be.true
    expect(t.instanceOf(Foo).accepts(new Foo())).to.be.true
  })
  it(`rejects not instances of class type`, function() {
    expect(() => t.instanceOf(Date).assert({})).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be an instance of Date
        
        Expected: Date
        
        Actual Value: {}
        
        Actual Type: {

        }`
    )
    expect(t.instanceOf(Date).accepts(new Foo())).to.be.false
    expect(() => t.instanceOf(Date).assert(new Foo())).to.throw(
      t.RuntimeTypeError,
      dedent`
        Value must be an instance of Date
        
        Expected: Date
        
        Actual: Foo`
    )
    expect(t.instanceOf(Date).accepts(new Foo())).to.be.false
  })
})
