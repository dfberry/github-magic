import { describe, expect, test } from '@jest/globals'
import { languagesRefactor } from '../../sdk/utils/refactor'
import { ILanguageConnection, ILanguageEdge } from '../../generated/graphql.sdk'
import {
  TEST_DATA_LANGUAGES_1_REPO,
  TEST_DATA_LANGUAGES_1_REPO_REFACTORED,
  TEST_DATA_LANGUAGES_2_REPO,
  TEST_DATA_LANGUAGES_2_REPO_REFACTORED,
  TEST_DATA_LANGUAGES_3_REPO,
  TEST_DATA_LANGUAGES_3_REPO_Primary,
  TEST_DATA_LANGUAGES_3_REPO_REFACTORED
} from '../mockdata/languages.data'
describe('languages', () => {
  test('Language includes primary success', async () => {
    const primaryLanguageIndex: number =
      TEST_DATA_LANGUAGES_1_REPO?.edges.length - 1
    const primaryLanguage: string =
      TEST_DATA_LANGUAGES_1_REPO?.edges[primaryLanguageIndex]?.node.name

    const reformattedData: string[] = languagesRefactor(
      TEST_DATA_LANGUAGES_1_REPO,
      primaryLanguage
    )

    expect(reformattedData.length).toEqual(
      TEST_DATA_LANGUAGES_1_REPO_REFACTORED.length
    )

    expect(
      JSON.parse(JSON.stringify(TEST_DATA_LANGUAGES_1_REPO_REFACTORED))
    ).toEqual(JSON.parse(JSON.stringify(reformattedData)))
  })
  test("Language doesn't include primary success", async () => {
    const reformattedData: string[] = languagesRefactor(
      TEST_DATA_LANGUAGES_3_REPO,
      TEST_DATA_LANGUAGES_3_REPO_Primary
    )

    expect(reformattedData.length).toEqual(
      TEST_DATA_LANGUAGES_3_REPO_REFACTORED.length
    )

    expect(
      JSON.parse(JSON.stringify(TEST_DATA_LANGUAGES_3_REPO_REFACTORED))
    ).toEqual(JSON.parse(JSON.stringify(reformattedData)))
  })
  test('Language refactor (empty) success', async () => {
    const reformattedData: string[] = languagesRefactor(
      TEST_DATA_LANGUAGES_2_REPO,
      'C#'
    )
    expect(
      JSON.parse(JSON.stringify(TEST_DATA_LANGUAGES_2_REPO_REFACTORED))
    ).toEqual(JSON.parse(JSON.stringify(reformattedData)))
  })
})
