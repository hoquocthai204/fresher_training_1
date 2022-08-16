import { FormHeader } from '../../shared/components/formHeader';
import { SubmitBtn } from '../../shared/components/submitBtn';
import { RegisInputContainer } from './components/regisInputContainer';
import { CheckboxContainer } from './components/checkboxContainer';
import { SelectContainer } from './components/selectContainer';
import { PasswordContainer } from './components/passwordContainer';
import './register.scss'

function RegisterPage({ t }) {

    return (
        <form className="form_register">
            <FormHeader title={t('register_title')} subtitle={t('register_subtitle')} />
            <RegisInputContainer type={'text'} text={t('firstName')} val={'firstName'} t={t} />
            <RegisInputContainer type={'text'} text={t('lastName')} val={'lastName'} t={t} />
            <RegisInputContainer type={'email'} text={'Email'} val={'email'} t={t} />
            <PasswordContainer text={t('password')} val={'password'} t={t} />
            <SelectContainer t={t} />
            <CheckboxContainer t={t} />
            <SubmitBtn value={t('register')} flag={'register'} />
        </form>
    )
}
export default RegisterPage