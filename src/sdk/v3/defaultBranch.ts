/* eslint no-console: 0 */ // --> OFF
import { defaultBranchQueryGraphQlSDK } from '../utils/queries'

import {
  IGetDefaultBranchInRepoQueryVariables,
  IGetDefaultBranchInRepoQuery
} from '../../generated/graphql.sdk'

// Re-export
// TBD: Why are these private in the SDK?
export { IGetDefaultBranchInRepoQueryVariables, IGetDefaultBranchInRepoQuery }

export type defaultBranchRequiredParameters = {
  pat: string
  gitHubGraphQlUrl: string
  owner: string
  repo: string
}
export async function defaultBranch({
  pat,
  gitHubGraphQlUrl,
  owner,
  repo
}: defaultBranchRequiredParameters): Promise<IGetDefaultBranchInRepoQuery> {
  if (!pat) {
    throw new Error('GitHub Personal Access Token is required')
  }
  if (!gitHubGraphQlUrl) {
    throw new Error('GitHub GraphQL URL is required')
  }
  if (!owner) {
    throw new Error('owner is required')
  }
  if (!repo) {
    throw new Error('repo is required')
  }

  const variables: IGetDefaultBranchInRepoQueryVariables = { owner, repo }

  return await defaultBranchQueryGraphQlSDK(gitHubGraphQlUrl, pat, variables)
}
