import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notficationReducer'
import blogReducer from './reducers/blogReducer'
import newBlogReducer from './reducers/newBlogReducer'
import userReducer from './reducers/userReducer'
import blogUserReducer from './reducers/blogUserReducer'

const store = configureStore({
  reducer: {
    newBlog: newBlogReducer,
    blogs: blogReducer,
    loggedInUser: userReducer,
    notification: notificationReducer,
    blogUsers: blogUserReducer
  }
})

// Get the type of our store variable
export type AppStore = typeof store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch']

export default store
