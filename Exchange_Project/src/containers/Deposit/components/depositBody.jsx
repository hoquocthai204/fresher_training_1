import "./depositBody.scss"
import GetAddressDepo from "./getAddressDepo"
import { useSelector } from 'react-redux'
import DepoForm from "./depoForm";
import SelectCoinBox from "../../../shared/components/selectCoin";


function DepositBody() {
    const depoStates = useSelector(state => state.depo)
    return (
        <div className="depo_body">
            <SelectCoinBox type={'depo'} />
            <div className="depoAction_box">
                <p>Deposit to</p>
                {!depoStates.address ? <GetAddressDepo /> : <DepoForm />}
            </div>
        </div>
    )
}
export default DepositBody
