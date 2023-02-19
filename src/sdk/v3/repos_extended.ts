/* eslint no-console: 0 */ // --> OFF
import { IRepoExRefactored, IRepoParameters } from '../utils/types.repos'

import { gitHubGraphQLOrgReposAgExtendedV3 } from './repos_orgs'

export async function reposExtended({
  pat,
  gitHubGraphQLUrl,
  orgName,
  maxItems = 1,
  maxPageSize = 1,
  maxDelayForRateLimit = 5000
}: IRepoParameters): Promise<IRepoExRefactored[]> {
  if (!pat) {
    throw new Error('GitHub Personal Access Token is required')
  }
  if (!gitHubGraphQLUrl) {
    throw new Error('GitHub GraphQL URL is required')
  }
  if (!orgName) {
    throw new Error('orgName is required')
  }
  console.log(`found params`)
  return await gitHubGraphQLOrgReposAgExtendedV3(
    pat,
    gitHubGraphQLUrl,
    orgName,
    maxItems,
    maxPageSize,
    maxDelayForRateLimit
  )
}

// /**
//  * Org Repos extended (last commit, pr, issue)
//  * @param sdk
//  * @param pat
//  * @param org_name such as 'Azure-samples'
//  * @max_data how many repos to return, -1 means all
//  * @page_size 100 items max for GiHub
//  * @rate_limit_ms impose rate limit for query
//  * @returns
//  */
// export async function gitHubGraphQLOrgReposAgExtendedV3(
//   pat: string,
//   gitHubGraphQLUrl: string,
//   org_name: string,
//   max_data: number, // Number of repos to return in total, -1 means all data
//   page_size: number, // Max page size for GitHub
//   rate_limit_ms: number
// ): Promise<IRepoExRefactored[]> {
//   if (!gitHubGraphQLUrl)
//     throw new Error('gitHubGraphQLOrgRepos::missing gitHubGraphQLUrl')
//   if (!pat) throw new Error('gitHubGraphQLOrgRepos::missing pat')
//   if (!org_name) throw new Error('gitHubGraphQLOrgRepos::missing org_name')

//   const variables: IOrgReposAgExtended_V3QueryVariables = {
//     organization: org_name,
//     pageSize: page_size,
//     after: null
//   }
//   console.log(`created variables`)

//   let hasNextPage = false
//   let currentData = 0
//   let currentPage = 0
//   const reposList: IRepoExFragment[] = []
//   const reposRefactored: IRepoExRefactored[] = []

//   do {
//     // Adjust page size to return correct number
//     // if (currentData + page_size > max_data) {
//     //   variables.pageSize = max_data - currentData
//     // }

//     console.log(`requesting data`)
//     console.log(`gitHubGraphQLUrl ${gitHubGraphQLUrl}`)
//     console.log(`pat ${pat}`)
//     console.log(`variables ${JSON.stringify(variables)}`)
//     const data = await reposExQueryGraphQlSDK(gitHubGraphQLUrl, pat, variables)
//     console.log(`data returned`)
//     currentPage += 1

//     // Get repos
//     if (data?.organization?.repositories?.edges) {
//       const reposExtendedDirty = data?.organization.repositories.edges.map(
//         (edge) => edge?.node as IRepoExFragment
//       )
//       reposList.push(...reposExtendedDirty)

//       // Manage cursor for next page
//       variables.after = getNextCursor(
//         data?.organization?.repositories?.pageInfo?.endCursor
//       )
//       currentData += reposExtendedDirty.length
//       if (variables.after === undefined) {
//         console.log(
//           `totalitems: ${currentData}, page: ${currentPage}, hasNextPage: ${hasNextPage}, cursor- === undefined`
//         )
//         break
//       }
//       if (max_data !== -1 && currentData > max_data) {
//         console.log(
//           `totalitems: ${currentData}, page: ${currentPage}, hasNextPage: ${hasNextPage}, max_data reached`
//         )
//         break
//       }

//       // Collect enough data?
//       hasNextPage = shouldGetNextPage(
//         currentData,
//         max_data,
//         data.organization?.repositories.pageInfo.hasNextPage,
//         data?.organization?.repositories?.pageInfo?.endCursor
//       )
//       console.log(
//         `totalitems: ${currentData}, page: ${currentPage}, hasNextPage: ${hasNextPage}, cursor: ${variables.after}`
//       )

//       // rate limit - TBD: Fix this
//       if (hasNextPage && rate_limit_ms > 0) {
//         console.log(`waiting ${rate_limit_ms}`)
//         await waitfor(rate_limit_ms)
//       }
//     } else {
//       console.log(`edges not returned`)
//     }
//   } while (hasNextPage)

//   console.log(`paging finished`)

//   // reformulate extended properties
//   reposList.map((repo: IRepoExFragment) => {
//     const lastCommitTarget = repo.lastPushToDefaultBranch?.target
//     let commit

//     if (
//       lastCommitTarget !== null &&
//       lastCommitTarget !== undefined &&
//       'history' in lastCommitTarget
//     ) {
//       const history = lastCommitTarget.history

