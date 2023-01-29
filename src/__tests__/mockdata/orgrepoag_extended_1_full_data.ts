import {
  IOrgReposAgExtended_V3Query,
  IPullRequestState,
  IIssueState
} from '../../generated/graphql.sdk'
export const TEST_DAT_ORG_REPO_EXTENDED_ITEM_2: IOrgReposAgExtended_V3Query = {
  organization: {
    repositories: {
      totalCount: 2130,
      pageInfo: {
        startCursor: 'Y3Vyc29yOnYyOpLNBcrOB9Ef4Q==',
        hasNextPage: true,
        endCursor: 'Y3Vyc29yOnYyOpLNBcrOB9Ef4Q=='
      },
      edges: [
        {
          cursor: 'Y3Vyc29yOnYyOpLNBcrOB9Ef4Q==',
          node: {
            repositoryName: 'cognitive-services-speech-sdk',
            id: 'MDEwOlJlcG9zaXRvcnkxMzExNDU2OTc=',
            url: 'https://github.com/Azure-Samples/cognitive-services-speech-sdk',
            descriptionHTML:
              '<div>Sample code for the Microsoft Cognitive Services Speech SDK</div>',
            updatedAt: '2023-01-28T04:40:38Z',
            stargazers: {
              totalCount: 1482
            },
            forks: {
              totalCount: 1381
            },
            issues: {
              totalCount: 37
            },
            pullRequests: {
              totalCount: 24
            },
            openPrs: {
              totalCount: 24
            },
            lastPr: {
              nodes: [
                {
                  title:
                    'pull 1.25 new samples and updates to public GitHub repository.',
                  isDraft: false,
                  url: 'https://github.com/Azure-Samples/cognitive-services-speech-sdk/pull/1812',
                  state: IPullRequestState.Merged,
                  number: 1812,
                  mergedAt: '2023-01-28T04:29:02Z',
                  closedAt: '2023-01-28T04:29:02Z',
                  createdAt: '2023-01-28T00:33:37Z'
                }
              ]
            },
            lastIssue: {
              edges: [
                {
                  node: {
                    id: 'I_kwDOB9Ef4c5dCeyy',
                    title:
                      'Writing Audio to Disk when using recognize_once_async().get()',
                    url: 'https://github.com/Azure-Samples/cognitive-services-speech-sdk/issues/1815',
                    number: 1815,
                    state: IIssueState.Open,
                    createdAt: '2023-01-28T17:01:41Z',
                    closedAt: null,
                    lastEditedAt: null
                  }
                }
              ]
            },
            lastPushToDefaultBranch: {
              name: 'master',
              target: {
                history: {
                  edges: [
                    {
                      node: {
                        author: {
                          date: '2023-01-27T20:29:02.000-08:00',
                          email:
                            '48774897+BrianMouncer@users.noreply.github.com',
                          name: 'BrianMouncer'
                        },
                        status: null,
                        message:
                          'pull 1.25 new samples and updates to public GitHub repository. (#1812)\n\n* pull 1.25 new samples and updates to public GitHub repository.\r\n\r\n* also update the sdk version used by all the samples.\r\n\r\n* add step to install maui-android, so new maui smaples will build in ci.\r\n\r\n* adding the maui-android workflow did not fix the restore fialure.  Exclude the maui project from CiCd build like in carbon.\r\n\r\n* adding the maui-android workflow did not fix the restore fialure.  Exclude the maui project from CiCd build like in carbon.\r\n\r\n* adding the maui-android workflow did not fix the restore fialure.  Exclude the maui project from CiCd build like in carbon.\r\n\r\n* adding the maui-android workflow did not fix the restore fialure.  Exclude the maui project from CiCd build like in carbon.\r\n\r\n* adding the maui-android workflow did not fix the restore fialure.  Exclude the maui project from CiCd build like in carbon.',
                        pushedDate: '2023-01-28T04:29:05Z',
                        committedDate: '2023-01-28T04:29:02Z'
                      }
                    }
                  ]
                }
              }
            }
          }
        }
      ]
    }
  }
}
