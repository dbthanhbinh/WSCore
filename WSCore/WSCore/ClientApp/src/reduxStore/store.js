import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './reducers/user.reducers'
import CategoryReducer from './reducers/category.reducers'
import TagReducer from './reducers/tag.reducers'

const store = configureStore({
    reducer: {
        user: UserReducer,
        category: CategoryReducer,
        tag: TagReducer
    }
})

export default store