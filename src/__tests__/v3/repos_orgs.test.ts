import { beforeAll, describe, expect, test } from '@jest/globals'
import { deepEqual } from 'assert'
import dotenv from 'dotenv'
import { GITHUB_GRAPHQL, TIME_0_SECONDS } from '../../sdk/utils/constants'
import * as reposSDK from '../../sdk/utils/queries'
import { gitHubGraphQLOrgReposAgExtendedV3 } from '../../sdk/v3/repos_orgs'
import { TEST_DAT_ORG_REPO_EXTENDED_ITEM_2 } from '../mockdata/orgrepoag_extended_1_full_data'
import { TEST_DAT_ORG_REPO_EXTENDED_ITEM_2_COLLECTED } from '../mockdata/collected/orgrepoag_extended_1_full_data'
import { IRepoExFragment } from '../../generated/graphql.sdk'
dotenv.config()

describe('org repos extended - not refactored - just over cursors', () => {
  let fakePat: string
  let fakeRawData: any
  let fakeCollected: any

  beforeAll(() => {
    fakePat = '123'
    fakeRawData = TEST_DAT_ORG_REPO_EXTENDED_ITEM_2
    fakeCollected = TEST_DAT_ORG_REPO_EXTENDED_ITEM_2_COLLECTED
  })
  async function returnMockData(): Promise<any> {
    console.log('mock')
    return Promise.resolve(fakeRawData)
  }

  // TBD: test across cursor, and inside of cursor (max items is smaller than cursor)
  test('Org repos in cursor', async () => {
    let spy = jest
      .spyOn(reposSDK, 'orgReposExQueryGraphQlSDK')
      .mockImplementation(returnMockData)

    // These values are based on current mock data
    const numberOfRecordsReturned = 1
    const pageSize = 1
    const rateLimitMs = TIME_0_SECONDS

    // repos will be refactored here
    const reposReturned = await gitHubGraphQLOrgReposAgExtendedV3(
      fakePat,
      GITHUB_GRAPHQL,
      'Azure-Sample',
      numberOfRecordsReturned,
      pageSize,
      rateLimitMs
    )

    expect(Array.isArray(reposReturned)).toBe(true)
    expect(reposReturned.length).toEqual(5)
    expect(JSON.stringify(reposReturned)).toEqual(JSON.stringify(fakeCollected))

    spy.mockReset()
  })
})
