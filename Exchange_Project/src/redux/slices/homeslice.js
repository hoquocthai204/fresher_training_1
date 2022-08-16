import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import homeApi from "../../apis/homeApi";

const currencyListApi = createAsyncThunk('home/currency', async () => {
    const json = await homeApi.currencyList()
    return json
})

const languageListApi = createAsyncThunk('home/language', async () => {
    const json = await homeApi.languageList()
    return json
})

const coinListApi = createAsyncThunk('home/coin', async () => {
    const json = await homeApi.coinList()
    return json
})

const homeSlice = createSlice({
    name: 'home',
    initialState: {
        coinList: [],
        otherOption: 'language',
        socketdata: [],
        language: JSON.parse(localStorage.getItem('lang')) || { code: "en", name: "English" },
        currency: JSON.parse(localStorage.getItem('curr')) || { code: "USD", symbol: "$" },
        showDownloadBox: false,
        showOptionBox: false,
        langList: [],
        currencyList: []
    },
    reducers: {
        setShowDownloadBox(state, action) {
            state.showDownloadBox = action.payload
        },
        setShowOptionBox(state, action) {
            state.showOptionBox = action.payload
        },
        setOtherOption(state, action) {
            state.otherOption = action.payload
        },
        setSocketData(state, action) {
            state.socketdata = action.payload
        },
        setLanguage(state, action) {
            state.language = action.payload
        },
        setCurrency(state, action) {
            state.currency = action.payload
        }
    },
    extraReducers: {
        [currencyListApi.fulfilled]: (state, action) => {
            state.currencyList = action.payload
        },
        [languageListApi.fulfilled]: (state, action) => {
            state.langList = action.payload
        },
        [coinListApi.fulfilled]: (state, action) => {
            state.coinList = action.payload
        }
    }
});

const { actions, reducer } = homeSlice;
export const {
    setOtherOption,
    setSocketData,
    setLanguage,
    setCurrency,
    setShowDownloadBox,
    setShowOptionBox } = actions;
export default reducer;
export { currencyListApi, languageListApi, coinListApi }