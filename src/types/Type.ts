import Validation from '../Validation'
import { ErrorTuple, IdentifierPath } from '../Validation'
import makeTypeError from '../errorReporting/makeTypeError'

/**
 * # Type
 *
 * This is the base class for all types.
 */
export default abstract class Type<T> {
  readonly __type: T = null as any
  typeName = 'Type'

  abstract errors(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
    /* eslint-enable @typescript-eslint/no-unused-vars */
  ): Generator<ErrorTuple, void, void>

  abstract accepts(input: any): boolean

  assert<V extends T>(input: any, prefix = '', path?: IdentifierPath): V {
    const validation = this.validate(input, prefix, path)
    const error = makeTypeError(validation)
    if (error) {
      throw error
    }
    return input
  }

  validate(input: any, prefix = '', path?: IdentifierPath): Validation<T> {
    const validation = new Validation(input, prefix, path)
    for (const error of this.errors(validation, [], input))
      validation.errors.push(error)
    return validation
  }

  abstract toString(): string
}
