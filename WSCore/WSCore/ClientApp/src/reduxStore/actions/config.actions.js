import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {ConfigApi} from '../../apis'

const preFixAction = 'config'
export const setCurrentPermissions = createAction(`${preFixAction}/setCurrentPermissions`)
export const setUserProfile = createAction(`${preFixAction}/setUserProfile`)
export const setCurrentFlash = createAction(`${preFixAction}/setCurrentFlash`)

export const getAppConfigs = createAsyncThunk(
    `${preFixAction}/getAppConfigs`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await ConfigApi.getAppConfigs(payload)
        return response
    }
)