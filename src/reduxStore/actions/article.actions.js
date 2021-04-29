import {createAction, createAsyncThunk} from '@reduxjs/toolkit'
import {Article} from '.././../apis'

export const setCurrentArticle = createAction('article/setCurrentArticle')
export const setCurrentArticles = createAction('article/setCurrentArticles')

const preFixAction = 'article'
// Async actions
export const getListArticles = createAsyncThunk(`${preFixAction}/getListArticles`, async (payload) => {
    return await Article.getListArticles(payload)
})