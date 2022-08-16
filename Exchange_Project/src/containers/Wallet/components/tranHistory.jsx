import TranFilterBox from '../../../shared/components/tranFilterBox';
import TranHisTable from './tranHisTable'
import TranHisExport from './tranHisExport';
import './tranHistory.scss'

function TranHistory() {
    return (
        <div className="tran_container">

            <div className="tran_header_box">
                <h1 className='tran_header'>Transaction History</h1>
                <button>Crypto</button>
            </div>

            <TranFilterBox />

            <TranHisExport />

            <TranHisTable />
        </div>
    )
}
export default TranHistory