import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getPostFiles() {
  return fs.readdirSync(postsDirectory)
}

export function getPostData(postIdentifier) {
  const postslug = postIdentifier.replace(/\.md$/, '')
  const filepath = path.join(postsDirectory, `${postslug}.md`)
  const filecontent = fs.readFileSync(filepath, 'utf-8')
  const { data, content } = matter(filecontent)

  const postData = {
    slug: postslug,
    ...data,
    content,
  }

  return postData
}

export function getAllPosts() {
  const postFiles = getPostFiles()

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile)
  })

  return allPosts.sort((a, b) => (a.date > b.date ? -1 : 1))
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts()

  const featuredPosts = allPosts.filter((post) => post.isFeatured)

  return featuredPosts
}
