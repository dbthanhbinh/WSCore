import {createSlice} from '@reduxjs/toolkit'
import {
    getDetailArticle,
    getListArticles,
    getArticleById,
    createArticle,
    updateArticle,
    deleteArticleById
} from '../actions/article.actions'

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
        [getArticleById.pending]: (state, action) => {
            state.isLoading = true
        },
        [getArticleById.fulfilled]: (state, action) => {
            state.currentArticle = action?.payload?.result
            state.isLoading = false
        },
        [getListArticles.fulfilled]: (state, action) => {
            state.currentArticles = action?.payload?.result
        },
        [createArticle.fulfilled]: (state, action) => {
            state.currentArticle = action?.payload?.result
        },
        [updateArticle.pending]: (state, action) => {
            state.isLoading = true
        },
        [updateArticle.fulfilled]: (state, action) => {
            state.isLoading = false
            state.currentArticle = action?.payload?.result
        },
        [deleteArticleById.pending]: (state, action) => {
            state.isLoading = true
        },
        [deleteArticleById.fulfilled]: (state, action) => {
            state.currentArticle = action?.payload?.result
            state.isLoading = false
        }
    }
})

export const { action, reducer } = articleSlice
export default reducer