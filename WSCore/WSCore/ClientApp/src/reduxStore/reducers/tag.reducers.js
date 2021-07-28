import {createSlice} from '@reduxjs/toolkit'
import {getListTags, createTag}
        from '../actions/tag.actions'
const initialState = {
    currentTag: null,
    currentTags: [],
    isLoading: false
}

const tagSlide = createSlice(
    {
        name: 'tag',
        initialState: initialState,
        reducers: {
            setCurrentTag: (state, action) => {
                state.currentTag = action.payload
            },
            setCurrentTags: (state, action) => {
                state.currentTags = action.payload
            }
        },
        extraReducers: {
            [createTag.pending]: (state, action) => {
                state.isLoading = true
            },
            [createTag.fulfilled]: (state, action) => {
                state.currentTag = action?.payload?.result
                state.isLoading = false
            },
            [getListTags.fulfilled]: (state, action) => {
                state.currentTags = action?.payload?.result
            }
        }
    }
)

export const { action, reducer } = tagSlide
export default reducer