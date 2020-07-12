import Validation from '../Validation'
import { ErrorTuple, IdentifierPath } from '../Validation'
import makeTypeError from '../errorReporting/makeTypeError'
import makeWarningMessage from '../errorReporting/makeWarningMessage'

/**
 * # Type
 *
 * This is the base class for all types.
 */
export default class Type<T> {
  readonly __type: T = null as any
  typeName = 'Type'

  static __compareTypes: (a: Type<any>, b: Type<any>) => -1 | 0 | 1;

  *errors(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    validation: Validation<any>,
    path: IdentifierPath,
    input: any
    /* eslint-enable @typescript-eslint/no-unused-vars */
  ): Generator<ErrorTuple, void, void> {
    // no-op
  }

  accepts(input: any): boolean {
    const validation = new Validation(input)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const error of this.errors(validation, [], input)) {
      return false
    }
    return true
  }

  acceptsType(input: Type<any>): boolean {
    if (!Type.__compareTypes) {
      throw new Error(
        `typescript-validators/compareTypes must be imported before doing this; probably you need to
    
    import { Type } from 'typescript-validators'

instead of

    import Type from 'typescript-validators/types/Type'`
      )
    }
    if (Type.__compareTypes(this, input) === -1) {
      return false
    } else {
      return true
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  compareWith(input: Type<any>): -1 | 0 | 1 {
    return -1
  }

  assert<V extends T>(input: any, prefix = '', path?: IdentifierPath): V {
    const validation = this.validate(input, prefix, path)
    const error = makeTypeError(validation)
    if (error) {
      throw error
    }
    return input
  }

  validate(input: any, prefix = '', path?: IdentifierPath): Validation<T> {
    const validation = new Validation(input)
    if (path) {
      validation.path.push(...path)
    }
    validation.prefix = prefix
    validation.errors = Array.from(this.errors(validation, [], input))
    return validation
  }

  warn(input: any, prefix = '', path?: IdentifierPath): void {
    const validation = this.validate(input, prefix, path)
    const message = makeWarningMessage(validation)
    if (typeof message === 'string') {
      console.warn(message) // eslint-disable-line no-console
    }
    return input
  }

  toString(): string {
    return 'Type'
  }

  toJSON(): any {
    return {
      typeName: this.typeName,
    }
  }
}
