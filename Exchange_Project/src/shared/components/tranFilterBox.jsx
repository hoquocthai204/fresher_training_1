import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import CoinDetailRow from './coinDetailRow'
import * as tranHisActions from '../../redux/slices/tranHistorySlice'
import { useSelector, useDispatch } from 'react-redux';
import './tranFilterBox.scss'

function TranFilterBox() {
    const dispatch = useDispatch()
    const states = useSelector(state => state.tranHis)
    const homeStates = useSelector(state => state.home)
    return (
        <div className="filter_options">

            <div className="filter_option">
                <p>Type</p>
                <Box sx={{ width: 200 }}>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={states.type}
                            onChange={(e) => dispatch(tranHisActions.setType(e.target.value))}
                        >
                            <MenuItem value={'WITHDRAW'}>Withdraw</MenuItem>
                            <MenuItem value={'DEPOSIT'}>Deposit</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <div className="filter_option">
                <p>Time</p>
                <Box sx={{ width: 200 }}>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={states.time}
                            onChange={(e) => dispatch(tranHisActions.setTime(e.target.value))}
                        >
                            <MenuItem value={1}>Past 1 day</MenuItem>
                            <MenuItem value={7}>Past 7 days</MenuItem>
                            <MenuItem value={30}>Past 30 days</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <div className="filter_option">
                <p>Asset</p>
                <Box sx={{ width: 200 }}>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={states.asset}
                            onChange={(e) => dispatch(tranHisActions.setAsset(e.target.value))}
                        >
                            {
                                homeStates.coinList.map(e => {
                                    return <MenuItem key={e.id} value={e.code}> <CoinDetailRow image={e.image} code={e.code} name={e.name} /> </MenuItem>
                                })
                            }
                        </Select>
                    </FormControl>
                </Box>
            </div>

            <div className="filter_option">
                <p>Status</p>
                <Box sx={{ width: 200 }}>
                    <FormControl fullWidth>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={states.status}
                            onChange={(e) => dispatch(tranHisActions.setStatus(e.target.value))}
                        >
                            <MenuItem value={'COMPLETED'}>COMPLETED</MenuItem>
                            <MenuItem value={'PROCESSING'}>PROCESSING</MenuItem>
                            <MenuItem value={'SUBMITTED'}>SUBMITTED</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
        </div>
    )
}
export default TranFilterBox