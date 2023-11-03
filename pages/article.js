import React from 'react'
import { fetchAPI } from '../lib/strapi/api'
import BlogPostItem from '@/components/BlogPostItem'
const Article = ({ articles, categories, homepage }) => {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <ul>
          {articles &&
            articles.map((article) => {
              let { slug, createdAt: date, title, description: summary, tags } = article.attributes
              return BlogPostItem({ slug, date, title, summary, type: 'article' })
            })}
        </ul>
      </div>
    </>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [articlesRes, categoriesRes, homepageRes] = await Promise.all([
    fetchAPI('/articles', { populate: '*' }),
    fetchAPI('/categories', { populate: '*' }),
    fetchAPI('/homepage', {
      populate: {
        hero: '*',
        seo: { populate: '*' },
      },
    }),
  ])

  return {
    props: {
      articles: articlesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  }
}

export default Article
