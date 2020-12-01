import Type from './Type'
import {
  addConstraints,
  collectConstraintErrors,
  constraintsAccept,
  TypeConstraint,
} from '../typeConstraints'

import Validation, { ErrorTuple, IdentifierPath } from '../Validation'
import getErrorMessage from '../getErrorMessage'
import { keyToString } from '../errorReporting/keyToString'

export default class ObjectTypeProperty<
  K extends string | number | symbol,
  V
> extends Type<V> {
  typeName = 'ObjectTypeProperty'
  readonly key: K
  readonly value: Type<V>
  readonly optional: boolean
  readonly constraints: TypeConstraint<V>[] = []
  __objectType: Type<any> = null as any

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
      yield [
        path,
        getErrorMessage('ERR_MISSING_PROPERTY', keyToString(key)),
        this.__objectType,
      ]
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

  toString(): string {
    let key: any = this.key
    if (typeof key === 'symbol') {
      key = `[${key.toString()}]`
    }
    return `${key}${this.optional ? '?' : ''}: ${this.value.toString()}`
  }
}
