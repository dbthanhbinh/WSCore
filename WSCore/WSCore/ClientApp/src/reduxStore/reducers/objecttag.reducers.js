import {createSlice} from '@reduxjs/toolkit'
import {getListObjectTags}
        from '../actions/objecttag.actions'
const initialState = {
    currentObjectTags: [],
    isLoading: false
}

const tagSlide = createSlice(
    {
        name: 'objecttag',
        initialState: initialState,
        reducers: {
            setCurrentObjectTags: (state, action) => {
                state.currentObjectTags = action.payload
            }
        },
        extraReducers: {
            [getListObjectTags.fulfilled]: (state, action) => {
                state.currentObjectTags = action?.payload?.result
            }
        }
    }
)

export const { action, reducer } = tagSlide
export default reducer