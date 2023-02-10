import { GraphQLClient } from 'graphql-request'
import {
  IOrgReposAgExtended_V3Query,
  IOrgReposAgExtended_V3QueryVariables,
  IOrgReposAg_V2Query,
  IOrgReposAg_V2QueryVariables,
  IWhoAmIQuery,
  IGetDefaultBranchInRepoQuery,
  IGetDefaultBranchInRepoQueryVariables,
  IGetLastCommitInRepoQuery,
  IGetLastCommitInRepoQueryVariables,
  IGetLastIssueInRepoQuery,
  IGetLastIssueInRepoQueryVariables,
  IGetLastPrInRepoQuery,
  IGetLastPrInRepoQueryVariables,
  Sdk,
  getSdk
} from '../../generated/graphql.sdk'

export type GraphQLResult = { __typename: string }
export type ValueOfTypename<T extends GraphQLResult> = T['__typename']
export function isType<
  Result extends GraphQLResult,
  Typename extends ValueOfTypename<Result>
>(
  result: Result,
  typename: Typename
): result is Extract<Result, { __typename: Typename }> {
  return result?.__typename === typename
}

export async function whoamiQueryGraphQlSDK(
  gitHubGraphQlUrl: string,
  pat: string
): Promise<IWhoAmIQuery> {
  const sdk: Sdk = getSdk(new GraphQLClient(gitHubGraphQlUrl))
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${pat}`
  }
  return await sdk.WhoAmI(undefined, requestHeaders)
}

export async function reposQueryGraphQlSDK(
  gitHubGraphQlUrl: string,
  pat: string,
  variables: IOrgReposAg_V2QueryVariables
): Promise<IOrgReposAg_V2Query> {
  const sdk: Sdk = getSdk(new GraphQLClient(gitHubGraphQlUrl))
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${pat}`
  }

  return await sdk.OrgReposAg_v2(variables, requestHeaders)
}

export async function reposExQueryGraphQlSDK(
  gitHubGraphQlUrl: string,
  pat: string,
  variables: IOrgReposAgExtended_V3QueryVariables
): Promise<IOrgReposAgExtended_V3Query> {
  const sdk: Sdk = getSdk(new GraphQLClient(gitHubGraphQlUrl))
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${pat}`
  }

  return await sdk.OrgReposAgExtended_v3(variables, requestHeaders)
}

export async function defaultBranchQueryGraphQlSDK(
  gitHubGraphQlUrl: string,
  pat: string,
  variables: IGetDefaultBranchInRepoQueryVariables
): Promise<IGetDefaultBranchInRepoQuery> {
  const sdk: Sdk = getSdk(new GraphQLClient(gitHubGraphQlUrl))
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${pat}`
  }

  return await sdk.GetDefaultBranchInRepo(variables, requestHeaders)
}

export async function lastCommitQueryGraphQlSDK(
  gitHubGraphQlUrl: string,
  pat: string,
  variables: IGetLastCommitInRepoQueryVariables
): Promise<IGetLastCommitInRepoQuery> {
  const sdk: Sdk = getSdk(new GraphQLClient(gitHubGraphQlUrl))
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${pat}`
  }

  return await sdk.GetLastCommitInRepo(variables, requestHeaders)
}
export async function lastIssueQueryGraphQlSDK(
  gitHubGraphQlUrl: string,
  pat: string,
  variables: IGetLastIssueInRepoQueryVariables
): Promise<IGetLastIssueInRepoQuery> {
  const sdk: Sdk = getSdk(new GraphQLClient(gitHubGraphQlUrl))
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${pat}`
  }

  return await sdk.GetLastIssueInRepo(variables, requestHeaders)
}

export async function lastPrQueryGraphQlSDK(
  gitHubGraphQlUrl: string,
  pat: string,
  variables: IGetLastPrInRepoQueryVariables
): Promise<IGetLastPrInRepoQuery> {
  const sdk: Sdk = getSdk(new GraphQLClient(gitHubGraphQlUrl))
  const requestHeaders = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${pat}`
  }

  return await sdk.GetLastPrInRepo(variables, requestHeaders)
}
