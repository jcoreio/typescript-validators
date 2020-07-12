import Type from './Type'

import getErrorMessage from '../getErrorMessage'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class NumberType extends Type<number> {
  typeName = 'NumberType';

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    if (typeof input !== 'number') {
      yield [path, getErrorMessage('ERR_EXPECT_NUMBER'), this]
    }
  }

  accepts(input: any): boolean {
    return typeof input === 'number'
  }

  toString(): string {
    return 'number'
  }
}
