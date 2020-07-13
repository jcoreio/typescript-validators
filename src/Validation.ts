import Type from './types/Type'
import { weakSetAdd, weakSetDelete, weakSetHas } from './cyclic'

export type IdentifierPath = Array<string | number | symbol>

export type ErrorTuple = [IdentifierPath, string, Type<any>]

export default class Validation<T> {
  readonly input: T

  readonly path: IdentifierPath = []

  readonly prefix: string

  readonly errors: ErrorTuple[] = []

  // Tracks whether we're in validation of cyclic objects.
  cyclic: WeakMap<Type<any>, WeakSet<any>> = new WeakMap()

  constructor(input: T, prefix = '', path?: IdentifierPath) {
    this.input = input
    this.prefix = prefix
    if (path) this.path.push(...path)
  }

  inCycle(type: Type<any>, input: any): boolean {
    const tracked = this.cyclic.get(type)
    if (!tracked) {
      return false
    } else {
      return weakSetHas(tracked, input)
    }
  }

  startCycle(type: Type<any>, input: any): void {
    let tracked = this.cyclic.get(type)
    if (!tracked) {
      tracked = new WeakSet()
      this.cyclic.set(type, tracked)
    }
    weakSetAdd(tracked, input)
  }

  endCycle(type: Type<any>, input: any): void {
    const tracked = this.cyclic.get(type)
    if (tracked) {
      weakSetDelete(tracked, input)
    }
  }

  hasErrors(): boolean {
    return this.errors.length > 0
  }
}

const validIdentifierOrAccessor = /^[$A-Z_][0-9A-Z_$[\].]*$/i

export function stringifyPath(path: IdentifierPath): string {
  if (!path.length) {
    return 'Value'
  }
  const { length } = path
  const parts = new Array(length)
  for (let i = 0; i < length; i++) {
    const part = path[i]
    if (part === '[[Return Type]]') {
      parts[i] = 'Return Type'
    } else if (
      typeof part !== 'string' ||
      !validIdentifierOrAccessor.test(part)
    ) {
      parts[i] = `[${String(part)}]`
    } else if (i > 0) {
      parts[i] = `.${String(part)}`
    } else {
      parts[i] = String(part)
    }
  }
  return parts.join('')
}

export function resolvePath(input: any, path: IdentifierPath): any {
  let subject = input
  const { length } = path
  for (let i = 0; i < length; i++) {
    if (subject == null) {
      return undefined
    }
    const part = path[i]
    if (part === '[[Return Type]]') {
      continue
    }
    if (subject instanceof Map) {
      subject = subject.get(part)
    } else {
      subject = subject[part]
    }
  }
  return subject
}
