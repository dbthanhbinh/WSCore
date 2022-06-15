import { configureStore } from '@reduxjs/toolkit'

import UserReducer from './reducers/user.reducers'
import CategoryReducer from './reducers/category.reducers'
import TagReducer from './reducers/tag.reducers'
import ArticleReducer from './reducers/article.reducers'
import ObjectTagReducer from './reducers/objecttag.reducers'
import AuthenReducer from './reducers/authen.reducers'
import ConfigReducer from './reducers/config.reducers'
import MenuReducer from './reducers/menu.reducers'

const store = configureStore({
    reducer: {
        authenStore: AuthenReducer,
        userStore: UserReducer,
        categoryStore: CategoryReducer,
        tagStore: TagReducer,
        articleStore: ArticleReducer,
        objecttagStore: ObjectTagReducer,
        configStore: ConfigReducer,
        menuStore: MenuReducer
    }
})

export default store