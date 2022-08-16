import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tranHisApi from "../../apis/tranHisApi";

const getTranHisApi = createAsyncThunk('tranHis/getTran', async (data) => {
    const json = await tranHisApi.getTranHis(data)
    return json.data
})

const tranHistoryslice = createSlice({
    name: 'tranHis',
    initialState: {
        type: 'WITHDRAW',
        time: 30,
        asset: 'BTC',
        status: 'COMPLETED',
        resApi: [],
        exportData: []
    },
    reducers: {
        setExportData(state, action) {
            state.exportData = action.payload
        },
        setType(state, action) {
            state.type = action.payload
        },
        setTime(state, action) {
            state.time = action.payload
        },
        setAsset(state, action) {
            state.asset = action.payload
        },
        setStatus(state, action) {
            state.status = action.payload
        },
    },
    extraReducers: {
        [getTranHisApi.fulfilled]: (state, action) => {
            state.resApi = action.payload
        }
    }
})

const { actions, reducer } = tranHistoryslice;
export const { setType, setTime, setAsset, setStatus, setExportData } = actions;
export default reducer;
export { getTranHisApi }