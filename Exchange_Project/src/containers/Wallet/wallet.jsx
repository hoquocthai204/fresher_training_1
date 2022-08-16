import './wallet.scss'
import SideMenu from './components/sideMenu'
import FiatSpotPage from './components/fiatSpot'
import TranHistory from './components/tranHistory'
import { Routes, Route } from 'react-router-dom'

function WalletPage() {
    return (
        <div className="wallet">
            <SideMenu />
            <Routes>
                <Route path={''} element={<FiatSpotPage />} />
                <Route path={'fiatandspot'} element={<FiatSpotPage />} />
                <Route path={'tranhistory'} element={<TranHistory />} />
            </Routes>

        </div>
    )
}
export default WalletPage