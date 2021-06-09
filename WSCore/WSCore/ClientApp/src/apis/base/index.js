import _ from 'lodash'
const apiName = 'v1/'
const apiResources = `http://localhost:5000/${apiName}`

const methods = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT'
}

class BaseAPI {
    constructor (conf) {
        this.apiResources = apiResources
        this.headers = { 
            'Access-Control-Allow-Origin': '*',
            'Content-type': 'application/json',
            'Accept': 'application/json',
            'Authorization': null
        }

        this._conf = {
            headers: new Headers(this.headers),
            method: methods.GET, // Default get method
            body: null
        }
    }

    async _fetch(url, options, cb){
        if(url){
            fetch(url, null)
            .then(response => {
                return this.handleResponse(response, cb)                
            }).then(json => {
                // return this.handleThenResponse(json, cb)
                return json
            }).catch(error => {
                return this.handleErrorCatched(error, cb)
            })
        } else {
            return this.handleErrorApiResourcesIsNull(cb)
        } 
    }

    appendFormData(body){
        let formData = new FormData()
        if(body && _.isObject(body) && !_.isEmpty(body)) {
            Object.keys(body).forEach((key) => {
                let bdData = body[key];
                formData.append(key, bdData) 
            })
        }
        return formData
    }

    handleErrorCatched(err, cb = null){
        console.log(err)
        return cb(err, null)
    }

    handleResponse(response, cb){
        if(response.ok){
            return response.json()
        } else {
            return cb(response.statusText, null)
        }
    }

    handleThenResponse(json, cb){
        if(json)
            return cb && typeof cb === 'function' && cb(null, json)
        else
            return cb && typeof cb === 'function' && cb('Error', null)
    }

    

    // Handle cb whern the public url is invalid
    handleErrorApiResourcesIsNull(cb) {
        let error = 'Error: Rest apiResources is null!'
        console.log(error)
        return cb(error, null)
    }

    // ==========================================================
    /**
     * This for get method
     * @param {*} payload 
     * @param {*} cb 
     */
     async get(payload, cb) {
        const {url} = this.getApiResourcesFromPayload(payload)
        let options = this._conf
            delete options['body']
        return await this._fetch(url, options, cb);
    }

    post(payload, cb){
        const {url, body} = this.getApiResourcesFromPayload(payload)
        let options = this._conf
            options.method = methods.POST
            options.body = body
        this._fetch(url, options, cb)
    }
    
    put(payload, cb){
        const {url, body} = this.getApiResourcesFromPayload(payload)
        let options = this._conf
            options.method = methods.PUT
            options.body = body
        this._fetch(url, options, cb)
    }

    // --------------------
    postForm(payload, cb){
        const {url, body} = this.getApiResourcesFromPayload(payload, true)
        let formData = new FormData()
        formData = this.appendFormData(body)
        let options = this._conf
            options.method = methods.POST
            options.body = formData
        return fetch(url, options, cb)
    }

    putForm(payload, cb){
        const {url, body} = this.getApiResourcesFromPayload(payload, true)
        let formData = new FormData()
        formData = this.appendFormData(body)

        let options = this._conf
            options.method = methods.PUT
            options.body = formData
        return fetch(url, options, cb)
    }

    postNoneToken(payload, cb){
        const {url, body} = this.getApiResourcesFromPayload(payload)
        let options = this._conf
            options.method = methods.POST
            options.body = body
        this._fetch(url, options, cb)
    }



    // async _fetch(url, options, cb){
    //     if(url){
    //         fetch(url, null)
    //         .then(response => {
    //             return this.handleResponse(response, cb)                
    //         }).then(json => {
    //             // return this.handleThenResponse(json, cb)
    //             return json
    //         }).catch(error => {
    //             return this.handleErrorCatched(error, cb)
    //         })
    //     } else {
    //         return this.handleErrorApiResourcesIsNull(cb)
    //     } 
    // }









    /**
     * 
     * @param {*} payload 
     * @param {*} isBodyFromFormPayload to check if get body from Form or not
     */
   getApiResourcesFromPayload(payload, isBodyFromFormPayload = false) {
        let apiResources = {url: null, body: null}
        let payloadUrl = _.get(payload, 'url')
        let payloadBody = _.get(payload, 'body')
        apiResources.url = payloadUrl ? this.apiResources + payloadUrl : null

        if(payloadBody) {
            apiResources.body = isBodyFromFormPayload ? payloadBody : JSON.stringify(payloadBody)
        }
        return apiResources
    }

    async _fetch2(url, options = null){
        if(!url) return

        try {
            let response = await fetch(url, options)
            return await response.json()

        } catch (error) {
            console.log('Fetch error: ', error);
        }
    }

    async getFrom(payload) {
        const {url} = this.getApiResourcesFromPayload(payload)
        let options = this._conf
            delete options['body']
        return await this._fetch2(url, options)
    }

    // Update Api
    async putTo(payload){
        const {url, body} = this.getApiResourcesFromPayload(payload)
        let options = this._conf
            options.method = methods.PUT
            options.body = body
        return await this._fetch2(url, options)
    }
}

export default BaseAPI
