import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {Article} from '.././../apis'

export const setCurrentArticle = createAction('article/setCurrentArticle')
export const setCurrentArticles = createAction('article/setCurrentArticles')

const preFixAction = 'article'
// Async actions
export const getListArticles = createAsyncThunk(`${preFixAction}/getListArticles`, async (payload) => {
    return await Article.getListArticles(payload)
})


export const getDetailArticle = createAsyncThunk(
    `${preFixAction}/getDetailArticle`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await Article.getDetailArticle(payload)
        return response
    }
)

export const getArticleBy = createAsyncThunk(
    `${preFixAction}/getArticleBy`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await Article.getArticleBy(payload)
        return response
    }
)

export const createArticle = createAsyncThunk(
    `${preFixAction}/createArticle`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await Article.createArticle(payload)
        return response
    }
)

export const updateArticle = createAsyncThunk(
    `${preFixAction}/updateArticle`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await Article.updateArticle(payload)
        return response
    }
)

export const deleteArticleBy = createAsyncThunk(
    `${preFixAction}/deleteArticleBy`,
    async (payload) => {
        payload.url = `${preFixAction}/${payload.url}`
        const response = await Article.deleteArticleBy(payload)
        return response
    }
)
