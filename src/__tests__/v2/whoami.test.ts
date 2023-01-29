import { beforeAll, describe, expect, test } from '@jest/globals'
import dotenv from 'dotenv'
import { GITHUB_GRAPHQL } from '../../sdk/utils/constants'

import * as whoamiSDK from '../../sdk/utils/queries'
import { whoami } from '../../sdk/v2/whoami'
import { TEST_DATA_WHOAMI_1 } from '../mockdata/whoami.data'

dotenv.config()

describe('whoami', () => {
  let fakePat: string

  beforeAll(() => {
    fakePat = '123'
  })

  async function returnMockData(): Promise<any> {
    return Promise.resolve(TEST_DATA_WHOAMI_1)
  }

  test('whoami success', async () => {
    let spy = jest
      .spyOn(whoamiSDK, 'whoamiQueryGraphQlSDK')
      .mockImplementation(returnMockData)

    const user = await whoami({
      pat: fakePat,
      gitHubGraphQlUrl: GITHUB_GRAPHQL
    })
    expect(user).toEqual(TEST_DATA_WHOAMI_1)
    spy.mockReset()
  })
})
