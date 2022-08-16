import { useSelector } from 'react-redux';
import './maincontent.scss'

function MainContent(props) {
    const states = useSelector(state => state.home);
    return (
        <div className='mainContent'>
            <h1>{props.t('market_trend')}</h1>
            <div className='info_container'>
                <div className='header_list'>
                    <span className='name'>{props.t('name')}</span>
                    <span className='lprice'>{props.t('last price')}</span>
                    <span className='change24h'>{props.t('change 24h')}</span>
                    <span className='markets'>{props.t('markets')}</span>
                </div>

                {
                    states.coinList.map((element) => {
                        let data = states.socketdata
                        return data.map(e => {
                            if (e[0] === element.code && e[1] === states.currency.code) {
                                return (
                                    <div className='item' key={element.id}>
                                        <div className='item_name'>
                                            <img width={25} height={25} src={element.image} alt="" />
                                            <div className='name'><span>{`${element.code}`}</span><span>{`${element.name}`}</span></div>
                                        </div>
                                        <span className='lprice'>{`${states.currency.symbol} ${e[2]}`}</span>
                                        <p>{e[3] > 0 ? (<span className='change24h increase'>{`${e[3]}%`}</span>) : (<span className='change24h decrease'>{`${e[3]}%`}</span>)}</p>
                                        <img src='https://s3.coinmarketcap.com/generated/sparklines/web/7d/2781/4172.svg' />
                                    </div>
                                )
                            }
                        })
                    })
                }

                <div className='view'>{props.t('view more')} <i className="fas fa-chevron-right"></i></div>
            </div>
        </div>
    )
}
export { MainContent }