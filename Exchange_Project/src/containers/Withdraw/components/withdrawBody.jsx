import './withdrawBody.scss'
import SelectCoinBox from '../../../shared/components/selectCoin'
import WithForm from './withdrawForm'

function WithdrawBody() {
    return (
        <div className="with_body">
            <SelectCoinBox type={'with'} />
            <div className="withAction_box">
                <p>Withdraw to</p>
                <WithForm />
            </div>
        </div>
    )
}
export default WithdrawBody