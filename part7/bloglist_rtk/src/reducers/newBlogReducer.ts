import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBlog } from '../ifx'

const emptyState: IBlog = {
  title: '',
  author: '',
  url: '',
  likes: 0,
}

const newBlogSlice = createSlice({
  name: 'blogs',
  initialState: emptyState,
  reducers: {
    setTitle(state: IBlog, action: PayloadAction<string>) {
      return { ...state, title: action.payload }
    },
    setAuthor(state: IBlog, action: PayloadAction<string>) {
      return {
        ...state, author: action.payload
      }
    },
    setUrl(state: IBlog, action: PayloadAction<string>) {
      return { ...state, url: action.payload }
    },
    setLikes(state: IBlog, action: PayloadAction<number>) {
      return { ...state, likes: action.payload }
    },
    resetNewBlog() {
      return emptyState
    }
  }
})

export const { setTitle, setAuthor, setUrl, setLikes, resetNewBlog } =
  newBlogSlice.actions


export default newBlogSlice.reducer
