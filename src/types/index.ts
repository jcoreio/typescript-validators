/* @flow */

import Type from './Type'

export type ObjectPropertyDict<T> = {
  [K in keyof T]: T[K] extends Type<infer V> ? V : never
}

export type ValidObjectBody<O extends {}> =
  | ObjectTypeProperty<
      keyof O,
      { [K in keyof O]: O[K] extends Type<infer V> ? V : never }
    >
  | ObjectTypeIndexer<any, any>

export type TypeConstraint = (input: any) => string | null | undefined

import AnyType from './AnyType'
import ArrayType from './ArrayType'
import BooleanLiteralType from './BooleanLiteralType'
import BooleanType from './BooleanType'
import EmptyType from './EmptyType'
import IntersectionType from './IntersectionType'
import NullableType from './NullableType'
import NullLiteralType from './NullLiteralType'
import NumberType from './NumberType'
import NumericLiteralType from './NumericLiteralType'
import ObjectType from './ObjectType'
import ObjectTypeIndexer from './ObjectTypeIndexer'
import ObjectTypeProperty from './ObjectTypeProperty'
import StringLiteralType from './StringLiteralType'
import StringType from './StringType'
import SymbolLiteralType from './SymbolLiteralType'
import SymbolType from './SymbolType'
import TupleType from './TupleType'
import UnionType from './UnionType'
import VoidType from './VoidType'

export {
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
  Type,
  UnionType,
  VoidType,
}
