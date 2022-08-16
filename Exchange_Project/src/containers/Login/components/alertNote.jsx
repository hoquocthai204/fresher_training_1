import { useSelector } from 'react-redux'

function AlertNote({ text }) {
    const states = useSelector(state => state.login)
    return (
        states.showAlert &&
        (<div className="alert_box">
            <p><i className="fas fa-exclamation-triangle"></i>{text}</p>
        </div>)
    )
}
export { AlertNote }