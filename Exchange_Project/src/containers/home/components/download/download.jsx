import './download.scss'
import img from '../imgs/download.png'

function Download(props) {
    return (
        <div className='download_box'>
            <img src={img} />
            <p className='title'>{props.title}</p>
            <button className='download'>{props.btn}</button>
        </div>
    )
}
export { Download }