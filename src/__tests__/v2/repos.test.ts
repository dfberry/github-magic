import { beforeAll, describe, expect, test } from '@jest/globals'
import dotenv from 'dotenv'
import { GITHUB_GRAPHQL, TIME_0_SECONDS } from '../../sdk/utils/constants'

import { repos } from '../../sdk/v2/repos'

import * as reposSDK from '../../sdk/utils/queries'
import { TEST_DAT_ORG_REPO_ITEM_1 } from '../mockdata/orgrepoag.data'

dotenv.config()

describe('repos', () => {
  let fakePat: string

  beforeAll(() => {
    fakePat = '123'
  })

  async function returnMockData(): Promise<any> {
    console.log('mock')
    return Promise.resolve(TEST_DAT_ORG_REPO_ITEM_1)
  }

  test('Repos success', async () => {
    let spy = jest
      .spyOn(reposSDK, 'reposQueryGraphQlSDK')
      .mockImplementation(returnMockData)

    // These values are based on current mock data
    const numberOfRecordsReturned = 2 // crosses a page
    const pageSize = 2
    const rateLimitMs = TIME_0_SECONDS

    const reposReturned = await repos({
      pat: fakePat,
      gitHubGraphQLUrl: GITHUB_GRAPHQL,
      orgName: 'Azure-Sample',
      maxItems: numberOfRecordsReturned,
      maxPageSize: pageSize,
      maxDelayForRateLimit: rateLimitMs,
      repoOwnerType: 'organization'
    })

    expect(Array.isArray(reposReturned)).toBe(true)
    expect(reposReturned.length).toEqual(100)

    expect(JSON.stringify(reposReturned[0])).toEqual(
      JSON.stringify(
        TEST_DAT_ORG_REPO_ITEM_1.organization.repositories.edges[0].node
      )
    )
    spy.mockReset()
  })
})
