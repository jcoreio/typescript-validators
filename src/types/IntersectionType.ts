import Type from './Type'

import { Property } from './ObjectType'
import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class IntersectionType<T> extends Type<T> {
  typeName = 'IntersectionType'
  types: Type<any>[]

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

  /**
   * Get a property with the given name, or undefined if it does not exist.
   */
  getProperty<K extends string | number | symbol>(
    key: K
  ): Property<K, any> | null | undefined {
    const { types } = this
    const { length } = types
    for (let i = length - 1; i >= 0; i--) {
      const type: any = types[i]
      if (typeof type.getProperty === 'function') {
        const prop = type.getProperty(key)
        if (prop) {
          return prop
        }
      }
    }
  }

  /**
   * Determine whether a property with the given name exists.
   */
  hasProperty(key: string): boolean {
    const { types } = this
    const { length } = types
    for (let i = 0; i < length; i++) {
      const type: any = types[i]
      if (typeof type.hasProperty === 'function' && type.hasProperty(key)) {
        return true
      }
    }
    return false
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
