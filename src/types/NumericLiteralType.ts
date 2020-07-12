import Type from './Type'

import getErrorMessage from '../getErrorMessage'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class NumericLiteralType<T extends number> extends Type<T> {
  typeName = 'NumericLiteralType'
  value: T

  constructor(value: T) {
    super()
    this.value = value
  }

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    const { value } = this
    if (input !== value) {
      yield [path, getErrorMessage('ERR_EXPECT_EXACT_VALUE', value), this]
    }
  }

  accepts(input: any): boolean {
    return input === this.value
  }

  compareWith(input: Type<any>): -1 | 0 | 1 {
    if (input instanceof NumericLiteralType && input.value === this.value) {
      return 0
    } else {
      return -1
    }
  }

  toString(): string {
    return `${this.value}`
  }

  toJSON(): Record<string, any> {
    return {
      typeName: this.typeName,
      value: this.value,
    }
  }
}
