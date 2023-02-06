/* eslint no-console: 0 */ // --> OFF
import { reposExtended } from './main'
import dotenv from 'dotenv'
dotenv.config()

async function main(): Promise<unknown> {
  return await reposExtended({
    pat: process.env.github_personal_access_token as string,
    gitHubGraphQLUrl: 'https://api.github.com/graphql',
    orgName: 'Azure-Samples',
    maxItems: -1,
    maxPageSize: 40,
    maxDelayForRateLimit: 5000
  })
}
main()
  .then((result) => console.log(result))
  .catch((error) => console.error(error))
