import Type from './Type'

import getErrorMessage from '../getErrorMessage'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class InstanceOfType<
  T extends { new (...args: any[]): any }
> extends Type<T> {
  typeName = 'InstanceOfType'
  classType: T

  constructor(classType: T) {
    super()
    this.classType = classType
  }

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    if (!(input instanceof this.classType)) {
      yield [
        path,
        getErrorMessage('ERR_EXPECT_INSTANCEOF', this.toString()),
        this,
      ]
    }
  }

  accepts(input: any): boolean {
    return input instanceof this.classType
  }

  toString(): string {
    return this.classType.prototype.constructor.name
  }
}
