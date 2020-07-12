import Type from './types/Type'
import AnyType from './types/AnyType'
import ArrayType from './types/ArrayType'
import BooleanLiteralType from './types/BooleanLiteralType'
import BooleanType from './types/BooleanType'
import ConstrainedType from './types/ConstrainedType'
import IntersectionType from './types/IntersectionType'
import NullLiteralType from './types/NullLiteralType'
import UndefinedLiteralType from './types/UndefinedLiteralType'
import NumberType from './types/NumberType'
import NumericLiteralType from './types/NumericLiteralType'
import ObjectType from './types/ObjectType'
import ObjectTypeIndexer from './types/ObjectTypeIndexer'
import ObjectTypeProperty from './types/ObjectTypeProperty'
import StringLiteralType from './types/StringLiteralType'
import StringType from './types/StringType'
import SymbolLiteralType from './types/SymbolLiteralType'
import SymbolType from './types/SymbolType'
import TupleType from './types/TupleType'
import UnionType from './types/UnionType'
import VoidType from './types/VoidType'
import Validation from './Validation'
import RuntimeTypeError from './errorReporting/RuntimeTypeError'

export {
  Type,
  AnyType,
  ArrayType,
  BooleanLiteralType,
  BooleanType,
  ConstrainedType,
  IntersectionType,
  NullLiteralType,
  UndefinedLiteralType,
  NumberType,
  NumericLiteralType,
  ObjectType,
  ObjectTypeIndexer,
  ObjectTypeProperty,
  StringLiteralType,
  StringType,
  SymbolLiteralType,
  SymbolType,
  TupleType,
  UnionType,
  VoidType,
  Validation,
  RuntimeTypeError,
}

export const any = (): Type<any> => new AnyType()
export const array = <T>(elementType: Type<T>): Type<T[]> =>
  new ArrayType(elementType)
export const booleanLiteral = <T extends true | false>(value: T): Type<T> =>
  new BooleanLiteralType(value)
export const boolean = (): Type<boolean> => new BooleanType()
export const nullLiteral = (): Type<null> => new NullLiteralType()
export const undefinedLiteral = (): Type<undefined> =>
  new UndefinedLiteralType()
export const nullable = <T>(type: Type<T>): Type<T | null | undefined> =>
  union(type, nullLiteral(), undefinedLiteral())
export const nullOr = <T>(type: Type<T>): Type<T | null> =>
  union(type, nullLiteral())
export const number = (): Type<number> => new NumberType()
export const numericLiteral = <T extends number>(value: T): Type<T> =>
  new NumericLiteralType(value)
export const string = (): Type<string> => new StringType()
export const stringLiteral = <T extends string>(value: T): Type<T> =>
  new StringLiteralType(value)
export const symbol = (): Type<symbol> => new SymbolType()
export const symbolLiteral = <T extends symbol>(value: T): Type<T> =>
  new SymbolLiteralType(value)

type OptionalProperty<T> = { __optional__: Type<T> }

export const optional = <T>(type: Type<T>): OptionalProperty<T> => ({
  __optional__: type,
})

const getOptional = <T>(value: unknown): Type<T> | null | undefined =>
  value instanceof Object ? (value as any).__optional__ : null

export const optionalNullable = <T>(
  type: Type<T>
): OptionalProperty<T | null> => optional(union(type, nullLiteral()))

type OptionalKeys<T> = {
  [K in keyof T]: T extends Record<K, T[K]> ? never : K
} extends {
  [_ in keyof T]: infer U
}
  ? {} extends U
    ? never
    : U
  : never

export function object2<S extends {}>(
  properties: {
    [K in keyof S]-?: K extends OptionalKeys<S>
      ? OptionalProperty<S[K]>
      : Type<S[K]>
  }
): ObjectType<S> {
  return new ObjectType(
    [...Object.entries(properties)].map(
      ([key, type]) =>
        new ObjectTypeProperty(
          key,
          getOptional(type) || (type as Type<any>),
          Boolean(getOptional(type))
        )
    )
  ) as any
}

type Properties = Record<string | number | symbol, Type<any>>

