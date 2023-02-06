import { describe, expect, test } from '@jest/globals'
import { languagesRefactor } from '../../sdk/utils/refactor'
import {
  TEST_DATA_LANGUAGES_1_REPO,
  TEST_DATA_LANGUAGES_1_REPO_REFACTORED,
  TEST_DATA_LANGUAGES_2_REPO,
  TEST_DATA_LANGUAGES_2_REPO_REFACTORED
} from '../mockdata/languages.data'
describe('languages', () => {
  test('Language refactor (data) success', async () => {
    const reformattedData: string[] = languagesRefactor(
      TEST_DATA_LANGUAGES_1_REPO
    )
    expect(
      JSON.parse(JSON.stringify(TEST_DATA_LANGUAGES_1_REPO_REFACTORED))
    ).toEqual(JSON.parse(JSON.stringify(reformattedData)))
  })
  test('Language refactor (empty) success', async () => {
    const reformattedData: string[] = languagesRefactor(
      TEST_DATA_LANGUAGES_2_REPO
    )
    expect(
      JSON.parse(JSON.stringify(TEST_DATA_LANGUAGES_2_REPO_REFACTORED))
    ).toEqual(JSON.parse(JSON.stringify(reformattedData)))
  })
})
