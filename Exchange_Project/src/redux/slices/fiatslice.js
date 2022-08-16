import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import fiatApi from "../../apis/fiatApi";

const getWalletListApi = createAsyncThunk('fiat/wallet', async (data) => {
    const json = await fiatApi.getWalletList(data)
    return json.data
})

const fiatSlice = createSlice({
    name: 'fiat',
    initialState: {
        eye: false,
        balanceType: 'password',
        walletList: [],
        balanceNum: 0
    },
    reducers: {
        setBalanceNum(state, action) {
            state.balanceNum = action.payload
        },
        setBalanceType(state, action) {
            state.balanceType = action.payload
        },
        setEye(state, action) {
            state.eye = action.payload
        }
    },
    extraReducers: {
        [getWalletListApi.fulfilled]: (state, action) => {
            state.walletList = action.payload
        }
    }
})

const { actions, reducer } = fiatSlice;
export const { setEye, setBalanceType, setBalanceNum } = actions;
export default reducer;
export { getWalletListApi }




