import './getAddressDepo.scss'
import { useDispatch, useSelector } from 'react-redux'
import * as depoActions from '../../../redux/slices/depositslice'

const GetAddressDepo = () => {
    const dispatch = useDispatch()
    const loginStates = useSelector(state => state.login)
    const depoStates = useSelector(state => state.depo)

    function handleClick(e) {
        e.preventDefault()
        let coin = depoStates.coinSelected
        let token = loginStates.auth.token
        dispatch(depoActions.postAddressApi({ coin, token }))
    }
    return (
        <div className="notAddress_box">
            <p>No Cardano deposit addresses have been applied for before. Please retrieve the deposit address.</p>
            <button onClick={handleClick}>Get Address</button>
        </div>
    )
}
export default GetAddressDepo