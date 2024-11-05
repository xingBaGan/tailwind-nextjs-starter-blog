import { MetadataRoute } from 'next'
import { allDocuments } from 'contentlayer/generated'
import siteMetadata from '@/data/siteMetadata'

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = siteMetadata.siteUrl
  const blogRoutes = allDocuments
    .filter((post) => post.type === 'Post' || post.type === 'Article')
    .map((post) => ({
      url: `${siteUrl}/${post.path}`,
      // lastModified: post.lastmod || post.date,
    }))

  const routes = ['', 'blog', 'projects', 'tags'].map((route) => ({
    url: `${siteUrl}/${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...blogRoutes]
}
