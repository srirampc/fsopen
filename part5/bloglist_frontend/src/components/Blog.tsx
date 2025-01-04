
import { IPropsBlog } from "../ifx"

const Blog = ({ blog } : IPropsBlog) => (
  <div>
    {blog.title} {blog.author}
  </div>  
)

export default Blog
