import { stringifyPath, resolvePath } from '../Validation'
import Validation from '../Validation'
import typeOf from './typeOf'

export default function makeJSONError<T>(validation: Validation<T>) {
  if (!validation.hasErrors()) {
    return
  }
  const { input } = validation
  const errors = []
  for (const [path, message, expectedType] of validation.errors) {
    const expected = expectedType ? expectedType.toString() : null
    const actual = typeOf(resolvePath(input, path))
    const field = stringifyPath([...validation.path, ...path])

    const pointer = `/${path.join('/')}`

    errors.push({
      pointer,
      field,
      message,
      expected,
      actual,
    })
  }
  return errors
}
