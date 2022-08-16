import './passwordContainer.scss'
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../../../redux/slices/loginslice';
import { useEffect, useState } from 'react';

function PasswordContainer({ text, val }) {
    const dispatch = useDispatch()
    const loginstates = useSelector(state => state.login);
    const [eye, setEye] = useState(false)
    const [type, setType] = useState('password')

    function handleToggle() {
        setEye(!eye)
    }
    useEffect(() => {
        (!eye) ? setType('password') : setType('text')
    }, [eye])
    
    return (
        <div className='container'>
            <label>{text}</label>
            <div className="input_box">
                <input
                    type={type}
                    value={loginstates[val]}
                    onChange={(e) => {
                        dispatch(loginActions[`set${val}`](e.target.value))
                        localStorage.setItem(`${val}`, `${e.target.value}`)
                    }}
                />
                {
                    !eye ? <i onClick={handleToggle} className="fas fa-eye-slash"></i> : <i onClick={handleToggle} className="fas fa-eye"></i>
                }

            </div>
        </div>
    )
}
export { PasswordContainer }