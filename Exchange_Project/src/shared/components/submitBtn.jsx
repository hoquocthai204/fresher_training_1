import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import * as regisActions from '../../redux/slices/registerslice'
import * as loginActions from '../../redux/slices/loginslice'
import './submitBtn.scss'

function SubmitBtn({ value, flag }) {
    const dispatch = useDispatch()
    const regisstates = useSelector(state => state.regis);
    const loginStates = useSelector(state => state.login);
    const navigate = useNavigate()

    useEffect(() => {
        if (flag === 'register') {
            dispatch(regisActions.setemail(''))
            dispatch(regisActions.setpassword(''))
            dispatch(regisActions.setfirstName(''))
            dispatch(regisActions.setlastName(''))
            dispatch(regisActions.setlangCode('en'))
        }
        else {
            dispatch(loginActions.setShowAlert(false))
            dispatch(loginActions.setemail(''))
            dispatch(loginActions.setpassword(''))
        }
    }, [])

    const handleShowAlert = () => {
        dispatch(loginActions.setShowAlert(true))
    }

    function handleSubmit(e) {
        e.preventDefault()
        if (flag === 'register') {
            let payload
            if (regisstates.checkCondition) {
                payload = {
                    email: regisstates.email,
                    firstName: regisstates.firstName,
                    langCode: regisstates.langCode,
                    lastName: regisstates.lastName,
                    password: regisstates.password
                }
            }
            var config = {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            };

            try {
                dispatch(regisActions.regisAsyncApi({ config, navigate }))
            } catch (error) {
                console.log(error)
            }
        }
        else {
            let payload = {
                email: loginStates.email,
                password: loginStates.password
            }
            var config = {
                method: 'POST',
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            };

            try {
                dispatch(loginActions.loginAsyncApi({ config, navigate, handleShowAlert }))
            }
            catch (error) {
                console.log(error)
            }
        }
    }

    return (
        <input
            className='submitbtn'
            style={((regisstates.email && regisstates.password && regisstates.firstName &&
                regisstates.lastName && regisstates.langCode && regisstates.checkCondition)
                || (loginStates.email && loginStates.password)) ? {
                backgroundColor: '#FCD535',
                cursor: 'pointer',
                pointerEvents: 'auto'
            } : {}}
            onClick={(e) => handleSubmit(e)}
            type='submit'
            value={value}
        />
    )
}
export { SubmitBtn }