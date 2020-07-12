import Type from './Type'

import { ErrorTuple } from '../Validation'

export default class AnyType extends Type<any> {
  typeName = 'AnyType';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  *errors(): Generator<ErrorTuple, void, void> {}

  accepts(): boolean {
    return true
  }

  compareWith(): -1 | 0 | 1 {
    return 1
  }

  toString(): string {
    return 'any'
  }

  toJSON(): Record<string, any> {
    return {
      typeName: this.typeName,
    }
  }
}
