import {
  IOrgReposAgExtended_V3Query,
  IPullRequestState,
  IIssueState
} from '../../generated/graphql.sdk'
export const TEST_DAT_ORG_REPO_EXTENDED_ITEM_2: IOrgReposAgExtended_V3Query = {
  organization: {
    repositories: {
      totalCount: 2142,
      pageInfo: {
        startCursor: 'Y3Vyc29yOnYyOpLNBd3OB9Ef4Q==',
        hasNextPage: true,
        endCursor: 'Y3Vyc29yOnYyOpLNAa_ODXu87g=='
      },
      edges: [
        {
          cursor: 'Y3Vyc29yOnYyOpLNBd3OB9Ef4Q==',
          node: {
            repositoryName: 'cognitive-services-speech-sdk',
            id: 'MDEwOlJlcG9zaXRvcnkxMzExNDU2OTc=',
            url: 'https://github.com/Azure-Samples/cognitive-services-speech-sdk',
            descriptionHTML:
              '<div>Sample code for the Microsoft Cognitive Services Speech SDK</div>',
            autoMergeAllowed: false,
            isArchived: false,
            isEmpty: false,
            isPrivate: false,
            isTemplate: false,
            isSecurityPolicyEnabled: false,
            isDisabled: false,
            hasWikiEnabled: true,
            createdAt: '2018-04-26T11:28:25Z',
            updatedAt: '2023-02-06T17:06:16Z',
            pushedAt: '2023-02-06T17:06:40Z',
            diskUsage: 233518,
            licenseInfo: {
              name: 'MIT License'
            },
            primaryLanguage: {
              name: 'C#'
            },
            languages: {
              edges: [
                {
                  node: {
                    name: 'Makefile'
                  }
                },
                {
                  node: {
                    name: 'C++'
                  }
                },
                {
                  node: {
                    name: 'C#'
                  }
                },
                {
                  node: {
                    name: 'C'
                  }
                },
                {
                  node: {
                    name: 'Shell'
                  }
                }
              ]
            },
            watchers: {
              totalCount: 101
            },
            stargazers: {
              totalCount: 1501
            },
            forks: {
              totalCount: 1391
            },
            issues: {
              totalCount: 33
            },
            pullRequests: {
              totalCount: 26
            },
            openPrs: {
              totalCount: 26
            },
            lastPr: {
              nodes: [
                {
                  title: 'Fix doc tag for LID Java sample',
                  isDraft: false,
                  url: 'https://github.com/Azure-Samples/cognitive-services-speech-sdk/pull/1824',
                  state: IPullRequestState.Open,
                  number: 1824,
                  mergedAt: null,
                  closedAt: null,
                  createdAt: '2023-02-06T17:06:39Z'
                }
              ]
            },
            lastIssue: {
              edges: [
                {
                  node: {
                    id: 'I_kwDOB9Ef4c5dZ1vT',
                    title:
                      'Speech recognition fails on Linux with SPXERR_AUDIO_SYS_LIBRARY_NOT_FOUND',
                    url: 'https://github.com/Azure-Samples/cognitive-services-speech-sdk/issues/1820',
                    number: 1820,
                    state: IIssueState.Open,
                    createdAt: '2023-02-01T23:56:26Z',
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
                          date: '2023-02-06T22:55:10.000+08:00',
                          email: '66966137+kLiHz@users.noreply.github.com',
                          name: 'kLiHz'
                        },
                        status: null,
                        message:
                          'Fix README of JavaScript browser samples (#1823)\n\n* Fix `js/broswer/from-microphone`\'s description in README\r\n\r\n* Fix broken Microsoft Speech SDK license links\r\n\r\n* Fix spelling of "Java Script" in README',
                        pushedDate: '2023-02-06T14:55:15Z',
                        committedDate: '2023-02-06T14:55:10Z'
                      }
                    }
                  ]
                }
              }
            }
          }
        },
        {
          cursor: 'Y3Vyc29yOnYyOpLNBHbOB89Pag==',
          node: {
            repositoryName:
              'active-directory-aspnetcore-webapp-openidconnect-v2',
            id: 'MDEwOlJlcG9zaXRvcnkxMzEwMjY3OTQ=',
            url: 'https://github.com/Azure-Samples/active-directory-aspnetcore-webapp-openidconnect-v2',
            descriptionHTML:
              '<div>An ASP.NET Core Web App which lets sign-in users (including in your org, many orgs, orgs + personal accounts, sovereign clouds) and call Web APIs (including Microsoft Graph)</div>',
            autoMergeAllowed: false,
            isArchived: false,
            isEmpty: false,
            isPrivate: false,
            isTemplate: false,
            isSecurityPolicyEnabled: false,
            isDisabled: false,
            hasWikiEnabled: true,
            createdAt: '2018-04-25T15:26:43Z',
            updatedAt: '2023-02-05T17:31:40Z',
            pushedAt: '2023-02-03T10:59:38Z',
            diskUsage: 11694,
            licenseInfo: {
              name: 'MIT License'
            },
            primaryLanguage: {
              name: 'PowerShell'
            },
            languages: {
              edges: [
                {
                  node: {
                    name: 'C#'
                  }
                },
                {
                  node: {
                    name: 'CSS'
                  }
                },
                {
                  node: {
                    name: 'JavaScript'
                  }
                },
                {
                  node: {
                    name: 'HTML'
                  }
                },
                {
                  node: {
                    name: 'PowerShell'
                  }
                }
              ]
            },
            watchers: {
              totalCount: 109
            },
            stargazers: {
              totalCount: 1142
            },
            forks: {
              totalCount: 850
            },
            issues: {
              totalCount: 10
            },
            pullRequests: {
              totalCount: 7
            },
            openPrs: {
              totalCount: 7
            },
            lastPr: {
              nodes: [
                {
                  title: 'Routine sample update',
                  isDraft: false,
                  url: 'https://github.com/Azure-Samples/active-directory-aspnetcore-webapp-openidconnect-v2/pull/666',
                  state: IPullRequestState.Open,
                  number: 666,
                  mergedAt: null,
                  closedAt: null,
                  createdAt: '2023-02-03T10:59:37Z'
                }
              ]
            },
            lastIssue: {
              edges: [
                {
                  node: {
                    id: 'I_kwDOB89Pas5bjqlA',
                    title:
                      'OAuth2 Authorization code was already redeemed please retry with a new valid code or use an existing refresh token',
                    url: 'https://github.com/Azure-Samples/active-directory-aspnetcore-webapp-openidconnect-v2/issues/664',
                    number: 664,
                    state: IIssueState.Open,
                    createdAt: '2023-01-17T09:48:51Z',
                    closedAt: null,
                    lastEditedAt: '2023-01-17T23:18:35Z'
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
                          date: '2022-12-19T16:16:21.000-05:00',
                          email: '85962119+aremo-ms@users.noreply.github.com',
                          name: 'Alex Remo'
                        },
                        status: null,
                        message:
                          'Aremo ms/sample4 3 basher (#656)\n\n* slightly updated sample.json to meet new code generator format + enabled tenant validation in startup\r\n\r\n* working on BASHER\r\n\r\n* added allowed tenants list to appsettings.json\r\n\r\n* added PS items to solution\r\n\r\n* updated readme for validation of tenants\r\n\r\n* reverted sample.json\r\n\r\n* addressed review comments\r\n\r\n* slight update in readme.md\r\n\r\n* added client capabilities\r\n\r\n* Minor edits\r\n\r\n* More edits\r\n\r\n* addressed comments\r\n\r\n* Updated readme and Service/TodoListController.cs to have new scopes Read.User.Data and Write.User.Data\r\n\r\n* updated sample.json with Audience and manual steps for Service application\r\n\r\n* updated PowerShell scripts\r\n\r\n* reverted to back compatible URL names in sample.json + cleanup\r\n\r\n* latest packages (.NET 7.0), cleanup and config are from latest CodeGen. Added readme_steps for easer compare (will delete before release). Current status: todo list fails to display\r\n\r\n* bumped versions packages\r\n\r\n* ps files are generated by latest code gen, updated scope and permissions to latest trend. Appsettings.json was updated to keep graph info. Sample.json was updated to have latest code jen fileds (still need to be updated)\r\n\r\n* removed graph client creation and getting token. The client is obtained from middleware now\r\n\r\n* Setting some fundamentals stuff right ahead\r\n\r\n* BASHER logic and permissions, some cleanup as well\r\n\r\n* re-added reply url for service, renamed name of app registration to have "_" instead of "-"\r\n\r\n* readme file with initial "How the code was created" and updated "About the code", other sub-readme files\r\n\r\n* bumped all versions\r\n\r\n* fixing mismatch between readme and manual steps\r\n\r\n* updated readme\r\n\r\n* renamed AppId and Scope for Web API\r\n\r\n* formatting and textual edits\r\n\r\n* addressed comments\r\n\r\n* last update\r\n\r\n* updated\r\n\r\nCo-authored-by: Kalyan Krishna <kkrishna@microsoft.com>\r\nCo-authored-by: kalyankrishna1 <kalyankrishna1@gmail.com>',
                        pushedDate: '2022-12-19T21:16:23Z',
                        committedDate: '2022-12-19T21:16:21Z'
                      }
                    }
                  ]
                }
              }
            }
          }
        },
        {
          cursor: 'Y3Vyc29yOnYyOpLNAwHOB8dwHQ==',
          node: {
            repositoryName: 'blockchain',
            id: 'MDEwOlJlcG9zaXRvcnkxMzA1MTA4Nzc=',
            url: 'https://github.com/Azure-Samples/blockchain',
            descriptionHTML: '<div>Azure Blockchain Content and Samples</div>',
            autoMergeAllowed: false,
            isArchived: false,
            isEmpty: false,
            isPrivate: false,
            isTemplate: false,
            isSecurityPolicyEnabled: false,
            isDisabled: false,
            hasWikiEnabled: true,
            createdAt: '2018-04-21T20:47:24Z',
            updatedAt: '2023-02-06T04:51:42Z',
            pushedAt: '2022-12-07T18:26:16Z',
            diskUsage: 97768,
            licenseInfo: {
              name: 'MIT License'
            },
            primaryLanguage: {
              name: 'HTML'
            },
            languages: {
              edges: [
                {
                  node: {
                    name: 'PowerShell'
                  }
                },
                {
                  node: {
                    name: 'Shell'
                  }
                },
                {
                  node: {
                    name: 'Python'
                  }
                },
                {
                  node: {
                    name: 'C#'
                  }
                },
                {
                  node: {
                    name: 'Scala'
                  }
                }
              ]
            },
            watchers: {
              totalCount: 109
            },
            stargazers: {
              totalCount: 769
            },
            forks: {
              totalCount: 645
            },
            issues: {
              totalCount: 8
            },
            pullRequests: {
              totalCount: 7
            },
            openPrs: {
              totalCount: 7
            },
            lastPr: {
              nodes: [
                {
                  title:
                    'Bump Newtonsoft.Json from 10.0.3 to 13.0.2 in /blockchain-workbench/rest-api-samples/dotnet',
                  isDraft: false,
                  url: 'https://github.com/Azure-Samples/blockchain/pull/262',
                  state: IPullRequestState.Open,
                  number: 262,
                  mergedAt: null,
                  closedAt: null,
                  createdAt: '2022-12-07T18:26:11Z'
                }
              ]
            },
            lastIssue: {
              edges: [
                {
                  node: {
                    id: 'MDU6SXNzdWU5NzgyODM0MDU=',
                    title:
                      '[ FEATURE REQUEST ] - Add IBC capability to Azure Blockchain',
                    url: 'https://github.com/Azure-Samples/blockchain/issues/252',
                    number: 252,
                    state: IIssueState.Open,
                    createdAt: '2021-08-24T16:34:30Z',
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
                          date: '2021-09-13T06:57:56.000-07:00',
                          email: 'patricka@microsoft.com',
                          name: 'Pat Altimore'
                        },
                        status: null,
                        message:
                          'Merge pull request #254 from Azure-Samples/caleteet-secupdate\n\nCaleteet secupdate',
                        pushedDate: '2021-09-13T13:57:58Z',
                        committedDate: '2021-09-13T13:57:56Z'
                      }
                    }
                  ]
                }
              }
            }
          }
        },
        {
          cursor: 'Y3Vyc29yOnYyOpLNAijOA5WBHQ==',
          node: {
            repositoryName: 'Cognitive-Speech-TTS',
            id: 'MDEwOlJlcG9zaXRvcnk2MDEyOTU2NQ==',
            url: 'https://github.com/Azure-Samples/Cognitive-Speech-TTS',
            descriptionHTML:
              '<div>Microsoft Text-to-Speech API sample code in several languages, part of Cognitive Services.</div>',
            autoMergeAllowed: false,
            isArchived: false,
            isEmpty: false,
            isPrivate: false,
            isTemplate: false,
            isSecurityPolicyEnabled: false,
            isDisabled: false,
            hasWikiEnabled: true,
            createdAt: '2016-05-31T23:05:42Z',
            updatedAt: '2023-02-04T13:18:01Z',
            pushedAt: '2023-02-02T08:35:27Z',
            diskUsage: 140815,
            licenseInfo: {
              name: 'Other'
            },
            primaryLanguage: {
              name: 'C#'
            },
            languages: {
              edges: [
                {
                  node: {
                    name: 'Java'
                  }
                },
                {
                  node: {
                    name: 'C#'
                  }
                },
                {
                  node: {
                    name: 'JavaScript'
                  }
                },
                {
                  node: {
                    name: 'PHP'
                  }
                },
                {
                  node: {
                    name: 'Python'
                  }
                }
              ]
            },
            watchers: {
              totalCount: 88
            },
            stargazers: {
              totalCount: 552
            },
            forks: {
              totalCount: 420
            },
            issues: {
              totalCount: 11
            },
            pullRequests: {
              totalCount: 3
            },
            openPrs: {
              totalCount: 3
            },
            lastPr: {
              nodes: [
                {
                  title: 'Create DSAT examples.md',
                  isDraft: false,
                  url: 'https://github.com/Azure-Samples/Cognitive-Speech-TTS/pull/261',
                  state: IPullRequestState.Open,
                  number: 261,
                  mergedAt: null,
                  closedAt: null,
                  createdAt: '2023-02-02T08:35:26Z'
                }
              ]
            },
            lastIssue: {
              edges: [
                {
                  node: {
                    id: 'I_kwDOA5WBHc5ciAw3',
                    title:
                      'A similar issue to not getting any response from /ackaud ',
                    url: 'https://github.com/Azure-Samples/Cognitive-Speech-TTS/issues/260',
                    number: 260,
                    state: IIssueState.Open,
                    createdAt: '2023-01-23T02:38:03Z',
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
                          date: '2023-01-21T06:50:27.000+08:00',
                          email: 'szhao@microsoft.com',
                          name: 'szhaomsft'
                        },
                        status: null,
                        message: 'Update README.md',
                        pushedDate: '2023-01-20T22:50:29Z',
                        committedDate: '2023-01-20T22:50:27Z'
                      }
                    }
                  ]
                }
              }
            }
          }
        },
        {
          cursor: 'Y3Vyc29yOnYyOpLNAa_ODXu87g==',
          node: {
            repositoryName: 'modern-data-warehouse-dataops',
            id: 'MDEwOlJlcG9zaXRvcnkyMjYyMTMxMDI=',
            url: 'https://github.com/Azure-Samples/modern-data-warehouse-dataops',
            descriptionHTML:
              '<div>DataOps for the Modern Data Warehouse on Microsoft Azure. <a href="https://aka.ms/mdw-dataops" rel="nofollow">https://aka.ms/mdw-dataops</a>.</div>',
            autoMergeAllowed: false,
            isArchived: false,
            isEmpty: false,
            isPrivate: false,
            isTemplate: false,
            isSecurityPolicyEnabled: true,
            isDisabled: false,
            hasWikiEnabled: true,
            createdAt: '2019-12-06T00:23:56Z',
            updatedAt: '2023-02-03T09:56:15Z',
            pushedAt: '2023-02-06T16:48:38Z',
            diskUsage: 71248,
            licenseInfo: {
              name: 'MIT License'
            },
            primaryLanguage: {
              name: 'Shell'
            },
            languages: {
              edges: [
                {
                  node: {
                    name: 'PowerShell'
                  }
                },
                {
                  node: {
                    name: 'Shell'
                  }
                },
                {
                  node: {
                    name: 'Python'
                  }
                },
                {
                  node: {
                    name: 'TSQL'
                  }
                },
                {
                  node: {
                    name: 'Dockerfile'
                  }
                }
              ]
            },
            watchers: {
              totalCount: 44
            },
            stargazers: {
              totalCount: 431
            },
            forks: {
              totalCount: 334
            },
            issues: {
              totalCount: 42
            },
            pullRequests: {
              totalCount: 4
            },
            openPrs: {
              totalCount: 4
            },
            lastPr: {
              nodes: [
                {
                  title: 'ydaponte/590 updates to readme serverless',
                  isDraft: false,
                  url: 'https://github.com/Azure-Samples/modern-data-warehouse-dataops/pull/608',
                  state: IPullRequestState.Merged,
                  number: 608,
                  mergedAt: '2023-02-03T19:15:04Z',
                  closedAt: '2023-02-03T19:15:04Z',
                  createdAt: '2023-02-02T20:42:22Z'
                }
              ]
            },
            lastIssue: {
              edges: [
                {
                  node: {
                    id: 'I_kwDODXu87s5dahBq',
                    title: 'Managing a change log for tracking purpose',
                    url: 'https://github.com/Azure-Samples/modern-data-warehouse-dataops/issues/606',
                    number: 606,
                    state: IIssueState.Open,
                    createdAt: '2023-02-02T03:04:04Z',
                    closedAt: null,
                    lastEditedAt: null
                  }
                }
              ]
            },
            lastPushToDefaultBranch: {
              name: 'main',
              target: {
                history: {
                  edges: [
                    {
                      node: {
                        author: {
                          date: '2023-01-30T16:04:14.000+05:30',
                          email:
                            '36256675+balakrishnaakuleti@users.noreply.github.com',
                          name: 'Balakrishna Akuleti'
                        },
                        status: null,
                        message:
                          'Merge pull request #588 from Azure-Samples/datalifecycle\n\nDatalifecycle',
                        pushedDate: '2023-01-30T10:34:16Z',
                        committedDate: '2023-01-30T10:34:14Z'
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
