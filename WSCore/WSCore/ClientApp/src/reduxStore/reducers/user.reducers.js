import {createSlice} from '@reduxjs/toolkit'
import {getDetailUser, getUserPermissions, getListUsers} from '../actions/member.actions'

const initialState = {
    currentUser: {},
    currentUsers: [],
    userPermissions: {}
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload
        },
        setCurrentUsers: (state, action) => {
            state.currentUsers = action.payload
        },
        setUserPermissions: (state, action) => {
            state.userPermissions = action.payload
        }
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [getDetailUser.fulfilled]: (state, action) => {
            state.currentUser = action?.payload?.result
        },
        [getUserPermissions.fulfilled]: (state, action) => {
            state.userPermissions = action?.payload?.result
        },
        [getListUsers.fulfilled]: (state, action) => {
            state.currentUsers = action?.payload?.result
        }
    }
})

export const { action, reducer } = userSlice
export default reducer