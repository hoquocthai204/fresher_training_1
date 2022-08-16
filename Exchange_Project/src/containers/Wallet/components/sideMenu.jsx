import './sideMenu.scss'
import { Link } from 'react-router-dom'

function SideMenu() {

    function handleClick(e) {
        document.querySelector('.navSelect.active').classList.remove('active')
        e.target.classList.add('active')
    }

    return (
        <div className='sidemenu'>
            <div className="overview">
                <i className="fas fa-wallet"></i>
                <span>Overview</span>
            </div>
            <Link to={'fiatandspot'}><p className='navSelect active' onClick={handleClick}>Fiat and Spot</p></Link>
            <Link to={'tranhistory'}><p className='navSelect' onClick={handleClick}>Transaction History</p></Link>
        </div>
    )
}
export default SideMenu