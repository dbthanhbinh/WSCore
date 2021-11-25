import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {Content} from '.././../apis'

export const setCurrentProviders = createAction('content/setCurrentProviders')
export const setCurrentTypes = createAction('content/setCurrentTypes')

const preFixAction = 'content'
// Async actions
export const getProviders = createAsyncThunk(`${preFixAction}/getProviders`, async () => {
    return await Content.getProviders()
})

export const getTypes = createAsyncThunk(`${preFixAction}/getTypes`, async () => {
    return await Content.getTypes()
})