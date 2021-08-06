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

/**
 * @description {} Build data option for select|Dropdown Ex: { key: 'm', text: 'Male', value: 'male' },
 * @param {*} originalDataList as array
 * @returns {} newOptionList as array Ex: { key: 'm', text: 'Male', value: 'male' }
 */
export function buildDataOption(originalDataList=[]) {
    let newOptionList = []
    if(_.isEmpty(originalDataList) || (originalDataList && originalDataList.length <= 0))
        return newOptionList

    originalDataList.forEach(ele => {
        newOptionList.push({ key: ele.id, value: ele.id, text: ele.name, disabled: true })
    });

    return newOptionList
}

// ------------------------------------------------------------------------------
export function findChildIdsWithId(dataList, id, level=1){
    if(!dataList || !id || level < 1 || level > 3) return null

    let childIds = []
    dataList.forEach((item, i) => {
        if(item.parentid === id)
        {
            item.level = level
            childIds.push(item)
            dataList.splice(i, 1)
        }
    })

    return {childIds, dataList}
}

export function getCharPrefix(level){
    let char = ''
    if(level === 2){
        char = '|--'
    } else if(level === 3){
        char = '|--|--'
    }
    // console.log(char)
    return char    
}

export function buildDisableDropdownItem(dropdownList, currentItemId, currentItemLevel, maxLevel) {
    if(!dropdownList) return null;
    
    dropdownList.forEach((item, i) => {
        dropdownList[i].text = getCharPrefix(item.level) ? `${getCharPrefix(item.level)} ${item.text}` : `${item.text}`
        
        if(item.id === currentItemId){
            dropdownList[i].disabled = true
        } else if(item.level >= currentItemLevel) {
            dropdownList[i].disabled = true
        }
    })
    return dropdownList
}

// id = 16
export function buildRelatedParentChilds(dataList, parentId, level = 1, maxLevel) {
    if(!dataList || !parentId || dataList.length < 1 || level < 1 || level > maxLevel)
        return []

    var newList=[]
    dataList.forEach((item, i) => {
        if(item.parentid === parentId){
            item.level = level
            newList.push(item)
            let childs = findChildIdsWithId(dataList, item.id, level+1)
            if(childs && childs.childIds.length > 0){
                newList = newList.concat(childs.childIds)
                newList = newList.concat(buildRelatedParentChilds(childs.dataList, item.id, level+1))
            }
        }
    })
    return newList
}

// Just build data option with id, key, value, text, disabled
export function buildDataOption2(originalDataList=[], currentItemId, currentItemLevel, maxLevel = 3) {
    let newOptionList = []
    if(!originalDataList || _.isEmpty(originalDataList) || (originalDataList && originalDataList.length <= 0)) {
        return newOptionList
    }

    (originalDataList && originalDataList.length > 0) && originalDataList.forEach(ele => {
        newOptionList.push({id: ele.id, parentid: ele.parentId , key: ele.id, value: ele.id, text: ele.name })
    });

    // Group list matched with parentId
    newOptionList = buildRelatedParentChilds(newOptionList, -1, 1, maxLevel)

    newOptionList = buildDisableDropdownItem(newOptionList, currentItemId, currentItemLevel, maxLevel)
    // console.log('====newOptionList:', newOptionList)
    return newOptionList
}

// Just build data option with id, key, value, text, disabled
export function buildDataOptionNormal(originalDataList=[]) {
    let newOptionList = []
    if(!originalDataList || _.isEmpty(originalDataList) || (originalDataList && originalDataList.length <= 0)) {
        return newOptionList
    }
    (originalDataList && originalDataList.length > 0) && originalDataList.forEach(ele => {
        newOptionList.push({id: ele.id, parentid: ele.parentId , key: ele.id, value: ele.id, text: ele.name })
    });
    return newOptionList
}

// For get Media
export function buildThumbnailSrc(src) {
    if(!src) return null
    
    return `${getUploadFolder()}${src}`
}

export function getMediaWithThumbnail(mediasList) {
    if(!mediasList) return null

    let newItem = null
    mediasList.forEach((item) => {
        if(item.mediaType === 'thumbnail'){
            newItem = item
        }
    })
    return newItem
}