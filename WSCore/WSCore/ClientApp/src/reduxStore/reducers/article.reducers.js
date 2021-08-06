import {createSlice} from '@reduxjs/toolkit'
import {
    getDetailArticle,
    getListArticles,
    getArticleBy,
    createArticle,
    updateArticle,
    deleteArticleBy
} from '../actions/category.actions'

const initialState = {
    currentArticle: {},
    currentArticles: []
}

const articleSlice = createSlice({
    name: 'article',
    initialState: initialState,
    reducers: {
        setCurrentArticle: (state, action) => {
            state.currentArticle = action.payload
        },
        setCurrentArticles: (state, action) => {
            state.currentArticles = action.payload
        }
    },
    extraReducers: {
        [getDetailArticle.fulfilled]: (state, action) => {
          state.currentArticle = action?.payload?.result
        },
        [getArticleBy.pending]: (state, action) => {
            state.isLoading = true
        },
        [getArticleBy.fulfilled]: (state, action) => {
            state.currentArticle = action?.payload?.result
            state.isLoading = false
        },
        [getListArticles.fulfilled]: (state, action) => {
            state.currentArticles = action?.payload?.result
        },
        [createArticle.fulfilled]: (state, action) => {
            state.currentArticle = action?.payload?.result
        },
        [updateArticle.fulfilled]: (state, action) => {
            state.isLoading = true
            state.currentArticle = action?.payload?.result
        },
        [deleteArticleBy.pending]: (state, action) => {
            state.isLoading = true
        },
        [deleteArticleBy.fulfilled]: (state, action) => {
            state.currentArticle = action?.payload?.result
            state.isLoading = false
        }
    }
})

export const { action, reducer } = articleSlice
export default reducer