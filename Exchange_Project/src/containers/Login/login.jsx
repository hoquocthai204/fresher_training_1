import { FormHeader } from '../../shared/components/formHeader';
import { InputContainer } from './components/inputContainer';
import { SubmitBtn } from '../../shared/components/submitBtn';
import { RegisterLink } from './components/registerLink';
import { PasswordContainer } from './components/passwordContainer';
import { AlertNote } from './components/alertNote';
import './login.scss'

function LoginPage({ t }) {

    return (
        <form className='form_login'>
            <FormHeader title={t('login_header')} subtitle={t('login_subheader')} />
            <InputContainer type='email' text='Email' val={'email'} />
            <PasswordContainer text={t('password')} val={'password'} />
            <AlertNote text={t('loginRequired')} />
            <SubmitBtn value={t('login')} flag={'login'} />
            <RegisterLink t={t} />
        </form>
    )
}
export default LoginPage