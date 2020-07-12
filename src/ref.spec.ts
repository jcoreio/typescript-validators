import * as t from './'
import dedent from 'dedent-js'
import { expect } from 'chai'

describe(`t.ref`, function() {
  const NodeType: t.TypeAlias<{
    value: any
    left?: Node
    right?: Node
  }> = t.alias(
    'Node',
    t.object<{
      value: any
      left?: any
      right?: any
    }>()({
      value: t.any(),
      left: t.optional(t.ref(() => NodeType)),
      right: t.optional(t.ref(() => NodeType)),
    })
  )

  type Node = t.ExtractType<typeof NodeType>

  it(`accepts recursive types`, function() {
    NodeType.assert({
      value: 'foo',
      left: {
        value: 2,
        right: {
          value: 3,
        },
      },
      right: {
        value: 6,
      },
    })
  })
  it(`throws correct errors within recursive types`, function() {
    expect(() =>
      NodeType.assert(
        {
          value: 'foo',
          left: {
            value: 2,
            right: {
              value: 3,
              bar: 3,
            },
          },
          right: {
            value: 6,
          },
        },
        '',
        ['node']
      )
    ).to.throw(
      t.RuntimeTypeError,
      dedent`
        node.left.right should not contain the key: bar

        Expected: {
          value: any;
          left?: Node;
          right?: Node;
        }
        
        Actual Value: {
          "value": 3,
          "bar": 3
        }
        
        Actual Type: {
          value: number,
          bar: number
        }`
    )
  })
})
