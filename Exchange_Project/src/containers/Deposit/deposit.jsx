import './deposit.scss'
import DepositBody from './components/depositBody'
import DepoOrWithHeader from '../../shared/components/depoOrWithHeader'

function DepositPage({ t }) {
    return (
        <div className="deposit_container">
            <DepoOrWithHeader title={'Deposit Crypto'} />
            <DepositBody />
        </div>
    )
}
export default DepositPage
