import { fetchAPI } from '../../lib/strapi/api'
import Moment from 'react-moment'
import Image from 'next/image'
import { getStrapiMedia } from '../../lib/strapi/media'
import ReactMarkdown from 'react-markdown'
export async function getStaticPaths() {
  const articlesRes = await fetchAPI('/articles', { fields: ['slug'] })
  let paths = articlesRes.data.map((article) => ({
    params: {
      slug: article.attributes.slug,
    },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const articlesRes = await fetchAPI('/articles', {
    filters: {
      slug: params.slug,
    },
    populate: '*',
  })
  const categoriesRes = await fetchAPI('/categories')
  const article = articlesRes.data[0]
  return {
    props: { article, categories: categoriesRes },
    revalidate: 1,
  }
}

const DEFAULT_LAYOUT = 'PostLayout'
const Article = ({ article, categories }) => {
  let imageUrl
  imageUrl = getStrapiMedia(article.attributes.image)

  const seo = {
    metaTitle: article.attributes.title,
    metaDescription: article.attributes.description,
    shareImage: article.attributes.image,
    article: true,
  }
  // let { name: author } = article.attributes.author.data.attributes;
  let author = article.attributes.author.data.attributes
  return (
    <div>
      <div className="prose-img:rounded-x prose mx-auto max-w-screen-xl bg-white lg:prose-lg lg:prose-neutral lg:px-10">
        {/* <Seo seo={seo} /> */}

        <h1>{article.attributes.title}</h1>
        <div>
          <div>
            By {JSON.stringify(author)}
            <div>
              {/* <span>By {author}</span> */}
              <span></span>
            </div>
            <div>
              <Moment format="MMM Do YYYY">{article.attributes.published_at}</Moment>
            </div>
          </div>
        </div>
        <div id="banner" data-src={imageUrl} data-srcset={imageUrl} data-uk-img>
          <Image src={imageUrl} alt={article.attributes.title} />
        </div>
        <div>
          <div>
            <ReactMarkdown>{article.attributes.content}</ReactMarkdown>
            <hr />
            <div>
              <div>
                {article.attributes.author.picture && (
                  <Image image={article.attributes.author.picture} alt="author icon" />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article
