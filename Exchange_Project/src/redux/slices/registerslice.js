import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import register from '../../apis/registerApi'

const regisAsyncApi = createAsyncThunk('register/submit', async (data, thunkAPI) => {
    const regis = await register.submit(data)
})

const regisSlice = createSlice({
    name: 'register',
    initialState: {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        langCode: 'en',
        registered: false,
        checkCondition: false
    },
    reducers: {
        setCheckCondition(state, action) {
            state.checkCondition = action.payload
        },
        setemail(state, action) {
            state.email = action.payload
        },
        setpassword(state, action) {
            state.password = action.payload
        },
        setfirstName(state, action) {
            state.firstName = action.payload
        },
        setlastName(state, action) {
            state.lastName = action.payload
        },
        setlangCode(state, action) {
            state.langCode = action.payload
        },
        setRegistered(state, action) {
            state.registered = action.payload
        }
    },
    extraReducers:{
        [regisAsyncApi.fulfilled]:(state)=>{
        }
    }
})

const { actions, reducer } = regisSlice;
export const {
    setemail,
    setpassword,
    setfirstName,
    setlastName,
    setlangCode,
    setRegistered,
    setCheckCondition } = actions
export default reducer;
export {regisAsyncApi}