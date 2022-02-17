import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {MenuApi} from '../../apis'

export const setCurrentMenu = createAction('menu/setCurrentMenu')
export const setCurrentMenus = createAction('menu/setCurrentMenus')

const preFixAction = 'Menus'

// Async actions
export const getListMenus = createAsyncThunk(
    `${preFixAction}/getListMenus`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        return await MenuApi.getListMenus(payload)
    }
)

export const getDetailMenu = createAsyncThunk(
    `${preFixAction}/getDetailMenu`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await MenuApi.getDetailMenu(payload)
        return response
    }
)

export const getMenuBy = createAsyncThunk(
    `${preFixAction}/getMenuBy`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await MenuApi.getDetailMenu(payload)
        return response
    }
)

export const createMenu = createAsyncThunk(
    `${preFixAction}/createMenu`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await MenuApi.createMenu(payload)
        return response
    }
)

export const updateMenu = createAsyncThunk(
    `${preFixAction}/updateMenu`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await MenuApi.updateMenu(payload)
        return response
    }
)

export const deleteMenuBy = createAsyncThunk(
    `${preFixAction}/deleteMenuBy`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await MenuApi.deleteMenuBy(payload)
        return response
    }
)