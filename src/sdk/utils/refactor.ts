import { ILanguageConnection } from '../../generated/graphql.sdk'

export function languagesRefactor(languages: ILanguageConnection): string[] {
  if (
    languages &&
    languages !== null &&
    languages !== undefined &&
    'edges' in languages &&
    languages.edges !== null &&
    languages?.edges !== undefined &&
    languages?.edges.length > 0
  ) {
    return languages?.edges?.map((edge) => {
      if (edge != null && edge !== undefined && 'node' in edge) {
        return edge?.node.name
      }
      return ''
    })
  }

  return []
}
