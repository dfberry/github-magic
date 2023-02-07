import { ILanguageConnection } from '../../generated/graphql.sdk'
import { inPlaceSort } from 'fast-sort'

export function languagesRefactor(
  languages: ILanguageConnection,
  primaryLanguage: string
): string[] {
  if (
    languages &&
    languages !== null &&
    languages !== undefined &&
    'edges' in languages &&
    languages.edges !== null &&
    languages?.edges !== undefined &&
    languages?.edges.length > 0
  ) {
    const arr: string[] = languages?.edges?.map((edge) => {
      // If edge has nodes
      if (edge != null && edge !== undefined && 'node' in edge) {
        // if edge's node is the primary language
        return edge?.node.name === primaryLanguage
          ? `${edge?.node.name} (Primary)`
          : edge?.node.name
      } else {
        return ''
      }
    })

    // If Primary language isn't in array, add it
    if (arr.includes(`${primaryLanguage} (Primary)`) === false) {
      arr.push(`${primaryLanguage} (Primary)`)
    }
    const sorted = inPlaceSort(arr).asc()
    console.log(sorted)

    return sorted
  }

  return []
}
