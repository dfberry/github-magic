# 2.3.1

* Refactored to make room for cursor support for user repos
    * TBD - add tests fro user

# 2.2.1

* Added last queries (issue, pr, commit)
* Added defaultBranch query
* Add UserRepos query

# 2.1.1

* languages array and primary language inclusion/marked

# 2.1.0

* More properties on repo

# 2.0.3

* fix max data check

# 2.0.2

* break on max_items or undefined cursor

# 2.0.1

* logging of each row for `repos_extended`: 
    `totalitems: 300, page: 6, hasNextPage: true, cursor: Y3Vyc29yOnYyOpIgzgVd3Ug=`

# 2.0.0

* Refactored into @diberry/github-magic
* TBD: [SO target.history]()

# 1.14.5
* build with .d.ts files

# 1.14.4
* Add 'status' as query type - returns package.json version

# 1.14.3

* Expanded PullRequestFragment_v3 to include dates
* Added GraphQL comments to GraphQL schemas
* Fix build error with legacy dependencies "git install --legacy-peer-deps
* Removed old ./dist/main
* TBD: conflicing dependencies
    * Fix for now - 2 separate packages - 1 local and 1 build


# 1.14.2

* Added v3 query to main

# 1.14.1

* Node 18 
  * Added notes about how to publish action

    ```
    git add action.yml index.js node_modules/* package.json package-lock.json README.md
    git commit -m "My first action is ready"
    git tag -a -m "My first action release" v1.1
    git push --follow-tags
    ```

  * When I updated to Node 18, ncc failed with the following error which needed an env param in package.json script to fix. 
  
    ```json
    "package": "npm run build && NODE_OPTIONS='--openssl-legacy-provider' ncc build -o package --no-cache --source-map --license licenses.txt",
    ```

    ```error
    ncc: Version 0.31.1
    ncc: Compiling file index.js into CJS
    node:internal/crypto/hash:71
    this[kHandle] = new _Hash(algorithm, xofLen);
                    ^

    Error: error:0308010C:digital envelope routines::unsupported
        at new Hash (node:internal/crypto/hash:71:19)
        at Object.createHash (node:crypto:133:10)
        at BulkUpdateDecorator.hashFactory (/Users/dina/repos/dfberry/4.src.github-actions/gh-action-graphql/node_modules/@vercel/ncc/dist/ncc/index.js.cache.js:37:1262958)
        at BulkUpdateDecorator.update (/Users/dina/repos/dfberry/4.src.github-actions/gh-action-graphql/node_modules/@vercel/ncc/dist/ncc/index.js.cache.js:37:1261761)
        at OriginalSource.updateHash (/Users/dina/repos/dfberry/4.src.github-actions/gh-action-graphql/node_modules/@vercel/ncc/dist/ncc/index.js.cache.js:37:1530933)
        at NormalModule._initBuildHash (/Users/dina/repos/dfberry/4.src.github-actions/gh-action-graphql/node_modules/@vercel/ncc/dist/ncc/index.js.cache.js:37:421196)
        at handleParseResult (/Users/dina/repos/dfberry/4.src.github-actions/gh-action-graphql/node_modules/@vercel/ncc/dist/ncc/index.js.cache.js:37:422270)
        at /Users/dina/repos/dfberry/4.src.github-actions/gh-action-graphql/node_modules/@vercel/ncc/dist/ncc/index.js.cache.js:37:423657
        at processResult (/Users/dina/repos/dfberry/4.src.github-actions/gh-action-graphql/node_modules/@vercel/ncc/dist/ncc/index.js.cache.js:37:419523)
        at /Users/dina/repos/dfberry/4.src.github-actions/gh-action-graphql/node_modules/@vercel/ncc/dist/ncc/index.js.cache.js:37:420632 {
    opensslErrorStack: [ 'error:03000086:digital envelope routines::initialization error' ],
    library: 'digital envelope routines',
    reason: 'unsupported',
    code: 'ERR_OSSL_EVP_UNSUPPORTED'
    }
    ```