import BaseAPI from './base'

class UserAPI extends BaseAPI {
  async getDetailUser (payload) {
    return await this.getFrom(payload)
  }

  async getUserPermission (payload) {
    return await this.getFrom(payload)
  }

  async updateUser(payload){
    return await this.putTo(payload)
  }
}

export default UserAPI
