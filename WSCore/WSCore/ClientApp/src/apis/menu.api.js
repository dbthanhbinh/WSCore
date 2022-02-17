import BaseAPI from './base'

class MenuAPI extends BaseAPI {
  async getListMenus(payload){
    return await this.getFrom(payload)
  }

  async getDetailMenu (payload) {
    return await this.getFrom(payload)
  }

  async createMenu(payload){
    return await this.postForm(payload)
  }

  async updateMenu(payload){
    return await this.putForm(payload)
  }

  async deleteMenuBy(payload){
    return await this.delTo(payload)
  }
  
}

export default MenuAPI
