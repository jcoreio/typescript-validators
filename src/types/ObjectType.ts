import Type from './Type'

import ObjectTypeProperty from './ObjectTypeProperty'

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
import { keyToString } from '../errorReporting/keyToString'

export default class ObjectType<T extends {}> extends Type<T> {
  typeName = 'ObjectType'
  readonly properties: ObjectTypeProperty<keyof T, any>[]
  readonly exact: boolean

  constructor(
    properties: ObjectTypeProperty<keyof T, any>[] = [],
    exact = true
  ) {
    super()
    this.properties = properties
    this.exact = exact
    properties.forEach(prop => (prop.__objectType = this))
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

    yield* collectErrorsWithoutIndexers(this, validation, path, input)
    if (this.exact) {
      yield* collectErrorsExact(this, validation, path, input)
    }
    validation.endCycle(this, input)
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

    let result
    result = acceptsWithoutIndexers(this, input)
    if (result && this.exact) {
      result = acceptsExact(this, input)
    }
    endValidationCycle(this, input)
    return result
  }

  toString(): string {
    const { properties } = this
    if (inToStringCycle(this)) {
      return '$Cycle<Record<string, any>>'
    }
    startToStringCycle(this)
    const body = []
    for (let i = 0; i < properties.length; i++) {
      body.push(properties[i].toString())
    }
    endToStringCycle(this)
    return `{\n${indent(body.join('\n'))}\n}`
  }
}

function acceptsWithoutIndexers(
  type: ObjectType<any>,
  input: Record<string, any>
): boolean {
  const { properties } = type
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    if (!property.accepts(input)) {
      return false
    }
  }
  return true
}

function acceptsExact(
  type: ObjectType<any>,
  input: Record<string, any>
): boolean {
  const { properties } = type
  for (const key in input) {
    // eslint-disable-line guard-for-in
    if (!properties.some(property => property.key === key)) {
      return false
    }
  }
  return true
}

function* collectErrorsWithoutIndexers(
  type: ObjectType<any>,
  validation: Validation<any>,
  path: IdentifierPath,
  input: Record<string, any>
): Generator<ErrorTuple, void, void> {
  const { properties } = type
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    yield* property.errors(validation, path, input)
  }
}

function* collectErrorsExact(
  type: ObjectType<any>,
  validation: Validation<any>,
  path: IdentifierPath,
  input: Record<string, any>
): Generator<ErrorTuple, void, void> {
  const { properties } = type
  for (const key in input) {
    // eslint-disable-line guard-for-in
    if (!properties.some(property => property.key === key)) {
      yield [path, getErrorMessage('ERR_UNKNOWN_KEY', keyToString(key)), type]
    }
  }
}

function indent(input: string): string {
  const lines = input.split('\n')
  const { length } = lines
  for (let i = 0; i < length; i++) {
    lines[i] = `  ${lines[i]}`
  }
  return lines.join('\n')
}
