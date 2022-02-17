import {createSlice} from '@reduxjs/toolkit'
import {
    getListMenus,
    createMenu,
    getMenuBy,
    deleteMenuBy
} from '../actions/menu.actions'

const initialState = {
    currentMenu: {},
    currentMenus: []
}

const menuSlice = createSlice({
    name: 'menu',
    initialState: initialState,
    reducers: {
        setCurrentMenu: (state, action) => {
            state.currentMenu = action.payload
        },
        setCurrentMenus: (state, action) => {
            state.currentMenus = action.payload
            state.isLoading = false
        }
    },
    extraReducers: {
        [getListMenus.fulfilled]: (state, action) => {
            state.currentMenus = action?.payload?.result
        },
        [createMenu.fulfilled]: (state, action) => {
            state.currentMenu = action?.payload?.result
        },
        [getMenuBy.pending]: (state, action) => {
            state.isLoading = true
        },
        [getMenuBy.fulfilled]: (state, action) => {
            state.currentMenu = action?.payload?.result
            state.isLoading = false
        },
        [deleteMenuBy.pending]: (state, action) => {
            state.isLoading = true
        },
        [deleteMenuBy.fulfilled]: (state, action) => {
            state.isLoading = false
        }
    }
})

export const { action, reducer } = menuSlice
export default reducer