import './coinDetailFiat.scss'

function CoinDetailFiat(props) {
    return (
        <div className='coin_detail'>
            <img width={25} height={25} src={props.image} alt="" />
            <div className='coin_name'><span>{`${props.code}`}</span><span>{`${props.name}`}</span></div>
        </div>
    )
}
export default CoinDetailFiat