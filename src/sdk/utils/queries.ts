import { GraphQLClient } from 'graphql-request'
import {
  IOrgReposAgExtended_V3Query,
  IOrgReposAgExtended_V3QueryVariables,
  IOrgReposAg_V2Query,
  IOrgReposAg_V2QueryVariables,
  IWhoAmIQuery,
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
