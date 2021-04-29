import { configureStore } from '@reduxjs/toolkit'

import ArticleReducer from './reducers/article.reducers'
import ContentReducer from './contents/content.reducers'

const store = configureStore({
    reducer: {
        article: ArticleReducer,
        content: ContentReducer
    }
})

export default store