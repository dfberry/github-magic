/* eslint no-console: 0 */ // --> OFF
import {
  IOrgReposAgExtended_V3QueryVariables,
  IRepoExFragment
} from '../../generated/graphql.sdk'
import { reposExQueryGraphQlSDK } from '../utils/queries'
import { getNextCursor, shouldGetNextPage } from '../utils/repos'
import { waitfor } from '../utils/utils'

/**
 * Org Repos extended (last commit, pr, issue)
 * @param sdk
 * @param pat
 * @param org_name such as 'Azure-samples'
 * @max_data how many repos to return, -1 means all
 * @page_size 100 items max for GiHub
 * @rate_limit_ms impose rate limit for query
 * @returns
 */
export async function gitHubGraphQLOrgReposAgExtendedV3(
  pat: string,
  gitHubGraphQLUrl: string,
  org_name: string,
  max_data: number, // Number of repos to return in total, -1 means all data
  page_size: number, // Max page size for GitHub
  rate_limit_ms: number
): Promise<IRepoExFragment[]> {
  if (!gitHubGraphQLUrl)
    throw new Error('gitHubGraphQLOrgRepos::missing gitHubGraphQLUrl')
  if (!pat) throw new Error('gitHubGraphQLOrgRepos::missing pat')
  if (!org_name) throw new Error('gitHubGraphQLOrgRepos::missing org_name')

  const variables: IOrgReposAgExtended_V3QueryVariables = {
    organization: org_name,
    pageSize: page_size,
    after: null
  }
  console.log(`created variables`)

  let hasNextPage = false
  let currentData = 0
  let currentPage = 0
  const reposList: IRepoExFragment[] = []

  do {
    // Adjust page size to return correct number
    // if (currentData + page_size > max_data) {
    //   variables.pageSize = max_data - currentData
    // }

    console.log(`requesting data`)
    console.log(`gitHubGraphQLUrl ${gitHubGraphQLUrl}`)
    console.log(`pat ${pat}`)
    console.log(`variables ${JSON.stringify(variables)}`)
    const data = await reposExQueryGraphQlSDK(gitHubGraphQLUrl, pat, variables)
    console.log(`data returned`)
    currentPage += 1

    // Get repos
    if (data?.organization?.repositories?.edges) {
      const reposExtendedDirty = data?.organization.repositories.edges.map(
        (edge) => edge?.node as IRepoExFragment
      )
      reposList.push(...reposExtendedDirty)

      // Manage cursor for next page
      variables.after = getNextCursor(
        data?.organization?.repositories?.pageInfo?.endCursor
      )
      currentData += reposExtendedDirty.length
      if (variables.after === undefined) {
        console.log(
          `totalitems: ${currentData}, page: ${currentPage}, hasNextPage: ${hasNextPage}, cursor- === undefined`
        )
        break
      }
      if (max_data !== -1 && currentData > max_data) {
        console.log(
          `totalitems: ${currentData}, page: ${currentPage}, hasNextPage: ${hasNextPage}, max_data reached`
        )
        break
      }

      // Collect enough data?
      hasNextPage = shouldGetNextPage(
        currentData,
        max_data,
        data.organization?.repositories.pageInfo.hasNextPage,
        data?.organization?.repositories?.pageInfo?.endCursor
      )
      console.log(
        `totalitems: ${currentData}, page: ${currentPage}, hasNextPage: ${hasNextPage}, cursor: ${variables.after}`
      )

      // rate limit - TBD: Fix this
      if (hasNextPage && rate_limit_ms > 0) {
        console.log(`waiting ${rate_limit_ms}`)
        await waitfor(rate_limit_ms)
      }
    } else {
      console.log(`edges not returned`)
    }
  } while (hasNextPage)

  console.log(`paging finished`)
  return reposList
}
