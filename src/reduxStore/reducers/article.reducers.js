import {createSlice} from '@reduxjs/toolkit'

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
    }
})

export const { action, reducer } = articleSlice
export default reducer