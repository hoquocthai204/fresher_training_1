import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../../../redux/slices/homeslice';
import './language.scss'

const Language = (props) => {

    const dispatch = useDispatch()
    const states = useSelector(state => state.home);

    useEffect(() => {
        dispatch(Actions.languageListApi())
    }, [])

    function handleClick(element, name) {
        document.querySelectorAll('.lang_list .item').forEach((e) => {
            e.classList.remove('active')
        })

        document.querySelector(`.lang_list .${element}`).classList.add('active')
        let jsondata = {
            code: element,
            name: name
        }
        localStorage.setItem('lang', JSON.stringify(jsondata))
        dispatch(Actions.setLanguage(jsondata))

    }

    return (
        <div className='lang_container'>
            <h4 className='lang_header'>{props.title}</h4>
            <div className='lang_list'>
                {
                    states.langList.map(element => {
                        return <a key={element.code} className={`item ${element.code}`} onClick={() => handleClick(element.code, element.name)}>{element.name}</a>
                    })
                }
            </div>
        </div>
    )
}

export { Language }