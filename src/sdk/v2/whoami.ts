/* eslint no-console: 0 */ // --> OFF
import { IWhoAmIQuery } from '../../generated/graphql.sdk'
import { whoamiQueryGraphQlSDK } from '../utils/queries'
export {
  IWhoAmIQuery,
  IWhoAmIQueryVariables
} from '../../generated/graphql.sdk'

export type whoamiRequiredParameters = {
  pat: string
  gitHubGraphQlUrl: string
}

export async function whoami({
  pat,
  gitHubGraphQlUrl
}: whoamiRequiredParameters): Promise<IWhoAmIQuery> {
  if (!pat) {
    throw new Error('GitHub Personal Access Token is required')
  }
  if (!gitHubGraphQlUrl) {
    throw new Error('GitHub GraphQL URL is required')
  }

  return await whoamiQueryGraphQlSDK(gitHubGraphQlUrl, pat)
}
