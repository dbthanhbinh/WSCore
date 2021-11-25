import BaseAPI from './base'

class ConfiAPI extends BaseAPI {
  async getAppConfigs(payload){
    return await this.getFrom(payload)
  }
}
export default ConfiAPI
