import { useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks'
import { IBlog } from '../ifx'

const BlogUser = () => {
    const id = useParams().id
    const blogUsers = useAppSelector((state) => state.blogUsers)
    const blogUser = blogUsers.find((buser) => buser.id === id)
    if (blogUser) {
        return (
            <div>
                <h2>{blogUser.name}</h2>
                <h3>Added Blogs</h3>
                <ul>
                    {[...blogUser.blogs]
                        .sort((a, b) => b.likes - a.likes).map((blog: IBlog) => (
                            <li key={blog.id}>{blog.title}</li>

                        ))}
                </ul>
            </div>
        )
    } else {
        return null
    }
}

export default BlogUser
