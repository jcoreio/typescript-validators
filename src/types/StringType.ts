import Type from './Type'
import getErrorMessage from '../getErrorMessage'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class StringType extends Type<string> {
  typeName = 'StringType';

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    if (typeof input !== 'string') {
      yield [path, getErrorMessage('ERR_EXPECT_STRING'), this]
    }
  }

  accepts(input: any): boolean {
    return typeof input === 'string'
  }

  toString(): string {
    return 'string'
  }
}
