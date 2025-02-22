import { IBlog } from '../ifx'
import { useAppSelector } from '../hooks'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useAppSelector((state) => state.blogs)

  // <Blog key={blog.id} />
  return (
    <div data-testid="blog-list-root" id="blog-list-root">
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog: IBlog) => (
          <div key={blog.id} className="blog-link">
            <Link to={`/blogs/${blog.id}`} key={blog.id}>
              {blog.title}
            </Link>
          </div>
        ))}
    </div>
  )
}

export default BlogList
