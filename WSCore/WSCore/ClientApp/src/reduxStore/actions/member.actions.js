import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {UserApi} from '../../apis'

export const setCurrentUser = createAction('user/setCurrentUser')
export const setCurrentUsers = createAction('user/setCurrentUsers')
export const setUserPermission = createAction('user/setUserPermission')

const preFixAction = 'user'

export const getListUsers = createAsyncThunk(
    `${preFixAction}/getListUsers`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        return await UserApi.getListUsers(payload)
    }
)

export const getDetailUser = createAsyncThunk(
    `${preFixAction}/getDetailUser`,
    async (payload) => {
        payload.url = `${preFixAction}/users/${payload.userId}`
        const response = await UserApi.getDetailUser(payload)
        return response
    }
)

export const getUserPermission = createAsyncThunk(
    `${preFixAction}/getUserPermission`,
    async (payload) => {
        payload.url = `${preFixAction}/permissions/${payload.userId}`
        const response = await UserApi.getUserPermission(payload)
        return response
    }
)

export const createUser = createAsyncThunk(
    `${preFixAction}/createUser`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await UserApi.createUser(payload)
        return response
    }
)

export const updateUser = createAsyncThunk(
    `${preFixAction}/updateUser`,
    async (payload) => {
        payload.url = `${preFixAction}/users`
        const response = await UserApi.updateUser(payload)
        return response
    }
)

export const deleteUserById = createAsyncThunk(
    `${preFixAction}/deleteUserById`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await UserApi.deleteUserById(payload)
        return response
    }
)