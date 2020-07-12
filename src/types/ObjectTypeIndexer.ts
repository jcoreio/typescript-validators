import Type from './Type'

import Validation, { ErrorTuple, IdentifierPath } from '../Validation'

export default class ObjectTypeIndexer<
  K extends string | number | symbol,
  V
> extends Type<V> {
  typeName = 'ObjectTypeIndexer'
  readonly id: string
  readonly key: Type<K>
  readonly value: Type<V>

  constructor(id: string, key: Type<K>, value: Type<V>) {
    super()
    this.id = id
    this.key = key
    this.value = value
  }

  *errors(
    validation: Validation<any>,
    path: IdentifierPath,
    key: any
    // value: any
  ): Generator<ErrorTuple, void, void> {
    // special case number types
    if (
      this.key.typeName === 'NumberType' ||
      this.key.typeName === 'NumericLiteralType'
    ) {
      key = +key
    }

    yield* this.key.errors(validation, path.concat('[[Key]]'), key)
    // yield* this.value.errors(validation, path.concat(key), value)
  }

  accepts(value: any): boolean {
    return this.value.accepts(value)
  }

  acceptsKey(key: any): boolean {
    // special case number types
    if (
      this.key.typeName === 'NumberType' ||
      this.key.typeName === 'NumericLiteralType'
    ) {
      key = +key
    }
    return this.key.accepts(key)
  }

  acceptsValue(value: any): boolean {
    return this.value.accepts(value)
  }

  toString(): string {
    return `[${this.id}: ${this.key.toString()}]: ${this.value.toString()};`
  }
}
