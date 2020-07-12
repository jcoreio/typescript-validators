import { RequiredKeys, OptionalKeys } from 'typelevel-ts'
import Type from './types/Type'
import AnyType from './types/AnyType'
import ArrayType from './types/ArrayType'
import BooleanLiteralType from './types/BooleanLiteralType'
import BooleanType from './types/BooleanType'
import EmptyType from './types/EmptyType'
import IntersectionType from './types/IntersectionType'
import NullableType from './types/NullableType'
import NullLiteralType from './types/NullLiteralType'
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

export {
  Type,
  AnyType,
  ArrayType,
  BooleanLiteralType,
  BooleanType,
  EmptyType,
  IntersectionType,
  NullableType,
  NullLiteralType,
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
}

export const any = () => new AnyType()
export const array = <T>(elementType: Type<T>) => new ArrayType(elementType)
export const booleanLiteral = <T extends true | false>(value: T) =>
  new BooleanLiteralType(value)
export const boolean = () => new BooleanType()
export const nullable = <T>(type: Type<T>): Type<T | null | undefined> =>
  new NullableType(type)
export const nullLiteral = () => new NullLiteralType()
export const number = () => new NumberType()
export const numericLiteral = (value: number) => new NumericLiteralType(value)
export const string = () => new StringType()
export const stringLiteral = (value: string) => new StringLiteralType(value)
export const symbol = () => new SymbolType()
export const symbolLiteral = (value: symbol) => new SymbolLiteralType(value)

export function object<S extends {}>(
  properties: { [K in keyof S]-?: Type<S[K]> }
): Type<S> {
  return new ObjectType(
    Object.keys(properties).map(
      key =>
        new ObjectTypeProperty(
          key,
          (properties as any)[key],
          (properties as any)[key] instanceof NullableType
        )
    )
  ) as any
}

export const record = <K extends string | number | symbol, V>(
  key: Type<K>,
  value: Type<V>
): Type<Record<K, V>> =>
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
