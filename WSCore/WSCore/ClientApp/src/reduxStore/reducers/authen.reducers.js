import {createSlice} from '@reduxjs/toolkit'
import {logInUser} from '../actions/authen.actions'

const initialState = {
    currentAuthen: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        // setCurrentAuthen: (state, action) => {
        //     state.currentAuthen = action.payload
        // }
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [logInUser.fulfilled]: (state, action) => {
            state.currentAuthen = action?.payload?.result
        }
    }
})

export const { action, reducer } = userSlice
export default reducer