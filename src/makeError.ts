import Type from './types/Type'
import makeTypeError from './errorReporting/makeTypeError'
import Validation from './Validation'

export default function makeError(
  expected: Type<any>,
  input: any
): TypeError | null | undefined {
  const validation = new Validation(input)
  if (typeof (expected as any).name === 'string') {
    validation.path.push((expected as any).name)
  }
  validation.errors = Array.from(expected.errors(validation, [], input))
  return makeTypeError(validation)
}
