import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../redux/slices/homeslice';
import * as loginActions from '../../redux/slices/loginslice';
import * as HomeComponents from '../../containers/Home/components'
import { useEffect, useState } from 'react';
import './navigate.scss'

function NavSide({ t }) {
    const dispatch = useDispatch()
    const states = useSelector(state => state.home);
    const [optionText, setOptionText] = useState(() => {
        if (!localStorage.getItem('lang'))
            localStorage.setItem('lang', JSON.stringify({ code: "en", name: "English" }))
        if (!localStorage.getItem('curr'))
            localStorage.setItem('curr', JSON.stringify({ code: "USD", symbol: "$" }))

        let lang = JSON.parse(localStorage.getItem('lang')).name
        let curr = JSON.parse(localStorage.getItem('curr')).code
        return (`${lang} | ${curr}`)
    })

    useEffect(() => {
        setOptionText(`${states.language.name} | ${states.currency.code}`)
    }, [states.language, states.currency])

    useEffect(() => {
        if (states.showOptionBox === false) {
            dispatch(Actions.setOtherOption('language'))
        }
    }, [states.showOptionBox])

    useEffect(() => {
        let element = document.querySelector(`.${states.otherOption}`)
        if (element) {
            element.classList.add('active')
        }

        return () => {
            let element = document.querySelector(`.${states.otherOption}`)
            if (element) {
                element.classList.remove('active')
            }
        }
    }, [states.otherOption])

    useEffect(() => {
        if (states.showDownloadBox) {
            dispatch(Actions.setShowOptionBox(false))
        }
    }, [states.showDownloadBox])

    useEffect(()=>{
        if (states.showOptionBox) {
            dispatch(Actions.setShowDownloadBox(false))
        }
    },[states.showOptionBox])

    return (
        <div className='rightSide'>
            <Link to='/login' onClick={() => dispatch(loginActions.setInLoginorRegis(true))}>
                <button className='login'>{t('login')}</button>
            </Link>
            <Link to='/register' onClick={() => dispatch(loginActions.setInLoginorRegis(true))}>
                <button className='register'>{t('register')}</button>
            </Link>

            <div className='download_container'>
                <button className='download_btn' onClick={() => dispatch(Actions.setShowDownloadBox(!states.showDownloadBox))}>{t('download')}</button>
                {
                    states.showDownloadBox && (<HomeComponents.Download title={t('download_title')} btn={t('download_btn')} />)
                }
            </div>
            <div className='option_container'>
                <button className='other_option' onClick={() => dispatch(Actions.setShowOptionBox(!states.showOptionBox))}>
                    {optionText}
                </button>
                {
                    states.showOptionBox &&
                    (<div className='option_boxs'>
                        <div className='header_option'>
                            <p className='language active' onClick={() => dispatch(Actions.setOtherOption('language'))}>{t('language_header')}</p>
                            <p className='currency' onClick={() => dispatch(Actions.setOtherOption('currency'))}>{t('currency_header')}</p>
                        </div>

                        {
                            states.otherOption === 'language' ? <HomeComponents.Language title={t('language_header_choose')} /> : <HomeComponents.Currency title={t('currency_header_choose')} />
                        }
                    </div>)
                }
            </div>
        </div>
    )
}
export { NavSide }