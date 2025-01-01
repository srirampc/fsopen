const dash = require('lodash')
const logger = require('../utils/logger.js')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.length === 0
    ? 0
    : blogs.reduce((sumLikes, item) => sumLikes + item.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const selItem = blogs.reduce(
    (previous, current) => {
      return current.likes > previous.likes ? current : previous
    },
    { likes: -1 },
  )
  return { title: selItem.title, author: selItem.author, likes: selItem.likes }
}

const maxProperty = (inObject) => {
  return dash.reduce(
    inObject,
    function (result, value, key) {
      return result.value < value ? { property: key, value: value } : result
    },
    { property: null, value: -1 },
  )
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const countsLookup = dash.countBy(blogs, (item) => item.author)
  const mostBlog = maxProperty(countsLookup)
  // logger.info([countsLookup, mostBlog])
  return mostBlog.property
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }
  const likeCountLookup = dash.transform(
    blogs,
    function (result, item) {
      result[item.author]
        ? (result[item.author] += item.likes)
        : (result[item.author] = item.likes)
    },
    {},
  )
  const mostBlog = maxProperty(likeCountLookup)
  // logger.info([mostLikes, mostBlog])
  return mostBlog.property
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
