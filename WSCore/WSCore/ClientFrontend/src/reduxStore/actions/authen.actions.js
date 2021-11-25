import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {AuthenApi} from '../../apis'

const preFixAction = 'authen'
export const logInUser = createAsyncThunk(
    `${preFixAction}/logInUser`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await AuthenApi.logInUser(payload)
        return response
    }
)