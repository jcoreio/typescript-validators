import { keyToString } from './keyToString'

export default function typeOf(value: any): string {
  if (value == null) return String(value)
  if (typeof value !== 'object') return typeof value
  const constructor = value.prototype
    ? value.prototype.constructor
    : value.constructor
  if (constructor && constructor !== Object) return constructor.name
  return `{\n${Object.keys(value)
    .map(key => `  ${keyToString(key)}: ${typeOf(value[key])}`)
    .join(',\n')}\n}`
}
