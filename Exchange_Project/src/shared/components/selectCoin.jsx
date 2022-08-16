import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CoinDetailrow from './coinDetailRow'
import { useSelector, useDispatch } from 'react-redux'
import * as depoActions from '../../redux/slices/depositslice'
import * as withActions from '../../redux/slices/withdrawslice'
import { useEffect } from "react";
import './selectCoin.scss'

function SelectCoinBox(props) {
    const dispatch = useDispatch()
    const depoStates = useSelector(state => state.depo)
    const homeStates = useSelector(state => state.home)
    const loginStates = useSelector(state => state.login)
    const withStates = useSelector(state => state.with)

    useEffect(() => {
        let coin = depoStates.coinSelected
        let token = loginStates.auth.token
        dispatch(depoActions.getAddressApi({ coin, token }))
    }, [depoStates.coinSelected])

    return (
        <div className="selectCoin_box">
            <p>Select coin</p>

            <div className="coin_box">
                <label htmlFor="coin_select">Coin</label>

                <Box sx={{ width: 400 }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Age</InputLabel>
                        {
                            props.type === 'depo' ?
                                (<Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={depoStates.coinSelected}
                                    onChange={(e) => dispatch(depoActions.setCoinSelected(e.target.value))}
                                >
                                    {
                                        homeStates.coinList.map(e => {
                                            return (
                                                <MenuItem key={e.id} value={e.code}> <CoinDetailrow code={e.code} name={e.name} image={e.image} /> </MenuItem>
                                            )
                                        })
                                    }
                                </Select>) :
                                (<Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={withStates.coinSelected}
                                    onChange={(e) => dispatch(withActions.setCoinSelected(e.target.value))}
                                >
                                    {
                                        homeStates.coinList.map(e => {
                                            return (
                                                <MenuItem key={e.id} value={e.code}> <CoinDetailrow code={e.code} name={e.name} image={e.image} /> </MenuItem>
                                            )
                                        })
                                    }
                                </Select>)
                        }
                    </FormControl>
                </Box>
            </div>
        </div>
    )
}
export default SelectCoinBox