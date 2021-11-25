import _ from 'lodash'
import { sprintf } from 'sprintf-js'
import { textLength, validMsg, notAllowSpecial } from '../data/enums'

export function getUploadFolder() {
    return '/Uploads/'
}

export function getInputData(e, data){
    let target = (e && e.target) ? e.target : {}
    let name = target && target.name ? target.name : (data && data.name ? data.name : '')
    let value = target && target.value ? target.value : (data && data.value ? data.value : '')
    let checked = target && _.isBoolean(target.checked) ? target.checked : (data && _.isBoolean(data.checked) ? data.checked : '')
    let type = target && target.type ? target.type : (data && data.type ? data.type : '')
    if (type === 'checkbox') value = checked ? 1 : 0
    if(type === 'file') value = e.target.files[0]
    return { name, value }
}

export function initModel(rawModel, isInitModel){
    let model = rawModel ? rawModel : {}
    if(model){
        Object.keys(model).forEach((key) => {
            model[key] = initRequired(model[key])
            model[key] = validatorField(model[key], key)
            model[key].isInitModel = isInitModel
        })
    }
    let _valid = _.some(model, { 'isValid': false });
    return { model, isFormValid: !_valid }
}

export function reInitModel(rawModel, isInitModel){
    let model = rawModel ? rawModel : {}
    if(model){
        Object.keys(model).forEach((key) => {
            model[key] = validatorField(model[key], key)
            model[key].isInitModel = isInitModel
        })
    }
    let _valid = _.some(model, { 'isValid': false });
    return { model, isFormValid: !_valid }
}

export function resetModel(rawModel, isInitModel){
    let model = rawModel ? rawModel : {}
    if(model){
        Object.keys(model).forEach((key) => {
            model[key].value = ''
            model[key].isInitModel = isInitModel
        })
    }
    let _valid = _.some(model, { 'isValid': false });
    return { model, isFormValid: !_valid }
}

export function setFieldValue(name, value, model){
    if(model && model[name]) {
        model[name].value = value
        model[name] = validatorField(model[name], name)

        let _valid = _.some(model, { 'isValid': false });
        return { model: model, isFormValid: !_valid }
    }
}

// Validation one of fields in model => return field validted
// fieldModel = model[fieldKey]
export function validatorField(fieldModel){
    if(fieldModel){
        if(fieldModel.validators && fieldModel.validators.length > 0){
            fieldModel.validators.forEach((item) => {
                let flag = false
                if(item.required){
                    fieldModel.required = isRequired(item.required)
                    let { isValid, message } = checkValidEmptyText(fieldModel.value, fieldModel.label)
                    fieldModel.isValid = isValid
                    fieldModel.message = message
                    fieldModel.isInitModel = false
                    if(message)
                        flag = true
                }
                if(flag) return fieldModel

                if(item.isCheckLenString){
                    let { isValid, message } = checkValidLengthText(fieldModel.value, fieldModel.minLength || null, fieldModel.maxLength || null, fieldModel.label)
                    fieldModel.isValid = isValid
                    fieldModel.message = message
                    fieldModel.isInitModel = false
                    if(message)
                        flag = true
                }
                if(flag) return fieldModel

                if(item.isCheckMaxString){
                    let { isValid, message } = checkValidMaxLengthText(fieldModel.value, fieldModel.maxLength || null, fieldModel.label)
                    fieldModel.isValid = isValid
                    fieldModel.message = message
                    fieldModel.isInitModel = false
                    if(message)
                        flag = true
                }
                if(flag) return fieldModel

                if(item.isCheckAllowSpecial){
                    let { isValid, message } = checkValidAllowSpecialText(fieldModel.value, notAllowSpecial, fieldModel.label)
                    fieldModel.isValid = isValid
                    fieldModel.message = message
                    fieldModel.isInitModel = false
                    if(message)
                        flag = true
                }
                if(flag) return fieldModel
            })
        } else {
            fieldModel.isInitModel = false
            fieldModel.isValid = true
            fieldModel.message = null
        }
    }
    return fieldModel
}

// Init required for the first render component
export function initRequired(fieldModel){
    if(fieldModel){
        if(fieldModel.validators && fieldModel.validators.length > 0){
            fieldModel.validators.forEach((item) => {
                if(item.required){
                    fieldModel.required = isRequired(item.required)
                    
                }
            })
        }
    }
    return fieldModel
}

// Validation all fields in model
export function validatorModel(rawModel){
    let model = rawModel ? rawModel : {}

    if(model){
        Object.keys(model).forEach((key) => {
            model[key] = validatorField(model[key], key)
        })
    }
    let _valid = _.some(model, { 'isValid': false });
    return { model, isFormValid: !_valid }
}

function isRequired(required) {
    return required
}

// Check string is not empty and have minLength & maxLength default
function checkValidEmptyText(str, name = null) {
    if(!(typeof str === "string" && str.length > 0)) {
        return { isValid: false, message: sprintf(validMsg.field_not_allowed_empty, name) }
    }    
    return { isValid: true, message: null }
}

function checkValidLengthText(str, minLength, maxLength, name = null) {
    if(!minLength) minLength = textLength.textMin
    if(!maxLength) maxLength = textLength.textMax

    if(str.length < minLength) {
        return { isValid: false, message: sprintf(validMsg.field_not_allowed_min, name, minLength) }
    } else if(str.length > maxLength) {
        return { isValid: false, message: sprintf(validMsg.field_not_allowed_max, name, maxLength) }
    }
    return { isValid: true, message: null }
}

function checkValidAllowSpecialText(str, allowPattern, name = 'Title') {
    if(str.length > 0 && allowPattern.test(str)) {
        return { isValid: false, message: sprintf(validMsg.field_not_allowed_special, name) }
    } else return { isValid: true, message: null }
}

function checkValidMaxLengthText(str, maxLength, name = null) {
    if(!maxLength) maxLength = textLength.textMax
    if(str?.length > maxLength) {
        return { isValid: false, message: sprintf(validMsg.field_not_allowed_max, name, maxLength) }
    }
     
    return { isValid: true, message: null }
}

// Append Data to form before excu post form data to API
export function appendFormData(body) {
    let formData = new FormData()
    if(body && _.isObject(body) && !_.isEmpty(body)) {
        Object.keys(body).forEach((key) => {
            let bdData = body[key];
            formData.append(key, bdData) 
        })
    }
    return formData
}