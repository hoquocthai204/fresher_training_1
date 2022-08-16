import './depoForm.scss'
import { useSelector, useDispatch } from 'react-redux'
import * as depoActions from '../../../redux/slices/depositslice'
import copyicon from '../../../imgs/copy.png'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

function DepoForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const depoStates = useSelector(state => state.depo)
    const loginStates = useSelector(state => state.login)

    function handleCopy(e) {
        navigator.clipboard.writeText(document.querySelector('.address input').value)
        e.target.title = 'copied'
    }

    function onHandleSubmit(data) {
        let coin = depoStates.coinSelected
        let token = loginStates.auth.token
        dispatch(depoActions.postHandleDepositApi({ data, coin, token }))
        navigate('/wallet')
    }

    return (
        <form action="" id='depo_form' onSubmit={handleSubmit(onHandleSubmit)} >

            <div className="address">
                <input type="text" readOnly value={depoStates.address} name='address' {...register('address')} />
                <img onClick={handleCopy} src={copyicon} alt="" />
            </div>
            {
                [{ name: 'amount', text: 'Amount' }, { name: 'tag', text: 'Tag / Memo' }].map(e => {
                    return (
                        <div className="input_container" key={e.name}>
                            <label htmlFor={e.name}>{e.text}</label>
                            <input type="text" id={e.name} name={e.name} {...register(e.name,
                                e.name === 'amount' && {
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                    },
                                })}
                                style={{ borderColor: errors[e.name] && "red" }}
                            />
                            {errors[e.name] && errors[e.name].type === "required" && <span>This is required</span>}
                            {errors[e.name] && errors[e.name].type === "pattern" && <span>Please input a number</span>}
                        </div>
                    )
                })
            }

            <button type='submit' >Deposit</button>
        </form>
    )
}
export default DepoForm