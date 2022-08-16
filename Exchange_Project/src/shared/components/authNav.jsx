import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../redux/slices/homeslice';
import * as authActions from '../../redux/slices/authslice';
import * as HomeComponents from '../../containers/Home/components'
import { Notification } from './notification';
import { UserInfo } from './userInfo'
import './authNav.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react';

function AuthNav({ t }) {
    const dispatch = useDispatch()
    const states = useSelector(state => state.home);

    useEffect(() => {
        if (states.showDownloadBox) {
            dispatch(authActions.setShowUserInfo(false))
            dispatch(authActions.setShowNotificationBox(false))
        }
    }, [states.showDownloadBox])

    return (
        <div className='rightSide'>
            <Link to='/wallet'><button className='walletTab'>{t('wallet')} <i className="fas fa-caret-down"></i></button></Link>
            <button className='orderTab'>{t('order')} <i className="fas fa-caret-down"></i></button>
            <UserInfo t={t} />
            <Notification />
            <div className='download_container'>
                <button className='download_btn' onClick={() => dispatch(Actions.setShowDownloadBox(!states.showDownloadBox))}>{t('download')}</button>
                {
                    states.showDownloadBox && (<HomeComponents.Download title={t('download_title')} btn={t('download_btn')} />)
                }
            </div>
            <div className='option_container'>
                <button className='other_option'>
                    {states.language.name}
                </button>
            </div>
        </div>
    )
}
export { AuthNav }