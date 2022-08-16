import './tranHisExport.scss'
import {utils as XLSXUtils, writeFile} from 'xlsx'
import {useSelector} from 'react-redux'

function TranHisExport() {
    const states = useSelector(state=>state.tranHis)

    function export_to_excel(filename){
        const ws = XLSXUtils.json_to_sheet(states.exportData)
        const wb = XLSXUtils.book_new()
        XLSXUtils.book_append_sheet(wb, ws, filename)
        writeFile(wb,`${filename}.xlsx`)
    }   

    function handleExport(){
        export_to_excel('transaction_history')
    }
    return (
        <div className="export_link" onClick={handleExport}>
            <i class="fas fa-external-link-alt"></i>
            <span>Export Withdraw History</span>
        </div>
    )
}
export default TranHisExport