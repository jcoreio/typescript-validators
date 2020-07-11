import makeError from '../makeError'

import Validation from '../Validation'
import { ErrorTuple, IdentifierPath } from '../Validation'

/**
 * # Type
 *
 * This is the base class for all types.
 */
export default class Type<T> {
  typeName: string = 'Type'

  constructor() {}

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {}

  accepts(input: any): boolean {
    const validation = new Validation(input)
    for (const error of this.errors(validation, [], input)) {
      // eslint-disable-line no-unused-vars
      return false
    }
    return true
  }

  acceptsType(input: Type<any>): boolean {
    if (require('../compareTypes')(this, input) === -1) {
      return false
    } else {
      return true
    }
  }

  compareWith(input: Type<any>): -1 | 0 | 1 {
    return -1
  }

  assert<V extends T>(input: V): V {
    const error = makeError(this, input)
    if (error) {
      if (typeof Error.captureStackTrace === 'function') {
        Error.captureStackTrace(error, this.assert)
      }
      throw error
    }
    return input
  }

  /**
   * Get the inner type.
   */
  unwrap(): Type<T> {
    return this
  }

  toString() {
    return '$Type'
  }

  toJSON(): any {
    return {
      typeName: this.typeName,
    }
  }
}
