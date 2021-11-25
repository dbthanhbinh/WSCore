import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {Category} from '../../apis'

export const setCurrentCategory = createAction('category/setCurrentCategory')
export const setCurrentCategories = createAction('category/setCurrentCategories')

const preFixAction = 'Category'

export const getDetailCategory = createAsyncThunk(
    `${preFixAction}/getDetailCategory`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await Category.getDetailCategory(payload)
        return response
    }
)

export const getCategoryBy = createAsyncThunk(
    `${preFixAction}/getCategoryBy`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await Category.getDetailCategory(payload)
        return response
    }
)

// Async actions
export const getListCategories = createAsyncThunk(
    `${preFixAction}/getListCategories`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        return await Category.getListCategories(payload)
    }
)

export const createCategory = createAsyncThunk(
    `${preFixAction}/createCategory`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await Category.createCategory(payload)
        return response
    }
)

export const updateCategory = createAsyncThunk(
    `${preFixAction}/updateCategory`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await Category.updateCategory(payload)
        return response
    }
)

export const deleteCategoryBy = createAsyncThunk(
    `${preFixAction}/deleteCategoryBy`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await Category.deleteCategoryBy(payload)
        return response
    }
)