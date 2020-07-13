import { keyToString } from './keyToString'

export default function typeOf(value: any): string {
  if (value == null) return String(value)
  if (typeof value !== 'object') return typeof value
  if (value.constructor && value.constructor !== Object)
    return value.constructor.name
  return `{\n${Object.keys(value)
    .map(key => `  ${keyToString(key)}: ${typeOf(value[key])}`)
    .join(',\n')}\n}`
}
