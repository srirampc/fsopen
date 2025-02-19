import { IBlog, IPropsBlogList } from '../ifx'
import Blog from './Blog'
import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

const BlogList = (props: IPropsBlogList) => {
  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
    retry: false,
  })
  console.log('CLOG : ', JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>loading anecdotes data...</div>
  }

  if (result.isError) {
    if (result.error.message.includes('Network Error')) {
      return (
        <div>
          Error: blog service not available due to problems in the server.
        </div>
      )
    }
    return <div>Error: {result.error.message}</div>
  }

  const blogs: IBlog[] = result.data
  return (
    <div data-testid="blog-list-root" id="blog-list-root">
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog: IBlog) => (
          <Blog
            key={blog.id}
            blog={blog}
            user={props.user}
          />
        ))}
    </div>
  )
}

export default BlogList
