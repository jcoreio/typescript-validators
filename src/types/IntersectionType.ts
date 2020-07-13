import Type from './Type'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class IntersectionType<T> extends Type<T> {
  typeName = 'IntersectionType'
  readonly types: Type<any>[]

  constructor(types: Type<any>[]) {
    super()
    this.types = types
  }

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
  ): Generator<ErrorTuple, void, void> {
    const { types } = this
    const { length } = types
    for (let i = 0; i < length; i++) {
      yield* types[i].errors(validation, path, input)
    }
  }

  accepts(input: any): boolean {
    const { types } = this
    const { length } = types
    for (let i = 0; i < length; i++) {
      const type = types[i]
      if (!type.accepts(input)) {
        return false
      }
    }
    return true
  }

  toString(): string {
    return this.types.join(' & ')
  }
}
