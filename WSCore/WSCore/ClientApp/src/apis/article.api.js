import BaseAPI from './base'

class ArticleAPI extends BaseAPI {
  
  async getListArticles (payload) {
    return await this.getFrom(payload)
  }

  async getListArticlesByType (payload) {
    return await this.getFrom(payload)
  }
  
  async createArticle(payload){
    return await this.postForm(payload)
  }

  async getArticleById (payload) {
    return await this.getFrom(payload)
  }

  async updateArticle(payload){
    return await this.putForm(payload)
  }

  async deleteArticleById(payload){
    return await this.delTo(payload)
  }
}

export default ArticleAPI
