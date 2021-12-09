import BaseAPI from './base'

// Fake
import {providers, types} from '../data'

class ContentAPI extends BaseAPI {
  
  async getProviders () {
    return await providers
  }

  async getTypes () {
    return await types
  }

}

export default ContentAPI