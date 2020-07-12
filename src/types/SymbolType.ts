import Type from './Type'
import SymbolLiteralType from './SymbolLiteralType'
import getErrorMessage from '../getErrorMessage'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class SymbolType extends Type<symbol> {
  typeName = 'SymbolType';

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    // @flowIssue 252
    if (typeof input !== 'symbol') {
      yield [path, getErrorMessage('ERR_EXPECT_SYMBOL'), this]
    }
  }

  accepts(input: any): boolean {
    return typeof input === 'symbol'
  }

  compareWith(input: Type<any>): -1 | 0 | 1 {
    if (input instanceof SymbolLiteralType) {
      return 1
    } else if (input instanceof SymbolType) {
      return 0
    } else {
      return -1
    }
  }

  toString(): string {
    return 'Symbol'
  }

  toJSON(): Record<string, any> {
    return {
      typeName: this.typeName,
    }
  }
}
