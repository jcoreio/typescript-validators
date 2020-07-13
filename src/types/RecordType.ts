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

export default class RecordType<
  K extends string | number | symbol,
  V
> extends Type<Record<K, V>> {
  typeName = 'RecordType'
  readonly key: Type<K>
  readonly value: Type<V>

  constructor(key: Type<K>, value: Type<V>) {
    super()
    this.key = key
    this.value = value
  }

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    if (input === null) {
      yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this]
      return
    }

    if (typeof input !== 'object' || Array.isArray(input)) {
      yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this]
      return
    }

    if (validation.inCycle(this, input)) {
      return
    }
    validation.startCycle(this, input)

    if (input instanceof Object && Array.isArray(input)) {
      yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this]
      return
    }
    yield* collectErrorsWithIndexers(this, validation, path, input)
  }

  accepts(input: any): boolean {
    if (input === null) {
      return false
    }
    if (typeof input !== 'object' || Array.isArray(input)) {
      return false
    }
    if (inValidationCycle(this, input)) {
      return true
    }
    startValidationCycle(this, input)

    const result = acceptsWithIndexers(this, input)

    endValidationCycle(this, input)
    return result
  }

  toString(): string {
    if (inToStringCycle(this)) {
      return '$Cycle<Record<string, any>>'
    }
    startToStringCycle(this)
    const result = `Record<${this.key}, ${this.value}>`
    endToStringCycle(this)
    return result
  }
}

function acceptsWithIndexers(
  type: RecordType<any, any>,
  input: Record<any, any>
): boolean {
  for (const key in input) {
    const value = input[key]
    if (!type.value.accepts(value)) return false
  }
  return true
}

function* collectErrorsWithIndexers(
  type: RecordType<any, any>,
  validation: Validation<any>,
  path: IdentifierPath,
  input: Record<any, any>
): Generator<ErrorTuple, void, void> {
  for (const key in input) {
    yield* type.value.errors(validation, [...path, key], input[key])
  }
}
