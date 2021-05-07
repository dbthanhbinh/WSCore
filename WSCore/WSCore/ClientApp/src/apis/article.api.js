import BaseAPI from './base'

// Fake
import {listItem} from '../data'

class ArticleAPI extends BaseAPI {
  
  async getListArticles (payload) {
    return await listItem
  }

}

export default ArticleAPI
