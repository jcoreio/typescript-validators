import Type from './Type'
import compareTypes from '../compareTypes'

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

export default class ObjectType<T extends {}> extends Type<T> {
  typeName: string = 'ObjectType'
  properties: ObjectTypeProperty<keyof T, any>[]
  indexers: ObjectTypeIndexer<any, any>[]
  exact: boolean

  constructor(
    properties: ObjectTypeProperty<keyof T, any>[] = [],
    indexers: ObjectTypeIndexer<any, any>[] = [],
    exact: boolean = true
  ) {
    super()
    this.properties = properties
    this.indexers = indexers
    this.exact = exact
  }

  /**
   * Get a property with the given name, or undefined if it does not exist.
   */
  getProperty(
    key: string | number | symbol
  ): Property<keyof T, any> | null | undefined {
    const { properties } = this
    const { length } = properties
    for (let i = 0; i < length; i++) {
      const property = properties[i]
      if (property.key === key) {
        return property
      }
    }
  }

  setProperty(
    key: string | number | symbol,
    value: Type<any>,
    optional: boolean = false
  ) {
    const { properties } = this
    const { length } = properties
    const newProp = new ObjectTypeProperty<any, any>(key, value, optional)

    for (let i = 0; i < length; i++) {
      const property = properties[i]
      if (property.key === key) {
        properties[i] = newProp
        return
      }
    }
    properties.push(newProp)
  }

  /**
   * Determine whether a property with the given name exists.
   */
  hasProperty(key: string): boolean {
    const { properties } = this
    const { length } = properties
    for (let i = 0; i < length; i++) {
      const property = properties[i]
      if (property.key === key) {
        return true
      }
    }
    return false
  }

  /**
   * Get an indexer with which matches the given key type.
   */
  getIndexer<K extends string | number | symbol>(
    key: K
  ): ObjectTypeIndexer<K, any> | null | undefined {
    const { indexers } = this
    const { length } = indexers
    for (let i = 0; i < length; i++) {
      const indexer = indexers[i]
      if (indexer.acceptsKey(key)) {
        return indexer
      }
    }
  }

  /**
   * Determine whether an indexer exists which matches the given key type.
   */
  hasIndexer(key: string | number | symbol): boolean {
    const { indexers } = this
    const { length } = indexers
    for (let i = 0; i < length; i++) {
      const indexer = indexers[i]
      if (indexer.acceptsKey(key)) {
        return true
      }
    }
    return false
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

    if (typeof input !== 'object') {
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
    if (typeof input !== 'object') {
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

  compareWith(input: Type<any>): -1 | 0 | 1 {
    if (!(input instanceof ObjectType)) {
      return -1
    }
    let isGreater = false

    let result
    if (this.indexers.length > 0) {
      result = compareTypeWithIndexers(this, input as any)
    } else {
      result = compareTypeWithoutIndexers(this, input as any)
    }

    if (result === -1) {
      return -1
    } else if (isGreater) {
      return 1
    } else {
      return result as any
    }
  }

  toString(): string {
    const { properties, indexers } = this
    if (inToStringCycle(this)) {
      return '$Cycle<Object>'
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

  toJSON() {
    return {
      typeName: this.typeName,
      properties: this.properties,
      indexers: this.indexers,
      exact: this.exact,
    }
  }
}

function acceptsWithIndexers(type: ObjectType<any>, input: Object): boolean {
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

function compareTypeWithIndexers(
  type: ObjectType<any>,
  input: ObjectType<any>
): -1 | 0 | 1 {
  const { indexers, properties } = type
  const inputIndexers = input.indexers
  const inputProperties = input.properties
  let isGreater = false
  loop: for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    for (let j = 0; j < inputProperties.length; j++) {
      const inputProperty = inputProperties[j]
      if (inputProperty.key === property.key) {
        const result = compareTypes(property, inputProperty)
        if (result === -1) {
          return -1
        } else if (result === 1) {
          isGreater = true
        }
        continue loop
      }
    }
  }
  loop: for (let i = 0; i < indexers.length; i++) {
    const indexer = indexers[i]
    for (let j = 0; j < inputIndexers.length; j++) {
      const inputIndexer = inputIndexers[j]
      const result = compareTypes(indexer, inputIndexer)
      if (result === 1) {
        isGreater = true
        continue loop
      } else if (result === 0) {
        continue loop
      }
    }
    // if we got this far, nothing accepted
    return -1
  }
  return isGreater ? 1 : 0
}

function acceptsWithoutIndexers(type: ObjectType<any>, input: Object): boolean {
  const { properties } = type
  for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    if (!property.accepts(input)) {
      return false
    }
  }
  return true
}

function acceptsExact(type: ObjectType<any>, input: Object): boolean {
  const { properties } = type
  for (const key in input) {
    // eslint-disable-line guard-for-in
    if (!properties.some(property => property.key === key)) {
      return false
    }
  }
  return true
}

function compareTypeWithoutIndexers(
  type: ObjectType<any>,
  input: ObjectType<any>
): -1 | 0 | 1 {
  const { properties } = type
  const inputProperties = input.properties
  let isGreater = false
  loop: for (let i = 0; i < properties.length; i++) {
    const property = properties[i]
    for (let j = 0; j < inputProperties.length; j++) {
      const inputProperty = inputProperties[j]
      if (inputProperty.key === property.key) {
        const result = compareTypes(property.value, inputProperty.value)
        if (result === -1) {
          return -1
        } else if (result === 1) {
          isGreater = true
        }
        continue loop
      }
    }
    return -1
  }
  return isGreater ? 1 : 0
}

function* collectErrorsWithIndexers(
  type: ObjectType<any>,
  validation: Validation<any>,
  path: IdentifierPath,
  input: Object
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
  input: Object
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
  input: Object
): Generator<ErrorTuple, void, void> {
  const { properties } = type
  for (const key in input) {
    // eslint-disable-line guard-for-in
    if (!properties.some(property => property.key === key)) {
      yield [path, getErrorMessage('ERR_UNKNOWN_KEY', key), type]
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
