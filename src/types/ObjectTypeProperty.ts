/* @flow */

import Type from './Type'
import compareTypes from '../compareTypes'
import {
  addConstraints,
  collectConstraintErrors,
  constraintsAccept,
} from '../typeConstraints'

import Validation, { ErrorTuple, IdentifierPath } from '../Validation'
import { TypeConstraint } from './ConstrainedType'
import getErrorMessage from '../getErrorMessage'

export default class ObjectTypeProperty<
  K extends string | number | symbol,
  V
> extends Type<V> {
  typeName = 'ObjectTypeProperty'
  key: K
  value: Type<V>
  optional: boolean
  constraints: TypeConstraint<V>[] = []

  constructor(key: K, value: Type<V>, optional: boolean) {
    super()
    this.key = key
    this.value = value
    this.optional = optional
  }

  addConstraint(...constraints: TypeConstraint<V>[]): ObjectTypeProperty<K, V> {
    addConstraints(this, ...constraints)
    return this
  }

  /**
   * Determine whether the property exists on the given input or its prototype chain.
   */
  existsOn(input: Record<string, any>): boolean {
    // @flowIgnore
    const { key } = this
    return key in input === true
  }

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    // @flowIgnore
    const { optional, key, value } = this
    if (!optional && !this.existsOn(input)) {
      yield [path, getErrorMessage('ERR_MISSING_PROPERTY'), input]
      return
    }
    const target = input[key]
    const targetPath = path.concat(key)
    if (optional && target === undefined) {
      return
    }
    let hasErrors = false
    for (const error of value.errors(validation, targetPath, target)) {
      hasErrors = true
      yield error
    }
    if (!hasErrors) {
      yield* collectConstraintErrors(this, validation, targetPath, target)
    }
  }

  accepts(input: Record<K, V>): boolean {
    // @flowIgnore
    const { optional, key, value } = this
    if (!optional && !this.existsOn(input)) {
      return false
    }
    const target = input[key]

    if (optional && target === undefined) {
      return true
    }

    if (!value.accepts(target)) {
      return false
    } else {
      return constraintsAccept(this, target)
    }
  }

  compareWith(input: Type<any>): -1 | 0 | 1 {
    if (!(input instanceof ObjectTypeProperty)) {
      return -1
    } else if (input.key !== this.key) {
      return -1
    } else {
      return compareTypes(this.value, input.value)
    }
  }

  toString(): string {
    let key: any = this.key
    if (typeof key === 'symbol') {
      key = `[${key.toString()}]`
    }
    return `${key}${this.optional ? '?' : ''}: ${this.value.toString()};`
  }

  toJSON(): Record<string, any> {
    return {
      typeName: this.typeName,
      key: this.key,
      value: this.value,
      optional: this.optional,
    }
  }
}
