/* eslint no-console: 0 */ // --> OFF
/* eslint github/no-then: 0 */ // --> OFF
import { reposExtended } from './main'
import { writeFileSync } from 'fs'
import dotenv from 'dotenv'
dotenv.config()

async function main(): Promise<unknown> {
  return await reposExtended({
    pat: process.env.github_personal_access_token as string,
    gitHubGraphQLUrl: 'https://api.github.com/graphql',
    orgName: 'dfberry',
    maxItems: -1,
    maxPageSize: 40,
    maxDelayForRateLimit: 900,
    repoOwnerType: 'user'
  })
}
main()
  .then((result) => {
    writeFileSync('user.json', JSON.stringify(result))
    console.log('done')
  })
  .catch((error) => console.error(error))
