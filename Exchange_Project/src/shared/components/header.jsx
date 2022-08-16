import { useDispatch, useSelector } from 'react-redux';
import { NavSide } from './navigate'
import { OtherNav } from './otherNav';
import * as loginActions from '../../redux/slices/loginslice'
import { AuthNav } from './authNav';
import './header.scss'
import { Link } from "react-router-dom";

function Header({ t }) {
    const dispatch = useDispatch()
    const loginstate = useSelector(state => state.login)

    return (
        <div className='header'>
            <div className='leftSide'>
                <Link to='/' onClick={() => dispatch(loginActions.setInLoginorRegis(false))}><p className='header_title'>Exchange</p></Link>
                {!loginstate.inLoginorRegis && <p className='trade'>{t('trade')}</p>}
            </div>
            {
                !loginstate.inLoginorRegis ? (loginstate.auth.token ? <AuthNav t={t} /> : <NavSide t={t} />) : <OtherNav t={t} />
            }
        </div>
    )
}

export { Header }