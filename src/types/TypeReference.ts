import Type from './Type'
import TypeAlias from './TypeAlias'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class TypeReference<T> extends Type<T> {
  typeName = 'TypeReference'
  readonly type: () => TypeAlias<T>

  constructor(type: () => TypeAlias<T>) {
    super()
    this.type = type
  }

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    yield* this.type().errors(validation, path, input)
  }

  accepts(input: any): boolean {
    return this.type().accepts(input)
  }

  toString(): string {
    return this.type().toString()
  }
}
