import './withdrawForm.scss'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import * as withActions from '../../../redux/slices/withdrawslice'
import { useNavigate } from 'react-router-dom'


function WithForm() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const withStates = useSelector(state => state.with)
    const loginStates = useSelector(state => state.login)
    const { register, handleSubmit, formState: { errors } } = useForm()

    function onHandleSubmit(data) {
        console.log(data, withStates.coinSelected)
        let coin = withStates.coinSelected
        let token = loginStates.auth.token
        dispatch(withActions.postWithdrawApi({ coin, token, data }))
        navigate('/wallet')
    }

    return (
        <form action="" id='with_form' onSubmit={handleSubmit(onHandleSubmit)}>
            {
                [{ name: 'address', text: "Address" },
                { name: 'amount', text: 'Amount' },
                { name: 'tag', text: 'Tag / Memo' }].map(e => {
                    return (
                        <div className="input_container" key={e.name}>
                            <label htmlFor={e.name}>{e.text}</label>
                            <input type="text" id={e.name} name={e.name} {...register(e.name,
                                e.name === 'amount' ? {
                                    required: true,
                                    pattern: {
                                        value: /^[0-9]+$/,
                                    }
                                } :
                                    (e.name === 'address' && {
                                        required: true
                                    })
                            )}
                                style={{ borderColor: errors[e.name] && "red" }}
                            />
                            {errors[e.name] && errors[e.name].type === "required" && <span>{e.text} is required</span>}
                            {errors[e.name] && errors[e.name].type === "pattern" && <span>Please input a number</span>}
                        </div>
                    )
                })
            }
            <button type='submit' >Withdraw</button>
        </form>
    )
}
export default WithForm