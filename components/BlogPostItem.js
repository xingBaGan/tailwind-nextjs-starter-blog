import Link from '@/components/Link'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
export default function BlogPostItem({ slug, date, title, summary, tags, type }) {
  return (
    <li key={slug} className="py-4">
      <article className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
        <dl>
          <dt className="sr-only">Published on</dt>
          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
            <time dateTime={date}>{date}</time>
          </dd>
        </dl>
        <div className="space-y-3 xl:col-span-3">
          <div>
            <h3 className="text-2xl font-bold leading-8 tracking-tight">
              <Link
                href={type == 'article' ? `/article/${slug}` : `/blog/${slug}`}
                className="text-gray-900 dark:text-gray-100"
              >
                {title}
              </Link>
            </h3>
            <div className="flex flex-wrap">
              {tags && tags.map((tag) => <Tag key={tag} text={tag} />)}
            </div>
          </div>
          <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
        </div>
      </article>
    </li>
  )
}
