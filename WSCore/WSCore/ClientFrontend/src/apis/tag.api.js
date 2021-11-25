import BaseAPI from "./base"

class TagAPI extends BaseAPI {
    async getListTags(payload){
        return await this.getFrom(payload)
    }

    async getTagById (payload) {
        return await this.getFrom(payload)
    }

    async createTag(payload){
        return await this.postTo(payload)
    }

    async updateTag(payload){
        return await this.putTo(payload)
    }

    async deleteTagBy(payload){
        return await this.delTo(payload)
    }
}

export default TagAPI