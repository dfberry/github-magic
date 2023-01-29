/* eslint no-console: 0 */ // --> OFF
import {
  IRepoFragment,
  IOrgReposAg_V2QueryVariables,
  IOrgReposAg_V2Query
} from '../../generated/graphql.sdk'

import { waitfor } from '../utils/utils'
import { reposQueryGraphQlSDK } from '../utils/queries'
import { IRepoParameters } from '../utils/models'

export { IRepoFragment } from '../../generated/graphql.sdk'

export async function repos({
  pat,
  gitHubGraphQLUrl,
  orgName,
  maxItems = 1,
  maxPageSize = 1,
  maxDelayForRateLimit = 5000
}: IRepoParameters): Promise<IRepoFragment[]> {
  if (!pat) {
    throw new Error('GitHub Personal Access Token is required')
  }
  if (!gitHubGraphQLUrl) {
    throw new Error('GitHub GraphQL URL is required')
  }
  if (!orgName) {
    throw new Error('orgName is required')
  }

  return await gitHubGraphQLOrgReposAg(
    pat,
    gitHubGraphQLUrl,
    orgName,
    maxItems,
    maxPageSize,
    maxDelayForRateLimit
  )
}

async function gitHubGraphQLOrgReposAg(
  pat: string,
  gitHubGraphQLUrl: string,
  org_name: string,
  max_data: number, // Number of repos to return in total, -1 means all data
  page_size: number, // Max page size for GitHub
  rate_limit_ms: number
): Promise<IRepoFragment[]> {
  if (!gitHubGraphQLUrl)
    throw new Error('gitHubGraphQLOrgRepos::missing gitHubGraphQLUrl')
  if (!pat) throw new Error('gitHubGraphQLOrgRepos::missing pat')
  if (!org_name) throw new Error('gitHubGraphQLOrgRepos::missing org_name')

  const variables: IOrgReposAg_V2QueryVariables = {
    organization: org_name,
    pageSize: page_size,
    after: null
  }

  let hasNextPage = true
  const reposList: IRepoFragment[] = []

  do {
    // Adjust page size to return correct number
    // if (currentData + page_size > max_data) {
    //   variables.pageSize = max_data - currentData
    // }

    const data: IOrgReposAg_V2Query = await reposQueryGraphQlSDK(
      gitHubGraphQLUrl,
      pat,
      variables
    )

    // Get repos
    if (data?.organization?.repositories?.edges) {
      const flattenEdge = data?.organization.repositories.edges.map(
        (edge) => edge?.node as IRepoFragment
      )
      reposList.push(...flattenEdge)

      // Manage cursor for next page
      hasNextPage =
        data.organization?.repositories.pageInfo.hasNextPage !== undefined
          ? data.organization?.repositories.pageInfo.hasNextPage
          : false
      variables.after =
        data?.organization?.repositories?.pageInfo?.endCursor !== undefined &&
        data?.organization?.repositories?.pageInfo?.endCursor !== null
          ? data?.organization?.repositories?.pageInfo?.endCursor
          : undefined

      // rate limit - TBD: Fix this
      if (hasNextPage && rate_limit_ms > 0) {
        await waitfor(rate_limit_ms)
      }
    } else {
      console.log(`edges not returned`)
    }
  } while (hasNextPage)
  return reposList
}
