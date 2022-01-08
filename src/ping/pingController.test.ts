/* eslint-disable @typescript-eslint/no-explicit-any */
import { getPing } from './pingController'

test('getPing should return {success: true}', () =>
  getPing
    .handler({} as any, {} as any)
    .then((res) => expect(res).toEqual({ success: true })))
