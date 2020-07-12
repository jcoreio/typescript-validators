import Type from './Type'
import compareTypes from '../compareTypes'
import { TypeConstraint } from './'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

import {
  addConstraints,
  collectConstraintErrors,
  constraintsAccept,
} from '../typeConstraints'

export default class ConstrainedType<T> extends Type<T> {
  typeName = 'ConstrainedType'
  name: string
  type: Type<T>
  constraints: TypeConstraint<T>[] = []

  constructor(name: string, type: Type<T>) {
    super()
    this.name = name
    this.type = type
  }

  addConstraint(...constraints: TypeConstraint<T>[]): ConstrainedType<T> {
    addConstraints(this, ...constraints)
    return this
  }

  get hasConstraints(): boolean {
    return this.constraints.length > 0
  }

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    const { type } = this
    let hasErrors = false
    for (const error of type.errors(validation, path, input)) {
      hasErrors = true
      yield error
    }
    if (!hasErrors) {
      yield* collectConstraintErrors(this, validation, path, input)
    }
  }

  accepts(input: any): boolean {
    const { type } = this
    if (!type.accepts(input)) {
      return false
    } else if (!constraintsAccept(this, input)) {
      return false
    } else {
      return true
    }
  }

  compareWith(input: Type<any>): -1 | 0 | 1 {
    if (input === this) {
      return 0 // should never need this because it's taken care of by compareTypes.
    } else if (this.hasConstraints) {
      // if we have constraints the types cannot be the same
      return -1
    } else {
      return compareTypes(this.type, input)
    }
  }

  toString(): string {
    return this.name
  }

  toJSON(): Record<string, any> {
    return {
      typeName: this.typeName,
      name: this.name,
      type: this.type,
    }
  }
}