//       if (
//         history?.edges !== null &&
//         history?.edges !== undefined &&
//         history?.edges.length > 0
//       ) {
//         const node = history?.edges[0]?.node
//         commit = node
//       }
//     }

//     // Languages
//     const refactoredLanguages = repo?.languages
//       ? languagesRefactor(
//           repo?.languages as ILanguageConnection,
//           repo?.primaryLanguage?.name as string
//         )
//       : []

//     // TBD: fix this
//     reposRefactored.push({
//       id: repo.id,
//       url: repo.url,
//       descriptionHTML: repo.descriptionHTML,
//       updatedAt: repo.updatedAt,
//       diskUsage: repo.diskUsage as number,
//       repositoryName: repo.repositoryName,
//       primaryLanguage: repo.primaryLanguage?.name as string,
//       languages: refactoredLanguages,
//       legal: {
//         license: repo.licenseInfo?.name as string
//       },
//       is: {
//         isArchived: repo.isArchived,
//         isEmpty: repo.isEmpty,
//         isPrivate: repo.isPrivate,
//         isTemplate: repo.isTemplate,
//         isSecurityPolicyEnabled: repo.isSecurityPolicyEnabled,
//         isDisabled: repo.isDisabled
//       },
//       has: {
//         hasWikiEnabled: repo.hasWikiEnabled
//       },
//       date: {
//         createdAt: repo.createdAt,
//         updatedAt: repo.updatedAt,
//         pushedAt: repo.pushedAt
//       },
//       watchers: repo.watchers,
//       stargazers: repo.stargazers,
//       forks: repo.forks,
//       issues: repo.issues,
//       pullRequests: repo.pullRequests,
//       openPrs: repo.openPrs,
//       lastPr: {
//         title:
//           repo.lastPr.nodes && repo.lastPr.nodes.length > 0
//             ? (repo.lastPr.nodes[0]?.title as string)
//             : '',
//         isDraft:
//           repo.lastPr.nodes && repo.lastPr.nodes.length > 0
//             ? (repo.lastPr.nodes[0]?.isDraft as boolean)
//             : false,
//         url:
//           repo.lastPr.nodes && repo.lastPr.nodes.length > 0
//             ? (repo.lastPr.nodes[0]?.url as string)
//             : '',
//         state:
//           repo.lastPr.nodes && repo.lastPr.nodes.length > 0
//             ? (repo.lastPr.nodes[0]?.state as string)
//             : '',
//         number:
//           repo.lastPr.nodes && repo.lastPr.nodes.length > 0
//             ? repo.lastPr.nodes[0]?.number
//             : '',
//         mergedAt:
//           repo.lastPr.nodes && repo.lastPr.nodes.length > 0
//             ? repo.lastPr.nodes[0]?.mergedAt
//             : '',
//         closedAt:
//           repo.lastPr.nodes && repo.lastPr.nodes.length > 0
//             ? repo.lastPr.nodes[0]?.closedAt
//             : '',
//         createdAt:
//           repo.lastPr.nodes && repo.lastPr.nodes.length > 0
//             ? repo.lastPr.nodes[0]?.createdAt
//             : ''
//       },
//       lastIssue: {
//         id:
//           repo.lastIssue.edges && repo.lastIssue.edges.length > 0
//             ? (repo.lastIssue.edges[0]?.node?.id as string)
//             : '',
//         title:
//           repo.lastIssue.edges && repo.lastIssue.edges.length > 0
//             ? (repo.lastIssue.edges[0]?.node?.title as string)
//             : '',
//         url:
//           repo.lastIssue.edges && repo.lastIssue.edges.length > 0
//             ? (repo.lastIssue.edges[0]?.node?.url as string)
//             : '',
//         number:
//           repo.lastIssue.edges && repo.lastIssue.edges.length > 0
//             ? repo.lastIssue.edges[0]?.node?.number
//             : '',
//         state:
//           repo.lastIssue.edges && repo.lastIssue.edges.length > 0
//             ? (repo.lastIssue.edges[0]?.node?.state as string)
//             : '',
//         createdAt:
//           repo.lastIssue.edges && repo.lastIssue.edges.length > 0
//             ? (repo.lastIssue.edges[0]?.node?.state as string)
//             : '',
//         closedAt:
//           repo.lastIssue.edges && repo.lastIssue.edges.length > 0
//             ? (repo.lastIssue.edges[0]?.node?.closedAt as string)
//             : '',
//         lastEditedAt:
//           repo.lastIssue.edges && repo.lastIssue.edges.length > 0
//             ? (repo.lastIssue.edges[0]?.node?.lastEditedAt as string)
//             : ''
//       },
//       lastPushToDefaultBranch: {
//         name: repo.lastPushToDefaultBranch?.name as string,
//         message: commit?.message,
//         pushedDate: commit?.pushedDate,
//         committedDate: commit?.committedDate,
//         status: commit?.status?.state as string
//       }
//     })
//   })

//   console.log(`refactoring finished`)
//   return reposRefactored
// }
