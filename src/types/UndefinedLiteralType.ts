import Type from './Type'

import getErrorMessage from '../getErrorMessage'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class UndefinedLiteralType extends Type<undefined> {
  typeName = 'UndefinedLiteralType';

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    if (input !== undefined) {
      yield [path, getErrorMessage('ERR_EXPECT_UNDEFINED'), this]
    }
  }

  accepts(input: any): boolean {
    return input === undefined
  }

  toString(): string {
    return 'undefined'
  }
}
