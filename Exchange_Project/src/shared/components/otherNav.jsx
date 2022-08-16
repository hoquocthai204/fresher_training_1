import { useDispatch, useSelector } from 'react-redux';
import * as Actions from '../../redux/slices/homeslice';
import * as HomeComponents from '../../containers/Home/components'
import './otherNav.scss'

function OtherNav({ t }) {
    const dispatch = useDispatch()
    const states = useSelector(state => state.home);
    const loginStates = useSelector(state => state.login);

    return (
        <div className='rightSide'>
            <div className='download_container'>
                <button className='download_btn' onClick={() => dispatch(Actions.setShowDownloadBox(!states.showDownloadBox))}>{t('download')}</button>
                {
                    states.showDownloadBox && (<HomeComponents.Download title={t('download_title')} btn={t('download_btn')} />)
                }
            </div>
            <div className='option_container'>
                <button className='other_option'>
                    {states.language.name}
                </button>
            </div>
        </div>
    )
}
export { OtherNav }