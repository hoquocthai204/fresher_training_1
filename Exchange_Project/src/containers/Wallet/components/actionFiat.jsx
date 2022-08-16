import './actionFiat.scss'
import { Link } from 'react-router-dom'

function ActionFiat() {
    return (
        <div className="linkGroup">
            <Link to={'/deposit'}><span>Deposit</span></Link>
            <Link to={'/withdraw'}><span>Withdraw</span></Link>
            <Link to={'/trade'}><span>Trade</span></Link>
        </div>
    )
}
export default ActionFiat