import Type from './Type'

import { ErrorTuple } from '../Validation'

export default class AnyType extends Type<any> {
  typeName = 'AnyType';

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  *errors(): Generator<ErrorTuple, void, void> {}

  accepts(): boolean {
    return true
  }

  toString(): string {
    return 'any'
  }
}
