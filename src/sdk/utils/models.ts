export type RepoMeta = 'lastissue' | 'lastpr'

export type IVariables =
  | {
      [key: string]: never
    }
  | undefined

export type IRepoParameters = {
  pat: string
  gitHubGraphQLUrl: string
  orgName: string
  maxItems: number
  maxPageSize: number
  maxDelayForRateLimit: number
}
