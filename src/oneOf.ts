import Type from './types/Type'
import UnionType from './types/UnionType'

export default function oneOf<T1>(...types: [Type<T1>]): Type<T1>

export default function oneOf<T1, T2>(
  ...types: [Type<T1>, Type<T2>]
): Type<T1 | T2>

export default function oneOf<T1, T2, T3>(
  ...types: [Type<T1>, Type<T2>, Type<T3>]
): Type<T1 | T2 | T3>

export default function oneOf<T1, T2, T3, T4>(
  ...types: [Type<T1>, Type<T2>, Type<T3>, Type<T4>]
): Type<T1 | T2 | T3 | T4>

export default function oneOf<T1, T2, T3, T4, T5>(
  ...types: [Type<T1>, Type<T2>, Type<T3>, Type<T4>, Type<T5>]
): Type<T1 | T2 | T3 | T4 | T5>

export default function oneOf<T1, T2, T3, T4, T5, T6>(
  ...types: [Type<T1>, Type<T2>, Type<T3>, Type<T4>, Type<T5>, Type<T6>]
): Type<T1 | T2 | T3 | T4 | T5 | T6>

export default function oneOf<T1, T2, T3, T4, T5, T6, T7>(
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

export default function oneOf<T1, T2, T3, T4, T5, T6, T7, T8>(
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

export default function oneOf<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>
  ]
): Type<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9>

export default function oneOf<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>
  ]
): Type<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10>

export default function oneOf<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10, T11>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>
  ]
): Type<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>
  ]
): Type<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>
  ]
): Type<T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>
  ]
): Type<
  T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>
  ]
): Type<
  T1 | T2 | T3 | T4 | T5 | T6 | T7 | T8 | T9 | T10 | T11 | T12 | T13 | T14 | T15
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  T21
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>,
    Type<T21>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
  | T21
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  T21,
  T22
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>,
    Type<T21>,
    Type<T22>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
  | T21
  | T22
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  T21,
  T22,
  T23
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>,
    Type<T21>,
    Type<T22>,
    Type<T23>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
  | T21
  | T22
  | T23
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  T21,
  T22,
  T23,
  T24
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>,
    Type<T21>,
    Type<T22>,
    Type<T23>,
    Type<T24>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
  | T21
  | T22
  | T23
  | T24
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  T21,
  T22,
  T23,
  T24,
  T25
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>,
    Type<T21>,
    Type<T22>,
    Type<T23>,
    Type<T24>,
    Type<T25>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
  | T21
  | T22
  | T23
  | T24
  | T25
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  T21,
  T22,
  T23,
  T24,
  T25,
  T26
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>,
    Type<T21>,
    Type<T22>,
    Type<T23>,
    Type<T24>,
    Type<T25>,
    Type<T26>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
  | T21
  | T22
  | T23
  | T24
  | T25
  | T26
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  T21,
  T22,
  T23,
  T24,
  T25,
  T26,
  T27
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>,
    Type<T21>,
    Type<T22>,
    Type<T23>,
    Type<T24>,
    Type<T25>,
    Type<T26>,
    Type<T27>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
  | T21
  | T22
  | T23
  | T24
  | T25
  | T26
  | T27
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  T21,
  T22,
  T23,
  T24,
  T25,
  T26,
  T27,
  T28
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>,
    Type<T21>,
    Type<T22>,
    Type<T23>,
    Type<T24>,
    Type<T25>,
    Type<T26>,
    Type<T27>,
    Type<T28>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
  | T21
  | T22
  | T23
  | T24
  | T25
  | T26
  | T27
  | T28
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  T21,
  T22,
  T23,
  T24,
  T25,
  T26,
  T27,
  T28,
  T29
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>,
    Type<T21>,
    Type<T22>,
    Type<T23>,
    Type<T24>,
    Type<T25>,
    Type<T26>,
    Type<T27>,
    Type<T28>,
    Type<T29>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
  | T21
  | T22
  | T23
  | T24
  | T25
  | T26
  | T27
  | T28
  | T29
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  T21,
  T22,
  T23,
  T24,
  T25,
  T26,
  T27,
  T28,
  T29,
  T30
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>,
    Type<T21>,
    Type<T22>,
    Type<T23>,
    Type<T24>,
    Type<T25>,
    Type<T26>,
    Type<T27>,
    Type<T28>,
    Type<T29>,
    Type<T30>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
  | T21
  | T22
  | T23
  | T24
  | T25
  | T26
  | T27
  | T28
  | T29
  | T30
>

export default function oneOf<
  T1,
  T2,
  T3,
  T4,
  T5,
  T6,
  T7,
  T8,
  T9,
  T10,
  T11,
  T12,
  T13,
  T14,
  T15,
  T16,
  T17,
  T18,
  T19,
  T20,
  T21,
  T22,
  T23,
  T24,
  T25,
  T26,
  T27,
  T28,
  T29,
  T30,
  T31
>(
  ...types: [
    Type<T1>,
    Type<T2>,
    Type<T3>,
    Type<T4>,
    Type<T5>,
    Type<T6>,
    Type<T7>,
    Type<T8>,
    Type<T9>,
    Type<T10>,
    Type<T11>,
    Type<T12>,
    Type<T13>,
    Type<T14>,
    Type<T15>,
    Type<T16>,
    Type<T17>,
    Type<T18>,
    Type<T19>,
    Type<T20>,
    Type<T21>,
    Type<T22>,
    Type<T23>,
    Type<T24>,
    Type<T25>,
    Type<T26>,
    Type<T27>,
    Type<T28>,
    Type<T29>,
    Type<T30>,
    Type<T31>
  ]
): Type<
  | T1
  | T2
  | T3
  | T4
  | T5
  | T6
  | T7
  | T8
  | T9
  | T10
  | T11
  | T12
  | T13
  | T14
  | T15
  | T16
  | T17
  | T18
  | T19
  | T20
  | T21
  | T22
  | T23
  | T24
  | T25
  | T26
  | T27
  | T28
  | T29
  | T30
  | T31
>
export default function oneOf(...types: Type<any>[]): Type<any> {
  return new UnionType(types)
}
