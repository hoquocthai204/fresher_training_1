import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import * as Actions from '../../../../redux/slices/homeslice';
import * as loginActions from '../../../../redux/slices/loginslice';
import useWebSocket from 'react-use-websocket';
import './subcontent.scss'
import { Link } from 'react-router-dom'

function Subcontent({ t }) {
    const dispatch = useDispatch()
    const states = useSelector(state => state.home);
    const loginStates = useSelector(state => state.login);

    const [socketUrl, setSocketUrl] = useState('ws://localhost:8080/stream');
    const { sendJsonMessage, lastJsonMessage } = useWebSocket(socketUrl);
    useEffect(() => {
        setSocketUrl('ws://localhost:8080/stream')
        sendJsonMessage({
            method: "SUBSCRIBE",
            topic: "MARKET_PRICE"
        })
    }, [])
    useEffect(() => {
        if (lastJsonMessage) {
            let socketdata = lastJsonMessage.data
            dispatch(Actions.setSocketData(socketdata))
            setSocketUrl(null)
        }
    })

    useEffect(() => {
        dispatch(Actions.coinListApi())
    }, [])

    return (
        <div className='subcontent'>
            <div className='subcontent_container'>
                <p className='subcontent_title'>{t('header_title')}</p>
                <p className='subcontent_subtitle'>{t('subheader')}</p>
                {
                    !loginStates.auth.token ?
                        <Link to='/register' onClick={() => dispatch(loginActions.setInLoginorRegis(true))}><button className='register_btn'>{t('register_now')}</button></Link> :
                        <Link to='/trade'><button className='trade_btn'>{t('trade_now')}</button></Link>
                }

            </div>
            <div className='coinDetail'>
                {
                    states.coinList.map((element) => {
                        if (element.id < 6) {
                            let data = states.socketdata
                            return data.map(e => {
                                if (e[0] === element.code && e[1] === states.currency.code) {
                                    return (
                                        <div className='coinContainer' key={element.id}>
                                            <p className='coinPair'>{`${element.code}/${states.currency.code}`} {e[3] > 0 ? (<span className='increase'>{`${e[3]}%`}</span>) : (<span className='decrease'>{`${e[3]}%`}</span>)}</p>
                                            <p className='rate'>1.000</p>
                                            <span>{`${states.currency.symbol} ${e[2]}`}</span>
                                        </div>
                                    )
                                }
                            })
                        }
                    })
                }

            </div>
        </div>
    )
}
export { Subcontent }