import './fiatSpot.scss'
import { useSelector, useDispatch } from 'react-redux'
import * as fiatActions from '../../../redux/slices/fiatslice'
import { useEffect, useState } from 'react'
import SearchIcon from '@mui/icons-material/Search';
import FiatTable from './fiatTable';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

function FiatSpotPage() {
    const dispatch = useDispatch()
    const states = useSelector(state => state.fiat)
    const homestates = useSelector(state => state.home)
    const [eye, setEye] = useState(false)
    const [hideCoin, setHideCoin] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    function handleClick() {
        setEye(!eye)
    }

    useEffect(() => {
        dispatch(eye ? fiatActions.setBalanceType('text') : fiatActions.setBalanceType('password'))
    }, [eye])

    return (
        <div className="fiat_container">
            <div className="fiat_header">
                <p>Fiat and Spot</p>
                <div className="fiat_nav_box">
                    <Link to={'/deposit'}><Button className='nav_btn deposit_btn'>Deposit</Button></Link>
                    <Link to={'/withdraw'}><Button className='nav_btn withdraw_btn'>Withdraw</Button></Link>


                </div>
            </div>
            <div className="fiat_content">
                <div className="fiat_baln">
                    <span>Fiat and Spot balance</span>
                    {eye ? <i onClick={handleClick} className="far fa-eye"></i> : <i onClick={handleClick} className="far fa-eye-slash"></i>}
                    <div className="baln_num">
                        <input type={states.balanceType} readOnly value={`${states.balanceNum.toFixed(2)} ${homestates.currency.code}`} />
                    </div>
                </div>

                <div className="fiat_search_box">
                    <div className="search_box">

                        <Autocomplete
                            id="filter-demo"
                            options={states.walletList}
                            getOptionLabel={(option) => `${option.coinCode}`}
                            sx={{ width: 300 }}
                            renderInput={(params) => <TextField {...params} label="Search Coin" />}
                            onInputChange={(e, value)=>{
                                setSearchValue(value)
                            }}
                        />

                        <SearchIcon className='searchIcon' />
                    </div>

                    <div className="hide_checkbox">
                        <Checkbox type="checkbox" id='hidecheck' checked={hideCoin} onClick={() => setHideCoin(!hideCoin)} />
                        <label htmlFor='hidecheck'>Hide Small Balances</label>
                    </div>
                </div>

                <FiatTable checkHide={hideCoin} searchValue={searchValue} />
            </div>
        </div>
    )
}
export default FiatSpotPage