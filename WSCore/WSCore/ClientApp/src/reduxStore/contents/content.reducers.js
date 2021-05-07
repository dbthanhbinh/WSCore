import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    currentProviders: {},
    currentTypes: []
}

const contentSlice = createSlice({
    name: 'content',
    initialState: initialState,
    reducers: {
        setCurrentProviders: (state, action) => {
            state.currentProviders = action.payload
        },
        setCurrentTypes: (state, action) => {
            state.currentTypes = action.payload
        }
    }
})

export const { action, reducer } = contentSlice
export default reducer