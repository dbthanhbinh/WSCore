import {createSlice} from '@reduxjs/toolkit'
import { getAppConfigs } from '../actions/config.actions'

const initialState = {
    currentConfigs: {},
    currentPermissions: {},
    currentFlash: {}
}

const userSlice = createSlice({
    name: 'config',
    initialState: initialState,
    reducers: {
        setCurrentPermissions: (state, action) => {
            state.currentPermissions = action.payload
        },
        setCurrentFlash: (state, action) => {
            state.currentFlash = action.payload
        }
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [getAppConfigs.fulfilled]: (state, action) => {
            state.currentConfigs = action?.payload?.result
        }
    }
})

export const { action, reducer } = userSlice
export default reducer