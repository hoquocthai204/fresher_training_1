import './regisInputContainer.scss'
import { useDispatch, useSelector } from 'react-redux';
import * as regisActions from '../../../redux/slices/registerslice';
import { AlertNote } from '../../../shared/components/alertNote'
import { useState } from 'react';

function RegisInputContainer({ type, text, val, t }) {
    const dispatch = useDispatch()
    const regisstates = useSelector(state => state.regis);
    const [showAlert, setShowAlert] = useState(false)

    function handleupdate(e) {
        dispatch(regisActions[`set${val}`](e.target.value))
    }

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
        <>
            <div className='container'>
                <label>{text}</label>
                <input
                    type={type}
                    value={regisstates[val]}
                    onChange={handleupdate}
                    onBlur={handleBlur}
                />
                {showAlert && <AlertNote text={`${text} ${t('regisRequired')}`} />}
            </div>
        </>
    )
}
export { RegisInputContainer }