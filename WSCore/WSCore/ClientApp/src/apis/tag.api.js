import BaseAPI from "./base"

class TagAPI extends BaseAPI {
    async getListTags(payload){
        return await this.getFrom(payload)
    }

    async createTag(payload){
        return await this.postTo(payload)
    }
}

export default TagAPI