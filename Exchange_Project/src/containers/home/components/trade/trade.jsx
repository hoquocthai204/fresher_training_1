import './trade.scss'
import { useSelector, useDispatch } from 'react-redux'
import * as loginActions from '../../../../redux/slices/loginslice'
import { Link } from 'react-router-dom'

function Trade({ t }) {
    const dispatch = useDispatch()
    const loginStates = useSelector(state => state.login)
    return (
        <div className='trade_select'>
            <h1 className='trade_title'>{t('start trade now')}</h1>
            <div className='btn_selector'>
                {!loginStates.auth.token && <Link to='/register' onClick={() => dispatch(loginActions.setInLoginorRegis(true))}><button>{t('register_now')}</button></Link>}
                <Link to='/trade'><button>{t('trade_now')}</button></Link>
            </div>
        </div>
    )
}
export { Trade }