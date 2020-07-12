import Type from './Type'

import getErrorMessage from '../getErrorMessage'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class BooleanType extends Type<boolean> {
  typeName = 'BooleanType';

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    if (typeof input !== 'boolean') {
      yield [path, getErrorMessage('ERR_EXPECT_BOOLEAN'), this]
    }
  }

  accepts(input: any): boolean {
    return typeof input === 'boolean'
  }

  toString(): string {
    return 'boolean'
  }
}
