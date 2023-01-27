/* eslint no-console: 0 */ // --> OFF
import { getSdk, Sdk } from '../generated/graphql.sdk'
import { GraphQLClient } from 'graphql-request'
import { gitHubGraphQLWhoAmI, gitHubGraphQLOrgReposAg } from './v2/getdata'
import { gitHubGraphQLOrgReposAgExtendedV3 } from './v3/getdata'
import { version } from '../../package.json'

export type QueryType = 'whoami' | 'org_repos' | 'org_repos_extended' | 'status'
export type RunOptionsType = {
  pat: string
  gitHubGraphQlUrl: string
  querytype: QueryType
  orgName?: string
  maxItems?: number
  maxPageSize?: number
  maxDelayForRateLimit?: number
}
export async function run({
  pat,
  gitHubGraphQlUrl,
  querytype,
  orgName,
  maxItems = 1, // -1 means all
  maxPageSize = 10,
  maxDelayForRateLimit = 5000
}: RunOptionsType): Promise<unknown> {
  if (!pat) {
    throw new Error('GitHub Personal Access Token is required')
  }
  if (!gitHubGraphQlUrl) {
    throw new Error('GitHub GraphQL URL is required')
  }
  if (!querytype) {
    throw new Error('querytype is required')
  }

  const sdk: Sdk = getSdk(new GraphQLClient(gitHubGraphQlUrl))
  console.log(`Ready to query`)

  switch (querytype) {
    case 'status':
      return version
    case 'whoami':
      return await gitHubGraphQLWhoAmI(sdk, pat)
    case 'org_repos':
      if (!orgName) {
        throw new Error('Org name is required')
      }
      return await gitHubGraphQLOrgReposAg(
        sdk,
        pat,
        orgName,
        maxItems,
        maxPageSize,
        maxDelayForRateLimit
      )
    case 'org_repos_extended':
      if (!orgName) {
        throw new Error('Org name is required')
      }
      return await gitHubGraphQLOrgReposAgExtendedV3(
        sdk,
        pat,
        orgName,
        maxItems,
        maxPageSize,
        maxDelayForRateLimit
      )
    default:
      throw new Error("Can't determine query type")
  }
}
