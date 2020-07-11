/* @flow */

import Type from './types/Type'
import UnionType from './types/UnionType'
import compareTypes from './compareTypes'
import AnyType from './types/AnyType'

export default function makeUnion<T>(types: Type<T>[]): Type<T> {
  const length = types.length
  const merged = []
  for (let i = 0; i < length; i++) {
    const type = types[i]
    if (type instanceof AnyType) {
      return type
    }
    if (type instanceof UnionType) {
      mergeUnionTypes(merged, type.types)
    } else {
      merged.push(type)
    }
  }
  return new UnionType(merged)
}

function mergeUnionTypes(aTypes: Type<any>[], bTypes: Type<any>[]): void {
  loop: for (let i = 0; i < bTypes.length; i++) {
    const bType = bTypes[i]
    for (let j = 0; j < aTypes.length; j++) {
      const aType = aTypes[j]
      if (compareTypes(aType, bType) !== -1) {
        continue loop
      }
    }
    aTypes.push(bType)
  }
}
