import { useSelector, useDispatch } from 'react-redux'
import * as regisActions from '../../../redux/slices/registerslice'
import './selectContainer.scss'

function SelectContainer({ t }) {
    const dispatch = useDispatch()

    function saveLangcode(e) {
        dispatch(regisActions.setlangCode(e.target.value))
    }
    return (
        <div className="container">
            <label htmlFor="select_box">{t('country')}</label>

            <select id="select_box" onChange={saveLangcode}>
                <option value="en">United States</option>
                <option value="vn">Vietnam (Việt Nam)</option>
            </select>
        </div>
    )
}
export { SelectContainer }