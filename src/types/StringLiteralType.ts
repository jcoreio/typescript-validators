import Type from './Type'
import getErrorMessage from '../getErrorMessage'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class StringLiteralType<T extends string> extends Type<T> {
  typeName = 'StringLiteralType'
  readonly value: T

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
      yield [
        path,
        getErrorMessage('ERR_EXPECT_EXACT_VALUE', this.toString()),
        this,
      ]
    }
  }

  accepts(input: any): boolean {
    return input === this.value
  }

  toString(): string {
    return JSON.stringify(this.value)
  }
}
