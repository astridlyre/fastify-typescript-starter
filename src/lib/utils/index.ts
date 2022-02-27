import * as E from '~/lib/errors'

export function parseId(rawId: string) {
  const id = Number.parseInt(rawId, 10)

  if (Number.isNaN(id) || !id) {
    throw new E.ServerError(
      'Invalid id',
      `${rawId} is not a valid user id`,
      E.ServerError.unprocessable,
    )
  }
  return id
}

export default parseId
