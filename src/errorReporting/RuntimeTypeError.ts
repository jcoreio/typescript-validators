import { ErrorTuple } from '../Validation'

export default class RuntimeTypeError extends TypeError {
  name = 'RuntimeTypeError'
  errors: ErrorTuple[] | null | undefined
  constructor(
    message: string,
    options?: { errors?: ErrorTuple[] | null | undefined }
  ) {
    super(message)
    Object.assign(this, options)
  }
}
