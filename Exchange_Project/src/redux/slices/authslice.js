import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import notificationApi from "../../apis/notificationApi";

const getNotificationListApi = createAsyncThunk('auth/notList', async (data) => {
    const json = await notificationApi.getNotList(data)
    return json.data
})

const getUnreadNotApi = createAsyncThunk('auth/unreadnot', async (data) => {
    const json = await notificationApi.getUnreadNot(data)
    return json.data
})

const putReadAllNotApi = createAsyncThunk('auth/readall', async (data) => {
    const json = await notificationApi.putReadAllNot(data)
})

const putReadAnyNotApi = createAsyncThunk('auth/readany', async (data) => {
    const json = await notificationApi.putReadAnyNot(data)
})

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        showUserInfo: false,
        showNotificationBox: false,
        unreadNotification: 0,
        listNotification: []
    },
    reducers: {
        setShowUserInfo(state, action) {
            state.showUserInfo = action.payload
        },
        setShowNotificationBox(state, action) {
            state.showNotificationBox = action.payload
        }
    },
    extraReducers: {
        [getNotificationListApi.fulfilled]: (state, action) => {
            state.listNotification = action.payload
        },
        [getUnreadNotApi.fulfilled]: (state, action) => {
            state.unreadNotification = action.payload
        }
    }
})

const { actions, reducer } = authSlice;
export const { setShowUserInfo, setShowNotificationBox } = actions
export default reducer;
export { getNotificationListApi, getUnreadNotApi, putReadAllNotApi, putReadAnyNotApi }