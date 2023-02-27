/* eslint no-console: 0 */ // --> OFF
/* eslint github/no-then: 0 */ // --> OFF
import { reposExtended } from './main'
import dotenv from 'dotenv'
import { writeFileSync } from 'fs'
dotenv.config()

async function main(): Promise<unknown> {
  return await reposExtended({
    pat: process.env.github_personal_access_token as string,
    gitHubGraphQLUrl: 'https://api.github.com/graphql',
    orgName: 'Azure-Samples',
    maxItems: -1,
    maxPageSize: 40,
    maxDelayForRateLimit: 2000,
    repoOwnerType: 'organization'
  })
}
main()
  .then((result) => {
    writeFileSync('org.json', JSON.stringify(result))
    console.log('done')
  })
  .catch((error) => console.error(error))
