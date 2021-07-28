import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {User} from '../../apis'

export const setCurrentUser = createAction('user/setCurrentUser')
export const setCurrentUsers = createAction('user/setCurrentUsers')
export const setUserPermission = createAction('user/setUserPermission')

const preFixAction = 'user'

export const getDetailUser = createAsyncThunk(
    `${preFixAction}/getDetailUser`,
    async (payload) => {
        payload.url = `${preFixAction}/users/${payload.userId}`
        const response = await User.getDetailUser(payload)
        return response
    }
)

export const getUserPermission = createAsyncThunk(
    `${preFixAction}/getUserPermission`,
    async (payload) => {
        payload.url = `${preFixAction}/permissions/${payload.userId}`
        const response = await User.getUserPermission(payload)
        return response
    }
)

export const updateUser = createAsyncThunk(
    `${preFixAction}/updateUser`,
    async (payload) => {
        payload.url = `${preFixAction}/users`
        const response = await User.updateUser(payload)
        return response
    }
)