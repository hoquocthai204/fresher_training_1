import './coinDetailRow.scss'

function CoinDetailRow(props) {
    return (
        <div className='coin_row'>
            <img width={20} height={20} src={props.image} alt="" />
            <div className='name'><span>{props.code}</span><span>{props.name}</span></div>
        </div>
    )
}
export default CoinDetailRow