import { configureStore } from '@reduxjs/toolkit';
import homeslice from '../../redux/slices/homeslice';
import loginslice from '../../redux/slices/loginslice'
import authslice from '../../redux/slices/authslice'
import regislice from '../../redux/slices/registerslice'
import fiatslice from '../../redux/slices/fiatslice'
import deposlice from '../../redux/slices/depositslice'
import withslice from '../../redux/slices/withdrawslice'
import tranHistoryslice from '../../redux/slices/tranHistorySlice'

const store = configureStore({
    reducer: {
        home: homeslice,
        login: loginslice,
        auth: authslice,
        regis: regislice,
        fiat: fiatslice,
        depo: deposlice,
        with: withslice,
        tranHis: tranHistoryslice
    },
})

export default store