import './passwordContainer.scss'
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../redux/slices/registerslice';
import { useEffect, useState } from 'react';
import { AlertNote } from '../../../shared/components/alertNote'

function PasswordContainer({ text, val, t }) {
    const dispatch = useDispatch()
    const regisstates = useSelector(state => state.regis);
    const [eye, setEye] = useState(false)
    const [type, setType] = useState('password')
    const [showAlert, setShowAlert] = useState(false)

    function handleToggle() {
        setEye(!eye)
    }
    useEffect(() => {
        (!eye) ? setType('password') : setType('text')
    }, [eye])

    function handleBlur(e) {
        if (!e.target.value) {
            setShowAlert(true)
            e.target.style.border = '1px solid red'
        }
        else {
            setShowAlert(false)
            e.target.style.border = '1px solid #9C9EA1'
        }
    }

    return (
        <div className='container'>
            <label>{text}</label>
            <div className="input_box">
                <input
                    type={type}
                    value={regisstates[val]}
                    onChange={(e) => {
                        dispatch(Actions[`set${val}`](e.target.value))
                    }}
                    onBlur={handleBlur}
                />
                {
                    !eye ? <i onClick={handleToggle} className="fas fa-eye-slash"></i> : <i onClick={handleToggle} className="fas fa-eye"></i>
                }
            </div>
            {showAlert && <AlertNote text={`${text} ${t('regisRequired')}`} />}
        </div>
    )
}
export { PasswordContainer }