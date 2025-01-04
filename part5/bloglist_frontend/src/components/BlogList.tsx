import { IBlog } from '../ifx'
import Blog from './Blog'

const BlogList = (props: { blogs: IBlog[] }) => {
  return (
    <div>
      {props.blogs.map((blog: IBlog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogList
