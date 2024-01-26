import Head from 'next/head'
import FeaturedPosts from '../components/homepage/featured-posts'
import Hero from '../components/homepage/hero'
import { getFeaturedPosts } from '../lib/posts-util'

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Welcome to My Blog</title>
        <meta
          name="description"
          content="I post about programming and web development"
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </>
  )
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts()

  return {
    props: {
      posts: featuredPosts,
    },
  }
}

export default HomePage
