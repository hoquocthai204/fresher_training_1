import './alertNote.scss'

function AlertNote({ text }) {
    return (
        <div className="alert_box">
            <p><i className="fas fa-exclamation-triangle"></i>{text}</p>
        </div>
    )
}
export { AlertNote }