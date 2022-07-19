export const cookiesDefault = {
    key: 'ws_core_cookies'
}

export const controlled = {
    ARTICLES: 'articles',
    CATEGORIES: 'categories',
    TAGS: 'tags',
    MENUS: 'menus',
    MEDIAS: 'medias',
    USERS: 'users',
    AUTHEN: 'authen'
}

export const objectDefault = {
    ARTICLE: 'post',
    CATEGORY: 'category',
    MENU: 'primary'
}

export const actions = {
    ADD: 'Add',
    EDIT: 'Edit',
    DELETE: 'Delete',
    READONLY: 'Readonly',
    ONLYME: 'onlyme',
    OTHER: 'other'
}


// User action on module
export const userActions = [
    {
        name: actions.READONLY,
        key: actions.READONLY,
        label: actions.READONLY
    },
    {
        name: actions.ADD,
        key: actions.ADD,
        label: actions.ADD
    },
    {
        name: actions.EDIT,
        key: actions.EDIT,
        label: actions.EDIT
    },
    {
        name: actions.DELETE,
        key: actions.DELETE,
        label: actions.DELETE
    },
    {
        name: actions.ONLYME,
        key: actions.ONLYME,
        label: actions.ONLYME
    },
    {
        name: actions.OTHER,
        key: actions.OTHER,
        label: actions.OTHER
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

// Flash notification
export const flashType = {
    ERROR: 'Error',
    SUCCESS: 'Success'
}