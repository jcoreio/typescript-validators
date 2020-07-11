import { stringifyPath, resolvePath } from '../Validation'

import Validation from '../Validation'
import typeOf from './typeOf'

const delimiter = '\n-------------------------------------------------\n\n'

export default function makeWarningMessage<T>(
  validation: Validation<T>
): string | null | undefined {
  if (!validation.hasErrors()) {
    return
  }
  const { input } = validation
  const collected = []
  for (const [path, message, expectedType] of validation.errors) {
    const expected = expectedType ? expectedType.toString() : '*'
    const actual = typeOf(resolvePath(input, path))

    const field = stringifyPath([...validation.path, ...path])

    collected.push(
      `${field} ${message}\n\nExpected: ${expected}\n\nActual: ${actual}\n`
    )
  }
  return `Warning: ${collected.join(delimiter)}`
}
