import Type from './Type'
import getErrorMessage from '../getErrorMessage'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class UnionType<T> extends Type<T> {
  typeName = 'UnionType'
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
      const type = types[i]
      if (type.accepts(input)) {
        return
      }
    }
    yield [path, getErrorMessage('ERR_NO_UNION', this.toString()), this]
  }

  accepts(input: any): boolean {
    const { types } = this
    const { length } = types
    for (let i = 0; i < length; i++) {
      const type = types[i]
      if (type.accepts(input)) {
        return true
      }
    }
    return false
  }

  toString(): string {
    const { types } = this
    const normalized = new Array(types.length)
    for (let i = 0; i < types.length; i++) {
      const type = types[i]
      if (
        type.typeName === 'FunctionType' ||
        type.typeName === 'ParameterizedFunctionType'
      ) {
        normalized[i] = `(${type.toString()})`
      } else {
        normalized[i] = type.toString()
      }
    }
    return normalized.join(' | ')
  }
}
