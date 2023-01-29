/* eslint no-console: 0 */ // --> OFF
import {
  Maybe,
  IStatus,
  ICommit,
  IRepoExFragment,
  IOrgReposAgExtended_V3QueryVariables
} from '../../generated/graphql.sdk'
import { waitfor } from '../utils/utils'
import { reposExQueryGraphQlSDK } from '../utils/queries'
import { IRepoParameters } from '../utils/models'

export type IRepoExRefactored = {
  id: string
  url: string
  descriptionHTML: string
  updatedAt: string
  repositoryName: string
  stargazers: { totalCount: number }
  forks: { totalCount: number }
  issues: { totalCount: number }
  pullRequests: { totalCount: number }
  openPrs: { totalCount: number }
  lastPr: {
    title: string
    isDraft: boolean
    url: string
    state: string
    number: string | number | undefined
    mergedAt?: string | null | undefined
    closedAt?: string | null | undefined
    createdAt: string
  }
  lastIssue: {
    id: string
    title: string
    url: string | null | undefined
    number: string | number | undefined
    state: string
    createdAt: string
    closedAt?: string | null | undefined
    lastEditedAt?: string | null | undefined
  }
  lastPushToDefaultBranch?: {
    name: string
    message: string | null | undefined
    pushedDate?: string | null | undefined
    committedDate: string | null | undefined
    status?: Maybe<IStatus>
  }
}

// interface Historyable {
//   history: Object
// }
// function hasHistory<T extends { history?: Object }>(
//   obj: T
// ): obj is T & Historyable {
//   return typeof obj.history === 'object'
// }
export type IRepoExResult = {
  name: string | null | unknown
  message: string | null | unknown
  pushedDate: string | null | unknown
  committedDate: string | null | unknown
  status: string | null | unknown
}

function shouldGetNextPage(
  currentRowCount: number,
  maxRowCount: number,
  currentNextPageCursor: boolean,
  nextCursor: string | null | undefined
): boolean {
  if (
    maxRowCount === -1 || // get all rows
    (nextCursor &&
      currentRowCount < maxRowCount &&
      currentNextPageCursor !== undefined &&
      currentNextPageCursor === true)
  ) {
    return true
  } else {
    return false
  }
}
function getNextCursor(
  nextCursor: string | null | undefined
): string | undefined {
  if (nextCursor !== undefined && nextCursor !== null) {
    return nextCursor
  } else {
    undefined
  }
}

