import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './reducers/user.reducers'
import CategoryReducer from './reducers/category.reducers'
import TagReducer from './reducers/tag.reducers'
import ArticleReducer from './reducers/article.reducers'
import ObjectTagReducer from './reducers/objecttag.reducers'

const store = configureStore({
    reducer: {
        user: UserReducer,
        category: CategoryReducer,
        tag: TagReducer,
        article: ArticleReducer,
        objecttag: ObjectTagReducer
    }
})

export default store