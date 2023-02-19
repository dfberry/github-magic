# GraphQL Data Scrape SDK

## Connect with personal access token (PAT)

```
const { whoami } = require("@diberry/github-magic");

const pat = "ghp_...";
const gitHubGraphQLUrl = "https://api.github.com/graphql";

async function main() {
  if (!pat) throw Error("auth is missing");
  if (!gitHubGraphQLUrl) throw Error("gitHubGraphQLUrl is missing");
  const rawResult = await whoami({ pat, gitHubGraphQlUrl: gitHubGraphQLUrl });
  return rawResult.viewer.login;
}
main().then((result)=>console.log(result)).catch(err=>console.log(err))
```

## Connect with user token

1. Must have already exchanged user's code for user's token
2. Use token in place of PAT in client creation. Assumes token returned from GitHub is bearer token.

```
const { whoami } = require("@diberry/github-magic");

const token = "gho_...";
const gitHubGraphQLUrl = "https://api.github.com/graphql";

async function main() {
  if (!token) throw Error("auth is missing");
  if (!gitHubGraphQLUrl) throw Error("gitHubGraphQLUrl is missing");
  const rawResult = await whoami({ pat, gitHubGraphQlUrl: gitHubGraphQLUrl });
  return rawResult.viewer.login;
}
main().then((result)=>console.log(result)).catch(err=>console.log(err))
```