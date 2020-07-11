export default function typeOf(value: any): string {
  if (value == null) return String(value)
  if (typeof value !== 'object') return typeof value
  if (value.constructor) return value.constructor.name
  return `{\n${Object.keys(value)
    .map(key => `  ${key}: ${typeOf(value)}`)
    .join(',\n')}\n}`
}
