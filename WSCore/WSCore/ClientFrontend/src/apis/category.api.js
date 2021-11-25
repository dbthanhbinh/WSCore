import BaseAPI from './base'

class CategoryAPI extends BaseAPI {
  async getDetailCategory (payload) {
    return await this.getFrom(payload)
  }

  async getListCategories(payload){
    return await this.getFrom(payload)
  }

  async createCategory(payload){
    return await this.postForm(payload)
  }

  async updateCategory(payload){
    return await this.putForm(payload)
  }

  async deleteCategoryBy(payload){
    return await this.delTo(payload)
  }

}

export default CategoryAPI
