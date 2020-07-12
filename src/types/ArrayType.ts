import Type from './Type'

import getErrorMessage from '../getErrorMessage'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

import {
  inValidationCycle,
  startValidationCycle,
  endValidationCycle,
  inToStringCycle,
  startToStringCycle,
  endToStringCycle,
} from '../cyclic'

export default class ArrayType<T> extends Type<Array<T>> {
  typeName = 'ArrayType'
  readonly elementType: Type<T>

  constructor(elementType: Type<T>) {
    super()
    this.elementType = elementType
  }

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    if (!Array.isArray(input)) {
      yield [path, getErrorMessage('ERR_EXPECT_ARRAY'), this]
      return
    }
    if (validation.inCycle(this, input)) {
      return
    }
    validation.startCycle(this, input)
    const { elementType } = this
    const { length } = input

    for (let i = 0; i < length; i++) {
      yield* elementType.errors(validation, path.concat(i), input[i])
    }
    validation.endCycle(this, input)
  }

  accepts(input: any): boolean {
    if (!Array.isArray(input)) {
      return false
    }
    if (inValidationCycle(this, input)) {
      return true
    }
    startValidationCycle(this, input)
    const { elementType } = this
    const { length } = input
    for (let i = 0; i < length; i++) {
      if (!elementType.accepts(input[i])) {
        endValidationCycle(this, input)
        return false
      }
    }
    endValidationCycle(this, input)
    return true
  }

  toString(): string {
    const { elementType } = this
    if (inToStringCycle(this)) {
      if (typeof elementType.typeName === 'string') {
        return `Array<$Cycle<${elementType.typeName}>>`
      } else {
        return `Array<$Cycle<Object>>`
      }
    }
    startToStringCycle(this)
    const output = `Array<${elementType.toString()}>`
    endToStringCycle(this)
    return output
  }
}
