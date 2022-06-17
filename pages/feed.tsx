import { Feed } from 'feed'
import { GetServerSideProps } from 'next'
import { getDatabase } from '../lib/notion'

const domain = 'https://spencerwoo.com'
const year = new Date().getFullYear()

// Function for generating the RSS feed
const generateRSS = (posts: any) => {
  // Create new feed object
  const feed = new Feed({
    id: domain,
    link: domain,
    title: "Jiasheng Lu - Jiasheng's Blog",
    description: 'Thoughts, ideas, and more.',
    copyright: `All rights reserved ${year}, Jiasheng Lu`,
    image: `${domain}/favicon.png`,
    favicon: `${domain}/favicon.ico`,
    author: {
      name: 'Jiasheng Lu',
      email: 'spencer.wushangbo@gmail.com',
      link: 'https://spencerwoo.com',
    },
  })

  // Add posts to feed based on queried data from Notion
  posts.forEach((post: any) => {
    feed.addItem({
      title: post.properties.name.title[0].text.content,
      id: post.id,
      link: `${domain}/blog/${post.properties.slug.rich_text[0].text.content}`,
      description: post.properties.preview.rich_text[0].text.content,
      date: new Date(post.properties.date.date.start),
    })
  })

  return feed.rss2()
}

// Dummy component as Next.js must have a component to render
const FeedComponent = () => null

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=60, stale-while-revalidate')

  const posts = await getDatabase()
  const xmlFeed = generateRSS(posts)

  res.setHeader('Content-Type', 'text/xml')
  res.write(xmlFeed)
  res.end()

  return {
    props: {},
  }
}

export default FeedComponent