export async function reposExtended({
  pat,
  gitHubGraphQLUrl,
  orgName,
  maxItems = 1,
  maxPageSize = 1,
  maxDelayForRateLimit = 5000
}: IRepoParameters): Promise<unknown[]> {
  if (!pat) {
    throw new Error('GitHub Personal Access Token is required')
  }
  if (!gitHubGraphQLUrl) {
    throw new Error('GitHub GraphQL URL is required')
  }
  if (!orgName) {
    throw new Error('orgName is required')
  }
  return await gitHubGraphQLOrgReposAgExtendedV3(
    pat,
    gitHubGraphQLUrl,
    orgName,
    maxItems,
    maxPageSize,
    maxDelayForRateLimit
  )
}

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
): Promise<IRepoExRefactored[]> {
  if (!gitHubGraphQLUrl)
    throw new Error('gitHubGraphQLOrgRepos::missing gitHubGraphQLUrl')
  if (!pat) throw new Error('gitHubGraphQLOrgRepos::missing pat')
  if (!org_name) throw new Error('gitHubGraphQLOrgRepos::missing org_name')

  const variables: IOrgReposAgExtended_V3QueryVariables = {
    organization: org_name,
    pageSize: page_size,
    after: null
  }

  let hasNextPage = false
  let currentData = 0
  const reposList: IRepoExFragment[] = []
  const reposRefactored: IRepoExRefactored[] = []

  do {
    // Adjust page size to return correct number
    // if (currentData + page_size > max_data) {
    //   variables.pageSize = max_data - currentData
    // }

    const data = await reposExQueryGraphQlSDK(gitHubGraphQLUrl, pat, variables)

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

      // Collect enough data?
      currentData += reposExtendedDirty.length
      hasNextPage = shouldGetNextPage(
        currentData,
        max_data,
        data.organization?.repositories.pageInfo.hasNextPage,
        data?.organization?.repositories?.pageInfo?.endCursor
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

  // reformulate extended properties
  reposList.map((repo: IRepoExFragment) => {
    const lastCommitTarget = repo.lastPushToDefaultBranch?.target
    // @ts-ignore
    const commit: ICommit = lastCommitTarget.history.edges[0].node

    // TBD: fix this
    reposRefactored.push({
      id: repo.id,
      url: repo.url,
      descriptionHTML: repo.descriptionHTML,
      updatedAt: repo.updatedAt,
      repositoryName: repo.repositoryName,
      stargazers: repo.stargazers,
      forks: repo.forks,
      issues: repo.issues,
      pullRequests: repo.pullRequests,
      openPrs: repo.openPrs,
      lastPr: {
        title:
          repo.lastPr.nodes && repo.lastPr.nodes.length > 0
            ? (repo.lastPr.nodes[0]?.title as string)
            : '',
        isDraft:
          repo.lastPr.nodes && repo.lastPr.nodes.length > 0
            ? (repo.lastPr.nodes[0]?.isDraft as boolean)
            : false,
        url:
          repo.lastPr.nodes && repo.lastPr.nodes.length > 0
            ? (repo.lastPr.nodes[0]?.url as string)
            : '',
        state:
          repo.lastPr.nodes && repo.lastPr.nodes.length > 0
            ? (repo.lastPr.nodes[0]?.state as string)
            : '',
        number:
          repo.lastPr.nodes && repo.lastPr.nodes.length > 0
            ? repo.lastPr.nodes[0]?.number
            : '',
        mergedAt:
          repo.lastPr.nodes && repo.lastPr.nodes.length > 0
            ? repo.lastPr.nodes[0]?.mergedAt
            : '',
        closedAt:
          repo.lastPr.nodes && repo.lastPr.nodes.length > 0
            ? repo.lastPr.nodes[0]?.closedAt
            : '',
        createdAt:
          repo.lastPr.nodes && repo.lastPr.nodes.length > 0
            ? repo.lastPr.nodes[0]?.createdAt
            : ''
      },
      lastIssue: {
        id:
          repo.lastIssue.edges && repo.lastIssue.edges.length > 0
            ? (repo.lastIssue.edges[0]?.node?.id as string)
            : '',
        title:
          repo.lastIssue.edges && repo.lastIssue.edges.length > 0
            ? (repo.lastIssue.edges[0]?.node?.title as string)
            : '',
        url:
          repo.lastIssue.edges && repo.lastIssue.edges.length > 0
            ? (repo.lastIssue.edges[0]?.node?.url as string)
            : '',
        number:
          repo.lastIssue.edges && repo.lastIssue.edges.length > 0
            ? repo.lastIssue.edges[0]?.node?.number
            : '',
        state:
          repo.lastIssue.edges && repo.lastIssue.edges.length > 0
            ? (repo.lastIssue.edges[0]?.node?.state as string)
            : '',
        createdAt:
          repo.lastIssue.edges && repo.lastIssue.edges.length > 0
            ? (repo.lastIssue.edges[0]?.node?.state as string)
            : '',
        closedAt:
          repo.lastIssue.edges && repo.lastIssue.edges.length > 0
            ? (repo.lastIssue.edges[0]?.node?.closedAt as string)
            : '',
        lastEditedAt:
          repo.lastIssue.edges && repo.lastIssue.edges.length > 0
            ? (repo.lastIssue.edges[0]?.node?.lastEditedAt as string)
            : ''
      },
      lastPushToDefaultBranch: {
        name: repo.lastPushToDefaultBranch?.name as string,
        message: commit.message,
        pushedDate: commit.pushedDate,
        committedDate: commit.committedDate,
        status: commit.status
      }
    })
  })

  return reposRefactored
}
