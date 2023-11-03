import { sortPosts } from 'pliny/utils/contentlayer'
import { filetedAllCoreContent } from '../lib/utils/pipline'
import { allBlogs } from 'contentlayer/generated'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPosts(allBlogs)
  const posts = filetedAllCoreContent(sortedPosts)
  return <Main posts={posts} />
}
