import dash from 'lodash'
import { IBlog } from '../models/blog'

const dummy = () => {
  return 1
}

const totalLikes = (blogs: IBlog[]) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sumLikes, item) => sumLikes + item.likes, 0)
}

const favoriteBlog = (blogs: IBlog[]) => {
  if (blogs.length === 0) return null
  const selItem = blogs.reduce(
    (previous, current) => {
      return current.likes > previous.likes ? current : previous
    },
    { author: '', title: '', url: '', likes: -1 },
  )
  return { title: selItem.title, author: selItem.author, likes: selItem.likes }
}

const maxProperty = (inObject: Record<string, number>) => {
  return dash.reduce(
    inObject,
    (result, value, key) => {
      return result.value < value ? { property: key, value: value } : result
    },
    { property: '', value: -1 },
  )
}

const mostBlogs = (blogs: IBlog[]) => {
  if (blogs.length === 0) {
    return null
  }
  const countsLookup = dash.countBy(blogs, (item) => item.author)
  const mostBlog = maxProperty(countsLookup)
  // logger.info([countsLookup, mostBlog])
  return mostBlog.property
}

const mostLikes = (blogs: IBlog[]) => {
  if (blogs.length === 0) {
    return null
  }
  const likeCountLookup = dash.transform(
    blogs,
    function (result: Record<string, number>, item: IBlog) {
      if (result[item.author]) {
        result[item.author] += item.likes
      } else {
        result[item.author] = item.likes
      }
    },
    {},
  )
  const mostBlog = maxProperty(likeCountLookup)
  // logger.info([mostLikes, mostBlog])
  return mostBlog.property
}

export default {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
