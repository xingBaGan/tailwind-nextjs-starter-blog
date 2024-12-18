import { MDXDocumentDate, sortPosts } from 'pliny/utils/contentlayer'
import { filetedAllCoreContent } from '../lib/utils/pipline'
import { allArticles, allPosts } from 'contentlayer/generated'
import Main from './Main'

const documents = [...allArticles, ...allPosts]
export default async function Page() {
  const sortedPosts = sortPosts(documents as MDXDocumentDate[])
  const posts = filetedAllCoreContent(sortedPosts)
  return <Main posts={posts} />
}
