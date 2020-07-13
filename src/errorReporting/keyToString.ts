export function keyToString(key: string | number | symbol): string {
  switch (typeof key) {
    case 'symbol':
      return `[${String(key)}]`
    case 'number':
      return String(key)
    case 'string':
      if (/^[_a-z][_a-z0-9]*$/i.test(key)) return key
  }
  return JSON.stringify(key)
}
