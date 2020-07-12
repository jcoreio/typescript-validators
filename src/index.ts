import Type from './types/Type'
import AnyType from './types/AnyType'
import ArrayType from './types/ArrayType'
import BooleanLiteralType from './types/BooleanLiteralType'
import BooleanType from './types/BooleanType'
import ConstrainedType from './types/ConstrainedType'
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
import Validation from './Validation'

export {
  Type,
  AnyType,
  ArrayType,
  BooleanLiteralType,
  BooleanType,
  ConstrainedType,
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
  Validation,
}

export const any = (): Type<any> => new AnyType()
export const array = <T>(elementType: Type<T>): Type<T[]> =>
  new ArrayType(elementType)
export const booleanLiteral = <T extends true | false>(value: T): Type<T> =>
  new BooleanLiteralType(value)
export const boolean = (): Type<boolean> => new BooleanType()
export const nullable = <T>(type: Type<T>): Type<T | null | undefined> =>
  new NullableType(type)
export const nullLiteral = (): Type<null> => new NullLiteralType()
export const number = (): Type<number> => new NumberType()
export const numericLiteral = <T extends number>(value: T): Type<T> =>
  new NumericLiteralType(value)
export const string = (): Type<string> => new StringType()
export const stringLiteral = <T extends string>(value: T): Type<T> =>
  new StringLiteralType(value)
export const symbol = (): Type<symbol> => new SymbolType()
export const symbolLiteral = <T extends symbol>(value: T): Type<T> =>
  new SymbolLiteralType(value)

export function object<S extends {}>(
  properties: { [K in keyof S]-?: Type<S[K]> }
): ObjectType<S> {
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
