import './inputContainer.scss'
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from '../../../redux/slices/loginslice';

function InputContainer({ type, text, val }) {
    const dispatch = useDispatch()
    const loginstates = useSelector(state => state.login);
    return (
        <div className='container'>
            <label>{text}</label>
            <input
                type={type}
                value={loginstates[val]}
                onChange={(e) => {
                    dispatch(loginActions[`set${val}`](e.target.value))
                    localStorage.setItem(`${val}`, `${e.target.value}`)
                }}
            />
        </div>
    )
}
export { InputContainer }