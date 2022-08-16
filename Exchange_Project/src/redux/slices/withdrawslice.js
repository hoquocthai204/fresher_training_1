import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import withdrawApi from "../../apis/withdrawApi";

const postWithdrawApi = createAsyncThunk('withdraw/postWith', async (data) => {
    const res = await withdrawApi.postWithdraw(data)
})

const withslice = createSlice({
    name: 'withdraw',
    initialState: {
        coinSelected: 'BTC'
    },
    reducers: {
        setCoinSelected: (state, action) => {
            state.coinSelected = action.payload
        }
    },
    extraReducers: {}
})

const { actions, reducer } = withslice;
export const { setCoinSelected } = actions;
export default reducer;
export { postWithdrawApi }
