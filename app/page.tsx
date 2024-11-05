import { MDXDocumentDate, sortPosts } from 'pliny/utils/contentlayer'
import { filetedAllCoreContent } from '../lib/utils/pipline'
import { allDocuments } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allDocuments as MDXDocumentDate[])
  const posts = filetedAllCoreContent(sortedPosts)
  return <Main posts={posts} />
}
