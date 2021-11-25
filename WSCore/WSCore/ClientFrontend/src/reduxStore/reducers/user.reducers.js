import {createSlice} from '@reduxjs/toolkit'
import {getDetailUser, getUserPermission, getListUsers} from '../actions/member.actions'

const initialState = {
    currentUser: {},
    currentUsers: [],
    userPermission: {}
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
        setUserPermission: (state, action) => {
            state.userPermission = action.payload
        }
    },
    extraReducers: {
        // Add reducers for additional action types here, and handle loading state as needed
        [getDetailUser.fulfilled]: (state, action) => {
            state.currentUser = action?.payload?.result
        },
        [getUserPermission.fulfilled]: (state, action) => {
            state.userPermission = action?.payload?.result
        },
        [getListUsers.fulfilled]: (state, action) => {
            state.currentUsers = action?.payload?.result
        }
    }
})

export const { action, reducer } = userSlice
export default reducer