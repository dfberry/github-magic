/* eslint no-console: 0 */ // --> OFF
// V2
export { whoami, whoamiRequiredParameters } from './v2/whoami'
export { IRepoFragment, repos } from './v2/repos'

// V3
export { status } from './v3/status'
export { reposExtended } from './v3/repos_extended'
export * from './v3/last'
export * from './v3/defaultBranch'

// V3 - repos for orgs and users
export { IRepoExRefactored, IRepoParameters } from './utils/types.repos'
