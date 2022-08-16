import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import depositApi from "../../apis/depositApi";

const getAddressApi = createAsyncThunk('deposit/getaddress', async (data) => {
    const json = await depositApi.getAddress(data)
    return json.data.address
})

const postAddressApi = createAsyncThunk('deposit/postaddress', async (data) => {
    const json = await depositApi.postAddress(data)
    return json.data.address
})

const postHandleDepositApi = createAsyncThunk('deposit/handledeposit', async (data) => {
    const json = await depositApi.postHandleDeposit(data)
    console.log(json)
    return json
})

const depositSlice = createSlice({
    name: 'deposit',
    initialState: {
        address: '',
        coinSelected: 'BTC',
    },
    reducers: {
        setCoinSelected(state, action) {
            state.coinSelected = action.payload
        }
    },
    extraReducers: {
        [getAddressApi.fulfilled]: (state, action) => {
            state.address = action.payload
        },
        [postAddressApi.fulfilled]: (state, action) => {
            state.address = action.payload
        },
        [postHandleDepositApi.fulfilled]: (state, action) => {

        }
    }
})

const { actions, reducer } = depositSlice;
export const { setCoinSelected } = actions;
export default reducer;
export { getAddressApi, postAddressApi, postHandleDepositApi }