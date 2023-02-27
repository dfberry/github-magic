/* eslint no-console: 0 */ // --> OFF
import { IRepoExRefactored, IRepoParameters } from '../utils/types.repos'

import { gitHubGraphQLOrgReposAgExtendedV3 } from './repos_orgs'
import { gitHubGraphQLUserReposAgExtendedV3 } from './repos_user'
import {
  ILanguageConnection,
  IRepoExFragment
} from '../../generated/graphql.sdk'
import { languagesRefactor } from '../utils/refactor'

export async function reposExtended({
  pat,
  gitHubGraphQLUrl,
  orgName,
  maxItems = 1,
  maxPageSize = 1,
  maxDelayForRateLimit = 5000,
  repoOwnerType = 'organization'
}: IRepoParameters): Promise<IRepoExRefactored[]> {
  if (!pat) {
    throw new Error('GitHub Personal Access Token is required')
  }
  if (!gitHubGraphQLUrl) {
    throw new Error('GitHub GraphQL URL is required')
  }

  let reposList = []
  console.log(`Find ${repoOwnerType} repos for ${orgName}`)

  if (repoOwnerType === 'organization') {
    if (!orgName) {
      throw new Error('orgName is required')
    }

    reposList = await gitHubGraphQLOrgReposAgExtendedV3(
      pat,
      gitHubGraphQLUrl,
      orgName,
      maxItems,
      maxPageSize,
      maxDelayForRateLimit
    )
  } else {
    if (!orgName) {
      throw new Error("orgName param, as user's account name, is required")
    }

    reposList = await gitHubGraphQLUserReposAgExtendedV3(
      pat,
      gitHubGraphQLUrl,
      orgName,
      maxItems,
      maxPageSize,
      maxDelayForRateLimit
    )
  }

  const refactoredReposList = reformulateRepos(reposList)

  return refactoredReposList
}

export function reformulateRepos(
  reposList: IRepoExFragment[]
): IRepoExRefactored[] {
  const reposRefactored: IRepoExRefactored[] = []

  // reformulate extended properties
  reposList.map((repo: IRepoExFragment) => {
    const lastCommitTarget = repo.lastPushToDefaultBranch?.target
    let commit

    if (
      lastCommitTarget !== null &&
      lastCommitTarget !== undefined &&
      'history' in lastCommitTarget
    ) {
      const history = lastCommitTarget.history

      if (
        history?.edges !== null &&
        history?.edges !== undefined &&
        history?.edges.length > 0
      ) {
        const node = history?.edges[0]?.node
        commit = node
      }
    }

    // Languages
    const refactoredLanguages = repo?.languages
      ? languagesRefactor(
          repo?.languages as ILanguageConnection,
          repo?.primaryLanguage?.name as string
        )
      : []

    // TBD: fix this
    reposRefactored.push({
      id: repo.id,
      url: repo.url,
      descriptionHTML: repo.descriptionHTML,
      updatedAt: repo.updatedAt,
      diskUsage: repo.diskUsage as number,
      repositoryName: repo.repositoryName,
      primaryLanguage: repo.primaryLanguage?.name as string,
      languages: refactoredLanguages,
      legal: {
        license: repo.licenseInfo?.name as string
      },
      is: {
        isArchived: repo.isArchived,
        isEmpty: repo.isEmpty,
        isPrivate: repo.isPrivate,
        isTemplate: repo.isTemplate,
        isSecurityPolicyEnabled: repo.isSecurityPolicyEnabled,
        isDisabled: repo.isDisabled
      },
      has: {
        hasWikiEnabled: repo.hasWikiEnabled
      },
      date: {
        createdAt: repo.createdAt,
        updatedAt: repo.updatedAt,
        pushedAt: repo.pushedAt
      },
      watchers: repo.watchers,
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
        message: commit?.message,
        pushedDate: commit?.pushedDate,
        committedDate: commit?.committedDate,
        status: commit?.status?.state as string
      }
    })
  })

  return reposRefactored
}
