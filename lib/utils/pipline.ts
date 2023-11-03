import { allCoreContent, MDXDocument } from 'pliny/utils/contentlayer'

export function filetedAllCoreContent(contents: MDXDocument[]) {
  return allCoreContent(contents).filter((content) => {
    return !content.draft
  })
}
