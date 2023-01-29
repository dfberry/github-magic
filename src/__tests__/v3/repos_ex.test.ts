import { GITHUB_GRAPHQL, TIME_0_SECONDS } from '../../sdk/utils/constants'
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test
} from '@jest/globals'
import dotenv from 'dotenv'
import { getSdk } from '../../generated/graphql.sdk'
import { IRepoExRefactored, reposExtended } from '../../sdk/v3/repos_extended'
import { GraphQLClient } from 'graphql-request'
import { TEST_DAT_ORG_REPO_EXTENDED_ITEM_2 } from '../mockdata/orgrepoag_extended_1_full_data'
import { IRepoParameters } from '../../sdk/utils/models'
import * as reposSDK from '../../sdk/utils/queries'
import { REPOS_EXTENDED_PROCESSED } from '../mockdata/processed/repos.ex.1.data'
dotenv.config()

describe('repos extended', () => {
  let fakePat: string

  beforeAll(() => {
    fakePat = '123'
  })
  async function returnMockData(): Promise<any> {
    console.log('mock')
    return Promise.resolve(TEST_DAT_ORG_REPO_EXTENDED_ITEM_2)
  }

  test('Repos extended success', async () => {
    let spy = jest
      .spyOn(reposSDK, 'reposExQueryGraphQlSDK')
      .mockImplementation(returnMockData)

    // These values are based on current mock data
    const numberOfRecordsReturned = 1
    const pageSize = 1
    const rateLimitMs = TIME_0_SECONDS

    const reposReturned = await reposExtended({
      pat: fakePat,
      gitHubGraphQLUrl: GITHUB_GRAPHQL,
      orgName: 'Azure-Sample',
      maxItems: numberOfRecordsReturned,
      maxPageSize: pageSize,
      maxDelayForRateLimit: rateLimitMs
    })
    expect(Array.isArray(reposReturned)).toBe(true)
    expect(reposReturned.length).toEqual(1)

    expect(JSON.stringify(reposReturned)).toEqual(
      JSON.stringify(REPOS_EXTENDED_PROCESSED)
    )

    spy.mockReset()
  })
})
