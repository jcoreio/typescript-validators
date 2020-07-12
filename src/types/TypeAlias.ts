import Type from './Type'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'
import {
  addConstraints,
  collectConstraintErrors,
  constraintsAccept,
  TypeConstraint,
} from '../typeConstraints'

export default class TypeAlias<T> extends Type<T> {
  typeName = 'TypeAlias'
  readonly name: string
  readonly type: Type<T>
  readonly constraints: TypeConstraint<T>[] = []

  constructor(name: string, type: Type<T>) {
    super()
    this.name = name
    this.type = type
  }

  addConstraint(...constraints: TypeConstraint<T>[]): this {
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

  toString(): string {
    return this.name
  }
}
