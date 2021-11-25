import BaseAPI from './base'

class UserAPI extends BaseAPI {
  async logInUser(payload){
    return await this.postTo(payload)
  }
}

export default UserAPI
