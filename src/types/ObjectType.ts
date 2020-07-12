import Type from './Type'

import ObjectTypeProperty from './ObjectTypeProperty'
import ObjectTypeIndexer from './ObjectTypeIndexer'

export type Property<K extends string | number | symbol, V> =
  | ObjectTypeProperty<K, V>
  | ObjectTypeIndexer<K, V>

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
import { keyToString } from '../errorReporting/typeOf'

export default class ObjectType<T extends {}> extends Type<T> {
  typeName = 'ObjectType'
  readonly properties: ObjectTypeProperty<keyof T, any>[]
  readonly indexers: ObjectTypeIndexer<any, any>[]
  readonly exact: boolean

  constructor(
    properties: ObjectTypeProperty<keyof T, any>[] = [],
    indexers: ObjectTypeIndexer<any, any>[] = [],
    exact = true
  ) {
    super()
    this.properties = properties
    this.indexers = indexers
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

    if (this.indexers.length > 0) {
      if (input instanceof Object && Array.isArray(input)) {
        yield [path, getErrorMessage('ERR_EXPECT_OBJECT'), this]
        return
      }
      yield* collectErrorsWithIndexers(this, validation, path, input)
    } else {
      yield* collectErrorsWithoutIndexers(this, validation, path, input)
    }
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
    if (this.indexers.length > 0) {
      result = acceptsWithIndexers(this, input)
    } else {
      result = acceptsWithoutIndexers(this, input)
    }
    if (result && this.exact) {
      result = acceptsExact(this, input)
    }
    endValidationCycle(this, input)
    return result
  }

  toString(): string {
    const { properties, indexers } = this
    if (inToStringCycle(this)) {
      return '$Cycle<Record<string, any>>'
    }
    startToStringCycle(this)
    const body = []
    for (let i = 0; i < properties.length; i++) {
      body.push(properties[i].toString())
    }
    for (let i = 0; i < indexers.length; i++) {
      body.push(indexers[i].toString())
    }
    endToStringCycle(this)
    return `{\n${indent(body.join('\n'))}\n}`
  }
}

function acceptsWithIndexers(
  type: ObjectType<any>,
  input: Record<string, any>
): boolean {
  const { properties, indexers } = type
  const seen = []
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    if (!property.accepts(input)) {
      return false
    }
    seen.push(property.key)
  }
  loop: for (const key in input) {
    if (seen.indexOf(key) !== -1) {
      continue
    }
    const value = (input as any)[key]
    for (let i = 0; i < indexers.length; i++) {
      const indexer = indexers[i]
      if (indexer.acceptsKey(key) && indexer.acceptsValue(value)) {
        continue loop
      }
    }

    // if we got this far the key / value did not accepts any indexers.
    return false
  }
  return true
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

function* collectErrorsWithIndexers(
  type: ObjectType<any>,
  validation: Validation<any>,
  path: IdentifierPath,
  input: Record<string, any>
): Generator<ErrorTuple, void, void> {
  const { properties, indexers } = type
  const seen = []
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    yield* property.errors(validation, path, input)
    seen.push(property.key)
  }
  loop: for (const key in input) {
    if (seen.indexOf(key) !== -1) {
      continue
    }
    const value = (input as any)[key]
    for (let i = 0; i < indexers.length; i++) {
      const indexer = indexers[i]
      if (indexer.acceptsKey(key) && indexer.acceptsValue(value)) {
        continue loop
      }
    }

    // if we got this far the key / value was not accepted by any indexers.
    yield [path.concat(key), getErrorMessage('ERR_NO_INDEXER'), type]
  }
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
