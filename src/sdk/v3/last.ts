/* eslint no-console: 0 */ // --> OFF
import {
  lastCommitQueryGraphQlSDK,
  lastIssueQueryGraphQlSDK,
  lastPrQueryGraphQlSDK
} from '../utils/queries'

import {
  IGetLastCommitInRepoQuery,
  IGetLastCommitInRepoQueryVariables,
  IGetLastIssueInRepoQuery,
  IGetLastIssueInRepoQueryVariables,
  IGetLastPrInRepoQuery,
  IGetLastPrInRepoQueryVariables
} from '../../generated/graphql.sdk'

// Re-export
// TBD: Why are these private in the SDK?
export {
  IGetLastCommitInRepoQuery,
  IGetLastCommitInRepoQueryVariables,
  IGetLastIssueInRepoQuery,
  IGetLastIssueInRepoQueryVariables,
  IGetLastPrInRepoQuery,
  IGetLastPrInRepoQueryVariables
}

export type lastCommitRequiredParameters = {
  pat: string
  gitHubGraphQlUrl: string
  owner: string
  repo: string
  branch: string
}

export async function lastCommit({
  pat,
  gitHubGraphQlUrl,
  owner,
  repo,
  branch
}: lastCommitRequiredParameters): Promise<IGetLastCommitInRepoQuery> {
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
  if (!branch) {
    throw new Error('branch is required')
  }

  const variables: IGetLastCommitInRepoQueryVariables = { owner, repo, branch }

  return await lastCommitQueryGraphQlSDK(gitHubGraphQlUrl, pat, variables)
}

export type lastIssueRequiredParameters = {
  pat: string
  gitHubGraphQlUrl: string
  owner: string
  repo: string
  pageSize: number
  after: string
}

export async function lastIssue({
  pat,
  gitHubGraphQlUrl,
  owner,
  repo,
  pageSize,
  after
}: lastIssueRequiredParameters): Promise<IGetLastIssueInRepoQuery> {
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
  if (!pageSize) {
    throw new Error('branch is required')
  }

  const variables: IGetLastIssueInRepoQueryVariables = {
    owner,
    repo,
    pageSize,
    after
  }

  return await lastIssueQueryGraphQlSDK(gitHubGraphQlUrl, pat, variables)
}

export type lastPrRequiredParameters = {
  pat: string
  gitHubGraphQlUrl: string
  owner: string
  repo: string
}

export async function lastPr({
  pat,
  gitHubGraphQlUrl,
  owner,
  repo
}: lastPrRequiredParameters): Promise<IGetLastPrInRepoQuery> {
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

  const variables: IGetLastPrInRepoQueryVariables = {
    owner,
    repo
  }

  return await lastPrQueryGraphQlSDK(gitHubGraphQlUrl, pat, variables)
}
