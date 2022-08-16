import DepoOrWithHeader from '../../shared/components/depoOrWithHeader'
import WithdrawBody from './components/withdrawBody'
import './withdraw.scss'

function WithdrawPage() {
    return (
        <div className="withdraw_container">
            <DepoOrWithHeader title={'Withdraw Crypto'} />
            <WithdrawBody />
        </div>
    )
}
export default WithdrawPage