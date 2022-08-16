import './registerLink.scss'
import { Link } from 'react-router-dom'

function RegisterLink({t}) {
    return (
        <Link to='/register'>
            <p className='registerbtn'>{t('register_now')}</p>
        </Link>
    )
}
export { RegisterLink }