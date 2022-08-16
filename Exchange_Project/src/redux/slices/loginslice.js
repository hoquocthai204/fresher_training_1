import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import loginApi from '../../apis/loginApi'

const loginAsyncApi = createAsyncThunk('login/submit', async (data, thunkAPI) => {
    const json = await loginApi.submit(data)
    return json
})

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        email: '',
        password: '',
        inLoginorRegis: false,
        auth: {
            token: ''
        },
        showAlert: false
    },
    reducers: {
        setShowAlert(state, action) {
            state.showAlert = action.payload
        },
        setInLoginorRegis(state, action) {
            state.inLoginorRegis = action.payload
        },
        setemail(state, action) {
            state.email = action.payload
        },
        setpassword(state, action) {
            state.password = action.payload
        },
        setAuth(state, action) {
            state.auth = action.payload
        }
    },
    extraReducers: {
        [loginAsyncApi.fulfilled]: (state, action) => {
            state.auth = action.payload
            state.inLoginorRegis = false
        }
    }
})

const { actions, reducer } = loginSlice;
export const { setemail, setpassword, setAuth, setInLoginorRegis, setShowAlert } = actions
export default reducer;
export { loginAsyncApi }