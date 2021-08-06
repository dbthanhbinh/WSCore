import {createSlice} from '@reduxjs/toolkit'
import {
    getDetailCategory,
    getListCategories,
    getCategoryBy,
    createCategory,
    updateCategory,
    deleteCategoryBy
} from '../actions/category.actions'

const initialState = {
    currentCategory: {},
    currentCategories: []
}

const categorySlice = createSlice({
    name: 'category',
    initialState: initialState,
    reducers: {
        setCurrentCategory: (state, action) => {
            state.currentCategory = action.payload
        },
        setCurrentCategories: (state, action) => {
            state.currentCategories = action.payload
            state.isLoading = false
        }
    },
    extraReducers: {
        [getDetailCategory.fulfilled]: (state, action) => {
          state.currentCategory = action?.payload?.result
        },
        [getCategoryBy.pending]: (state, action) => {
            state.isLoading = true
        },
        [getCategoryBy.fulfilled]: (state, action) => {
            state.currentCategory = action?.payload?.result
            state.isLoading = false
        },
        [getListCategories.fulfilled]: (state, action) => {
            state.currentCategories = action?.payload?.result
        },
        [createCategory.fulfilled]: (state, action) => {
            state.currentCategory = action?.payload?.result
        },
        [updateCategory.fulfilled]: (state, action) => {
            state.isLoading = true
            state.currentCategory = action?.payload?.result
        },
        [deleteCategoryBy.pending]: (state, action) => {
            state.isLoading = true
        },
        [deleteCategoryBy.fulfilled]: (state, action) => {
            state.currentCategory = action?.payload?.result
            state.isLoading = false
        }
    }
})

export const { action, reducer } = categorySlice
export default reducer