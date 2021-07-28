import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import {TagApi} from '../../apis'

const preFixAction = 'tag'

export const setCurrentTag = createAction(`${preFixAction}/setCurrentTag`)
export const setCurrentTags = createAction(`${preFixAction}/setCurrentTags`)

// Async actions
export const getListTags = createAsyncThunk(
    `${preFixAction}/getListTags`,
    async (payload) => {
        return await TagApi.getListTags(payload)
    }
)

export const createTag = createAsyncThunk(
    `${preFixAction}/createTag`,
    async (payload) => {
        return await TagApi.createTag(payload)
    }
)