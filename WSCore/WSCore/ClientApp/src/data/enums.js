export const cookiesDefault = {
    key: 'app_core_cookies'
}

export const actions = {
    ADD: 'Add',
    EDIT: 'Edit',
    DELETE: 'Delete',
    READONLY: 'Readonly'
}

export const objectDefault = {
    ARTICLE: 'post',
    CATEGORY: 'category'
}

// User action on module
export const userActions = [
    {
        name: actions.READONLY,
        key: 'Readonly',
        label: 'Readonly'
    },
    {
        name: actions.ADD,
        key: 'Add',
        label: 'Add'
    },
    {
        name: actions.EDIT,
        key: 'Edit',
        label: 'Edit'
    },
    {
        name: actions.DELETE,
        key: 'Delete',
        label: 'Delete'
    }
]

// will be remove
export const pagingDefault = {
    firstPage: 1,
    numberPostOfPage: 5,
}

export const fieldType = {
    textField: 'textField',
    radioField: 'radioField',
    checkboxField: 'checkboxField'
}

export const textLength = {
    textMin: 3,
    textMax: 70,
    textAreaMin: 3,
    textAreaMax: 255,
}

export const validMsg = {
    field_not_allowed_empty: '%s không được trống!',
    field_not_allowed_min: '%s không nhỏ hơn %d ký tự',
    field_not_allowed_max: '%s không lớn hơn %d ký tự',
    field_not_allowed_special: '%s không cho phép ký tự đặc biệt'
}

export const controlled = {
    ARTICLES: 'articles',
    CATEGORIES: 'categories',
    TAGS: 'tags',
    MEDIAS: 'medias'
}

export const storedKey = {
    FETCH_DATA: 'fetchData',
    EDIT_DATA: 'editData'
}

export const stored = {
    tagStored: [],
    categoryStored: [],
    articleStored: []
}

export const storedName = {
    tagStored: 'tagStored',
    categoryStored: 'categoryStored',
    articleStored: 'articleStored'
}

// regex special characters escape 
export const regexEscape  = /^[a-zA-Z0-9!@#$%^&*)(+=._-]+$/g
export const notAllowSpecial= /[`~,.<>;':"/[\]|{}()]/g;

// Media assets
export const uploadedAssets = 'uploads'