export function object<Required extends Properties>(
  required: Required
): ObjectType<{ [K in keyof Required]: Required[K]['__type'] }>
export function object<
  Required extends Properties,
  Optional extends Properties
>(
  required: Required,
  optional: Optional
): ObjectType<
  { [K in keyof Required]: Required[K]['__type'] } &
    { [K in keyof Optional]?: Optional[K]['__type'] }
>
export function object<
  Required extends Properties,
  Optional extends Properties
>(
  required: Required | null | undefined,
  optional: Optional | null | undefined = null
): ObjectType<any> {
  return new ObjectType([
    ...[...Object.entries(required || [])].map(
      ([key, type]) => new ObjectTypeProperty(key, type as Type<any>, false)
    ),
    ...[...Object.entries(optional || [])].map(
      ([key, type]) => new ObjectTypeProperty(key, type as Type<any>, true)
    ),
  ]) as any
}

export const record = <K extends string | number | symbol, V>(
  key: Type<K>,
  value: Type<V>
): ObjectType<Record<K, V>> =>
  new ObjectType([], [new ObjectTypeIndexer('key', key, value)]) as any

export const tuple = <T extends []>(
  types: { [Index in keyof T]: Type<T[Index]> }
): Type<T> => new TupleType(types) as any

export function intersection<T1>(...types: [Type<T1>]): Type<T1>
export function intersection<T1, T2>(
  ...types: [Type<T1>, Type<T2>]
): Type<T1 & T2>
export function intersection<T1, T2, T3>(
  ...types: [Type<T1>, Type<T2>, Type<T3>]
): Type<T1 & T2 & T3>
export function intersection<T1, T2, T3, T4>(
  ...types: [Type<T1>, Type<T2>, Type<T3>, Type<T4>]
): Type<T1 & T2 & T3 & T4>
export function intersection<T1, T2, T3, T4, T5>(
  ...types: [Type<T1>, Type<T2>, Type<T3>, Type<T4>, Type<T5>]
): Type<T1 & T2 & T3 & T4 & T5>
export function intersection<T1, T2, T3, T4, T5, T6>(
  ...types: [Type<T1>, Type<T2>, Type<T3>, Type<T4>, Type<T5>, Type<T6>]
): Type<T1 & T2 & T3 & T4 & T5 & T6>
export function intersection<T1, T2, T3, T4, T5, T6, T7>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>
  ]
): Type<T1 & T2 & T3 & T4 & T5 & T6 & T7>
export function intersection<T1, T2, T3, T4, T5, T6, T7, T8>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>
  ]
): Type<T1 & T2 & T3 & T4 & T5 & T6 & T7 & T8>
export function intersection(...types: Type<any>[]): Type<any> {
  return new IntersectionType(types)
}

export function union<T1>(...types: [Type<T1>]): Type<T1>
export function union<T1, T2>(...types: [Type<T1>, Type<T2>]): Type<T1 | T2>
export function union<T1, T2, T3>(
  ...types: [Type<T1>, Type<T2>, Type<T3>]
): Type<T1 | T2 | T3>
export function union<T1, T2, T3, T4>(
  ...types: [Type<T1>, Type<T2>, Type<T3>, Type<T4>]
): Type<T1 | T2 | T3 | T4>
export function union<T1, T2, T3, T4, T5>(
  ...types: [Type<T1>, Type<T2>, Type<T3>, Type<T4>, Type<T5>]
): Type<T1 | T2 | T3 | T4 | T5>
export function union<T1, T2, T3, T4, T5, T6>(
  ...types: [Type<T1>, Type<T2>, Type<T3>, Type<T4>, Type<T5>, Type<T6>]
): Type<T1 | T2 | T3 | T4 | T5 | T6>
export function union<T1, T2, T3, T4, T5, T6, T7>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>
  ]
): Type<T1 | T2 | T3 | T4 | T5 | T6 | T7>
export function union<T1, T2, T3, T4, T5, T6, T7, T8>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>
  ]
): Type<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8>
export function union(...types: Type<any>[]): Type<any> {
  return new UnionType(types)
}

export const constrain = <T>(name: string, type: Type<T>): ConstrainedType<T> =>
  new ConstrainedType(name, type)

export type ExtractType<T extends Type<any>> = T['__type']
