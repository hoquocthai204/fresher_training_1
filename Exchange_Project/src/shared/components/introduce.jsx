import { useRef } from 'react'
import './introduce.scss'

function Introduce({t}) {
    const ref = useRef()
    function handleClick() {
        ref.current.style.display = 'none'
    }
    return (
        <div className='introduce_notification' ref={ref}>
            <i className="fas fa-exclamation-circle"></i>
            <p>{t('Introducing_Highstreet')}</p>
            <span>{t('Introducing_Highstreet_more')}</span>
            <i className="fas fa-times" onClick={handleClick}></i>
        </div>
    )
}
export { Introduce }