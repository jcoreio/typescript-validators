import Type from './types/Type'
import Validation, { ErrorTuple, IdentifierPath } from './Validation'

export type TypeConstraint<T> = (input: T) => string | null | undefined

export type ConstrainableType<T> = Type<T> & {
  constraints: TypeConstraint<T>[]
}

/**
 * Add constraints to the given subject type.
 */
export function addConstraints<T>(
  subject: ConstrainableType<T>,
  ...constraints: TypeConstraint<T>[]
): void {
  subject.constraints.push(...constraints)
}

/**
 * Collect any errors from constraints on the given subject type.
 */
export function* collectConstraintErrors(
  subject: ConstrainableType<any>,
  validation: Validation<any>,
  path: IdentifierPath,
  ...input: any[]
): Generator<ErrorTuple, void, void> {
  const { constraints } = subject
  const { length } = constraints
  for (let i = 0; i < length; i++) {
    const constraint = constraints[i]
    const violation = (constraint as any)(...input)
    if (typeof violation === 'string') {
      yield [path, violation, subject]
    }
  }
}

/**
 * Determine whether the input passes the constraints on the subject type.
 */
export function constraintsAccept(
  subject: ConstrainableType<any>,
  ...input: any[]
): boolean {
  const { constraints } = subject
  const { length } = constraints
  for (let i = 0; i < length; i++) {
    const constraint = constraints[i]
    if (typeof (constraint as any)(...input) === 'string') {
      return false
    }
  }
  return true
}
