import { beforeAll, describe, expect, test } from '@jest/globals'
import { deepEqual } from 'assert'
import dotenv from 'dotenv'
import { GITHUB_GRAPHQL, TIME_0_SECONDS } from '../../sdk/utils/constants'
import * as reposSDK from '../../sdk/utils/queries'
import { reposExtended } from '../../sdk/v3/repos_extended'
import { TEST_DAT_ORG_REPO_EXTENDED_ITEM_2 } from '../mockdata/orgrepoag_extended_1_full_data'
import { REPOS_EXTENDED_PROCESSED } from '../mockdata/processed/repos.ex.1.data'

dotenv.config()

describe('repos extended for orgs', () => {
  let fakePat: string
  let fakeRawData: any
  let fakeProcessedData: any

  beforeAll(() => {
    fakePat = '123'
    fakeRawData = TEST_DAT_ORG_REPO_EXTENDED_ITEM_2
    fakeProcessedData = REPOS_EXTENDED_PROCESSED
  })
  async function returnMockData(): Promise<any> {
    console.log('mock')
    return Promise.resolve(fakeRawData)
  }

  test('Repos extended success', async () => {
    let spy = jest
      .spyOn(reposSDK, 'orgReposExQueryGraphQlSDK')
      .mockImplementation(returnMockData)

    // These values are based on current mock data
    const numberOfRecordsReturned = 1
    const pageSize = 1
    const rateLimitMs = TIME_0_SECONDS

    // repos will be refactored here
    const reposReturned = await reposExtended({
      pat: fakePat,
      gitHubGraphQLUrl: GITHUB_GRAPHQL,
      orgName: 'Azure-Sample',
      maxItems: numberOfRecordsReturned,
      maxPageSize: pageSize,
      maxDelayForRateLimit: rateLimitMs,
      repoOwnerType: 'organization'
    })

    expect(Array.isArray(reposReturned)).toBe(true)
    expect(reposReturned.length).toEqual(5)
    expect(JSON.stringify(reposReturned)).toEqual(
      JSON.stringify(REPOS_EXTENDED_PROCESSED)
    )

    spy.mockReset()
  })
})
