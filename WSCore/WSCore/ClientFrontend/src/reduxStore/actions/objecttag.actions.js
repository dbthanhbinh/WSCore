import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import {ObjectTagApi} from '../../apis'

const preFixAction = 'objecttag'

export const setCurrentObjectTags = createAction(`${preFixAction}/setCurrentObjectTags`)

// Async actions
export const getListObjectTags = createAsyncThunk(
    `${preFixAction}/getListObjectTags`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        return await ObjectTagApi.getListObjectTags(payload)
    }
)