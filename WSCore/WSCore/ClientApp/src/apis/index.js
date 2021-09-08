import ArticleAPI from './article.api'
import ContentAPI from './content.api'
import UserAPI from './user.api'
import CategoryAPI from './category.api'
import TagAPI from './tag.api'
import ObjectTagAPI from './objecttag.api'

export const Content = new ContentAPI()
export const Article = new ArticleAPI()
export const UserApi = new UserAPI()
export const Category = new CategoryAPI()
export const TagApi = new TagAPI()
export const ObjectTagApi = new ObjectTagAPI()
