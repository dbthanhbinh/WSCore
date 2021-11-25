import { createAction, createAsyncThunk } from "@reduxjs/toolkit"
import {TagApi} from '../../apis'

const preFixAction = 'tag'

export const setCurrentTag = createAction(`${preFixAction}/setCurrentTag`)
export const setCurrentTags = createAction(`${preFixAction}/setCurrentTags`)

// Async actions
export const getListTags = createAsyncThunk(
    `${preFixAction}/getListTags`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        return await TagApi.getListTags(payload)
    }
)

export const getDetailTag = createAsyncThunk(
    `${preFixAction}/getDetailTag`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await TagApi.getDetailTag(payload)
        return response
    }
)

export const getTagById = createAsyncThunk(
    `${preFixAction}/getTagById`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await TagApi.getTagById(payload)
        return response
    }
)

export const createTag = createAsyncThunk(
    `${preFixAction}/createTag`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        return await TagApi.createTag(payload)
    }
)

export const updateTag = createAsyncThunk(
    `${preFixAction}/updateTag`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await TagApi.updateTag(payload)
        return response
    }
)

export const deleteTagBy = createAsyncThunk(
    `${preFixAction}/deleteTagBy`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await TagApi.deleteTagBy(payload)
        return response
    }
)