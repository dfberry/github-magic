/* eslint no-console: 0 */ // --> OFF
import {
  MyRepoFieldsFragment,
  OrgReposAg_V2QueryVariables,
  Sdk
} from '../../generated/graphql.sdk'
import { waitfor } from '../utils/utils'
export async function gitHubGraphQLWhoAmI(
  sdk: Sdk,
  personal_access_token: string
): Promise<unknown> {
  if (!personal_access_token)
    throw new Error('gitHubGraphQLWhoAmI::missing pat')
  const variables = undefined
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${personal_access_token}`
  }
  const data = await sdk.WhoAmI(variables, requestHeaders)
  return data
}

export async function gitHubGraphQLOrgReposAg(
  sdk: Sdk,
  personal_access_token: string,
  org_name: string,
  max_data: number, // Number of repos to return in total, -1 means all data
  page_size: number, // Max page size for GitHub
  rate_limit_ms: number
): Promise<MyRepoFieldsFragment[]> {
  if (!personal_access_token)
    throw new Error('gitHubGraphQLOrgRepos::missing pat')
  const variables: OrgReposAg_V2QueryVariables = {
    organization: org_name,
    pageSize: page_size,
    after: null
  }
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${personal_access_token}`
  }

  let hasNextPage = true
  const repos: MyRepoFieldsFragment[] = []

  do {
    console.log(`variables = ${JSON.stringify(variables)}`)

    // Adjust page size to return correct number
    // if (currentData + page_size > max_data) {
    //   variables.pageSize = max_data - currentData
    // }

    const data = await sdk.OrgReposAg_v2(variables, requestHeaders)

    // Get repos
    if (data?.organization?.repositories?.edges) {
      const flattenEdge = data?.organization.repositories.edges.map(
        (edge) => edge?.node as MyRepoFieldsFragment
      )
      repos.push(...flattenEdge)

      // Manage cursor for next page
      hasNextPage =
        data.organization?.repositories.pageInfo.hasNextPage !== undefined
          ? data.organization?.repositories.pageInfo.hasNextPage
          : false
      console.log(`hasNextPage ${hasNextPage}`)
      variables.after =
        data?.organization?.repositories?.pageInfo?.endCursor !== undefined &&
        data?.organization?.repositories?.pageInfo?.endCursor !== null
          ? data?.organization?.repositories?.pageInfo?.endCursor
          : undefined

      // rate limit - TBD: Fix this
      if (hasNextPage && rate_limit_ms > 0) {
        console.log(`waiting ${rate_limit_ms}`)
        await waitfor(rate_limit_ms)
      }
    } else {
      console.log(`edges not returned`)
    }
  } while (hasNextPage)
  return repos
}
