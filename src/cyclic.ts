import Type from './types/Type'

// Tracks whether we're in validation of cyclic objects.
const cyclicValidation = new WeakMap()
// Tracks whether we're toString() of cyclic objects.
const cyclicToString = new WeakSet()

export function inValidationCycle(type: Type<any>, input: any): boolean {
  try {
    const tracked = cyclicValidation.get(type)
    if (!tracked) {
      return false
    } else {
      return weakSetHas(tracked, input)
    }
  } catch (e) {
    // some exotic values cannot be checked
    return true
  }
}

export function startValidationCycle(type: Type<any>, input: any): void {
  let tracked = cyclicValidation.get(type)
  if (!tracked) {
    tracked = new WeakSet()
    cyclicValidation.set(type, tracked)
  }
  weakSetAdd(tracked, input)
}

export function endValidationCycle(type: Type<any>, input: any): void {
  const tracked = cyclicValidation.get(type)
  if (tracked) {
    weakSetDelete(tracked, input)
  }
}

export function inToStringCycle(type: Type<any>): boolean {
  return cyclicToString.has(type)
}

export function startToStringCycle(type: Type<any>): void {
  cyclicToString.add(type)
}

export function endToStringCycle(type: Type<any>): void {
  cyclicToString.delete(type)
}

export function weakSetHas<V extends {}>(
  weakset: WeakSet<V>,
  value: V
): boolean {
  try {
    return weakset.has(value)
  } catch (e) {
    return true
  }
}

export function weakSetAdd<V extends {}>(weakset: WeakSet<V>, value: V): void {
  try {
    weakset.add(value)
  } catch (e) {
    // ignore
  }
}

export function weakSetDelete<V extends {}>(
  weakset: WeakSet<V>,
  value: V
): void {
  try {
    weakset.delete(value)
  } catch (e) {
    // ignore
  }
}
