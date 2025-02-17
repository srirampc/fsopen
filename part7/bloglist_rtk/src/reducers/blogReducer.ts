import { IBlog } from '../ifx'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '../store'
import blogService from '../services/blogs'

const emptyState: IBlog[] = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState: emptyState,
  reducers: {
    updateBlogs(state: IBlog[], action: PayloadAction<IBlog>) {
      const fid = action.payload.id
      const foundNote = state.find((anx) => anx.id === fid)
      if (foundNote) {
        return state.map((anx) =>
          anx.id !== fid ? anx : { ...action.payload },
        )
      } else {
        return state
      }
    },
    removeBlog(state: IBlog[], action: PayloadAction<IBlog>) {
      const fid = action.payload.id
      const foundNote = state.find((anx) => anx.id === fid)
      if (foundNote) {
        return state.filter((anx) => anx.id !== fid)
      } else {
        return state
      }
    },
    setBlogs(_st: IBlog[], action: PayloadAction<IBlog[]>) {
      return action.payload
    },
    appendBlog(state: IBlog[], action: PayloadAction<IBlog>) {
      state.push(action.payload)
    },
  }
})


export const { updateBlogs, removeBlog, setBlogs, appendBlog } =
    blogSlice.actions


export const initializeBlogs = () => {
  return async (dispatch: AppDispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs as IBlog[]))
  }
}

export const createBlog = (newBlog: IBlog) => {
  return async (dispatch: AppDispatch) => {
    const addexBlog = await blogService.create(newBlog)
    console.log(addexBlog)
    dispatch(appendBlog(addexBlog as IBlog))
  }
}

export const likeBlog = (blog: IBlog) => {
  return async (dispatch: AppDispatch) => {
    const updBlog = await blogService.update({
      ...blog,
      likes: blog.likes + 1,
    })
    console.log(updBlog)
    dispatch(updateBlogs(updBlog as IBlog))
  }
}

export const deleteBlog = (delBlog: IBlog) => {
  return async (dispatch: AppDispatch) => {
    await blogService.deleteBlog(delBlog).then(() => {
      dispatch(removeBlog(delBlog as IBlog))
    })
  }
}


export default blogSlice.reducer
