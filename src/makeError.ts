import Type from './types/Type'
import makeTypeError from './errorReporting/makeTypeError'
import Validation from './Validation'

export default function makeError(
  expected: Type<any>,
  input: any
): TypeError | null | undefined {
  const validation = new Validation(input)
  for (const error of expected.errors(validation, [], input))
    validation.errors.push(error)
  return makeTypeError(validation)
}
