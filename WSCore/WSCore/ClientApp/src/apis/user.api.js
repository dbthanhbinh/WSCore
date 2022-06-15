import BaseAPI from './base'

class UserAPI extends BaseAPI {

  async getListUsers (payload) {
    return await this.getFrom(payload)
  }

  async getDetailUser (payload) {
    return await this.getFrom(payload)
  }

  async getUserPermissions (payload) {
    return await this.getFrom(payload)
  }

  async createUser(payload){
    return await this.postTo(payload)
  }

  async updateUser(payload){
    return await this.putTo(payload)
  }

  async deleteUserById(payload){
    return await this.delTo(payload)
  }
}

export default UserAPI
