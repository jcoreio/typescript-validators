import Type from './Type'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export type TypeConstraint<T> = (input: T) => string | null | undefined

import {
  addConstraints,
  collectConstraintErrors,
  constraintsAccept,
} from '../typeConstraints'

export default class ConstrainedType<T> extends Type<T> {
  typeName = 'ConstrainedType'
  type: Type<T>
  constraints: TypeConstraint<T>[] = []

  constructor(type: Type<T>) {
    super()
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
      return require('../compareTypes').default(this.type, input)
    }
  }

  toString(): string {
    return `[constrained ${this.type}]`
  }

  toJSON(): Record<string, any> {
    return {
      typeName: this.typeName,
      type: this.type,
    }
  }
}
