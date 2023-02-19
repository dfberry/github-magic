export type IRepoExRefactored = {
  id: string
  url: string
  repositoryName: string
  descriptionHTML: string
  updatedAt: string
  diskUsage: number
  primaryLanguage: string
  languages: string[]
  is: {
    isArchived: boolean
    isEmpty: boolean
    isPrivate: boolean
    isTemplate: boolean
    isSecurityPolicyEnabled?: boolean | null
    isDisabled: boolean
  }
  has: {
    hasWikiEnabled: boolean
  }
  date: {
    createdAt: string
    updatedAt: string
    pushedAt: string
  }
  legal: {
    license: string
  }
  watchers: { totalCount: number }
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
    status?: string | null | undefined
  }
}

export type IRepoExResult = {
  name: string | null | unknown
  message: string | null | unknown
  pushedDate: string | null | unknown
  committedDate: string | null | unknown
  status: string | null | unknown
}

export interface Historyable {
  history: Object
}
export type RepoMeta = 'lastissue' | 'lastpr'
export type IRepoParameters = {
  pat: string
  gitHubGraphQLUrl: string
  orgName: string
  maxItems: number
  maxPageSize: number
  maxDelayForRateLimit: number
}
