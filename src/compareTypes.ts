import Type from './types/Type'
import AnyType from './types/AnyType'

/**
 * Given two types, A and B, compare them and return either -1, 0, or 1:
 *
 *   -1 if A cannot accept type B.
 *
 *    0 if the types are effectively identical.
 *
 *    1 if A accepts every possible B.
 */
export default function compareTypes(a: Type<any>, b: Type<any>): -1 | 0 | 1 {
  let result: -1 | 0 | 1

  if (a === b) {
    return 0
  }
  if (a instanceof AnyType) {
    return 1
  } else {
    result = a.compareWith(b)
  }

  if (b instanceof AnyType) {
    // Note: This check cannot be moved higher in the scope,
    // as this would prevent types from being propagated upwards.
    return 1
  } else {
    return result
  }
}

// this is done to avoid circular import problems
Type.__compareTypes = compareTypes
