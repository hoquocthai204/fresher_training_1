import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../redux/slices/authslice'
import * as loginActions from '../../redux/slices/loginslice'
import * as homeActions from '../../redux/slices/homeslice'
import './userInfo.scss'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

function UserInfo({ t }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const loginStates = useSelector(state => state.login);
    const authStates = useSelector(state => state.auth)

    function handleLogout() {
        dispatch(loginActions.setAuth(''))
        dispatch(authActions.setShowUserInfo())
        navigate('/')
    }

    useEffect(() => {
        if (authStates.showUserInfo) {
            dispatch(authActions.setShowNotificationBox(false))
            dispatch(homeActions.setShowDownloadBox(false))
        }
    }, [authStates.showUserInfo])

    return (
        <div className="user_container">
            <button className='userTab' onClick={() => dispatch(authActions.setShowUserInfo(!authStates.showUserInfo))}><i className="far fa-user-circle"></i></button>

            {authStates.showUserInfo &&
                (<div className="user_box">
                    <div className="emailinfo">
                        {loginStates.email}
                    </div>
                    <div className="verified"><i className="fas fa-check-circle"></i>Verified</div>
                    <div className="vip"><i className="fas fa-gem"></i> VIP 0</div>
                    <button className="logout" onClick={handleLogout}>
                        <i className="fas fa-sign-out-alt"></i>
                        {t('logout')}
                    </button>
                </div>)}
        </div>
    )
}
export { UserInfo }