import BaseAPI from "./base"

class ObjectTagAPI extends BaseAPI {
    async getListObjectTags(payload){
        return await this.getFrom(payload)
    }
}

export default ObjectTagAPI