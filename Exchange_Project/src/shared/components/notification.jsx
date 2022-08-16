import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../../redux/slices/authslice'
import * as homeActions from '../../redux/slices/homeslice'
import { useEffect } from 'react'
import './notification.scss'

function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " year ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " month ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " day ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hour ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minute ago";
    }
    return Math.floor(seconds) + " seconds";
}

function Notification() {
    const dispatch = useDispatch()
    const authStates = useSelector(state => state.auth)
    const loginStates = useSelector(state => state.login)

    useEffect(() => {
        if (authStates.showNotificationBox) {
            dispatch(authActions.getUnreadNotApi(loginStates.auth.token))
            dispatch(authActions.getNotificationListApi(loginStates.auth.token))

            dispatch(homeActions.setShowDownloadBox(false))
            dispatch(authActions.setShowUserInfo(false))
        }
    }, [authStates.showNotificationBox])

    useEffect(() => {
        let loop = setInterval(() => {
            dispatch(authActions.getNotificationListApi(loginStates.auth.token))
            dispatch(authActions.getUnreadNotApi(loginStates.auth.token))
        }, 1000)
        return () => {
            clearInterval(loop)
        }
    }, [loginStates.auth.token])

    const handleReadAll = () => {
        dispatch(authActions.putReadAllNotApi(loginStates.auth.token))
    }

    const handleview = (id) => {
        let token = loginStates.auth.token
        dispatch(authActions.putReadAnyNotApi({ token, id }))
    }
    return (
        <div className="notification_container">
            <button className='notTab' onClick={() => dispatch(authActions.setShowNotificationBox(!authStates.showNotificationBox))}><i className="far fa-bell"></i></button>
            {authStates.unreadNotification > 0 && <div className="alert_icon">{authStates.unreadNotification}</div>}
            {
                authStates.showNotificationBox &&
                (<div className="not_Box">
                    <div className="not_Header">
                        <p className="not_pending">
                            <span>{authStates.unreadNotification}</span>
                            pending notifications
                        </p>
                        <button className='clear_not' onClick={handleReadAll}>Clear All</button>
                        <button className='view_not'>View All <i className="fas fa-chevron-right"></i></button>
                    </div>

                    <div className="not_List">
                        {
                            authStates.listNotification.slice(0).reverse().map(element => {
                                let timeText = timeSince(new Date(element.createdDate))
                                return (
                                    (<div
                                        className={`item _${element.id}`}
                                        key={element.id}
                                        onClick={() => handleview(element.id)}
                                        style={{ backgroundColor: !element.seen && '#F5F5F5' }}
                                    >
                                        <p className='title'>{element.title}</p>
                                        <p className='content'>{element.content}</p>
                                        <p className='date'>{timeText}</p>
                                    </div>)
                                )
                            })
                        }
                    </div>
                </div>)
            }
        </div>
    )
}
export { Notification }