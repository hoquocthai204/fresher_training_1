import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react'
import * as tranHisActions from '../../../redux/slices/tranHistorySlice'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import './tranHisTable.scss'
import copyicon from '../../../imgs/copy.png'

function TranHisTable() {
    const dispatch = useDispatch()
    const states = useSelector(state => state.tranHis)
    const loginStates = useSelector(state => state.login)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [rows, setRows] = useState([])

    const columns = [
        { id: 'time', label: 'Time', minWidth: 100 },
        { id: 'type', label: 'Type', minWidth: 100 },
        { id: 'wallet', label: 'Withdraw wallet', minWidth: 100, },
        { id: 'asset', label: 'Asset', minWidth: 100, },
        { id: 'amount', label: 'Amount', minWidth: 100, },
        { id: 'dest', label: 'Destination', minWidth: 100, },
        { id: 'src', label: 'TxID', minWidth: 100, },
        { id: 'status', label: 'Status', minWidth: 100, },
    ];

    useEffect(() => {
        let type = states.type
        let token = loginStates.auth.token
        let data = {
            'type.equals': type,
            size: 50,
            'coinCode.equals': states.asset,
            'status.equals': states.status
        }
        const timeStamp = new Date().getTime();
        const datepast = timeStamp - 24 * 60 * 60 * 1000 * states.time;
        data = {
            ...data,
            'fromDate.greaterThanOrEqual': new Date(datepast)
        }

        dispatch(tranHisActions.getTranHisApi({ data, token }))
    }, [states.type, states.asset, states.status, states.time])

    useEffect(() => {
        if (states.resApi.length > 0) {
            let rowstemp = states.resApi.slice(0).reverse().map(e => {
                let time = e.completedDate
                let type = e.type
                let wallet = 'Spot wallet'
                let asset = e.coinCode
                let amount = e.amount
                let dest = e.toAddr
                let src = e.fromAddr
                let status = e.status
                if (src === 'Unknown') {
                    src = ''
                }
                return { time, type, wallet, asset, amount, dest, src, status }
            })
            setRows(rowstemp)
            dispatch(tranHisActions.setExportData(rowstemp))
        }
        else {
            setRows([])
        }
    }, [states.resApi])

    function handleCopy(e, id) {
        navigator.clipboard.writeText(document.querySelector(`.span-${id}`).innerText)
        e.target.title = 'copied'
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper className='tranHisTable' sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {
                                                        column.id === 'dest' || (column.id === 'src' && value) ? <div><span className={`span-${column.id}`}>{value}</span> <img onClick={(e) => handleCopy(e, column.id)} src={copyicon} alt="" /></div> : value
                                                    }
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
export default TranHisTable