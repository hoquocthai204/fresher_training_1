import { useEffect, useMemo, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import * as fiatActions from '../../../redux/slices/fiatslice'
import CoinDetailFiat from './coinDetailFiat'
import ActionFiat from './actionFiat'
import './fiatTable.scss'

function FiatTable(props) {
    const dispatch = useDispatch()
    const fiatStates = useSelector(state => state.fiat)
    const homeStates = useSelector(state => state.home)
    const loginStates = useSelector(state => state.login)
    const authStates = useSelector(state => state.auth)
    const [rows, setRows] = useState([])
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const columns = [
        { id: 'coin', label: 'Coin', width: 100 },
        { id: 'total', label: 'Total', width: 100, format: (value) => Number(value).toFixed(8) },
        {
            id: 'available',
            label: 'Available',
            width: 100,
            align: 'left',
            format: (value) => Number(value).toFixed(8),
        },
        {
            id: 'blocked',
            label: 'In Order',
            width: 100,
            align: 'left',
            format: (value) => Number(value).toFixed(8),
        },
        {
            id: 'value',
            label: `${homeStates.currency.code} Value`,
            width: 100,
            align: 'left',
            format: (value) => value.toString()
        },
        {
            id: 'action',
            label: 'Action',
            width: 350,
            align: 'left',
        },
    ];

    function updateRows() {
        let rowstemp = fiatStates.walletList.map(element => {
            let coin = element.coinCode
            let available = Number(element.availableBalance)
            let blocked = Number(element.blockedBalance)
            let valuation = Number(element.valuation)
            let total = available + blocked
            let value = `${homeStates.currency.symbol}${(total * valuation).toFixed(2)}`
            return { coin, total, available, blocked, value }
        })
        setRows(rowstemp)
    }


    useMemo(() => {
        if (loginStates.auth.token) {
            let curr = homeStates.currency.code
            let token = loginStates.auth.token
            dispatch(fiatActions.getWalletListApi({ curr, token }))
        }
    }, [authStates.unreadNotification])

    useEffect(() => {
        let balnNum = 0

        if (fiatStates.walletList.length > 0) {
            let rowstemp = fiatStates.walletList.map(element => {
                let coin = element.coinCode
                let available = Number(element.availableBalance)
                let blocked = Number(element.blockedBalance)
                let valuation = Number(element.valuation)
                let total = available + blocked
                let value = `${homeStates.currency.symbol}${(total * valuation).toFixed(2)}`
                balnNum += total * valuation
                return { coin, total, available, blocked, value }
            })
            setRows(rowstemp)
            dispatch(fiatActions.setBalanceNum(balnNum))
        }
    }, [fiatStates.walletList])

    // handle CheckHide
    useEffect(() => {
        if (props.checkHide) {
            let rowstemp = []
            rows.forEach(element => {
                let total = element.available + element.blocked
                if (total > 0) {
                    rowstemp = [...rowstemp, { ...element }]
                }
            })
            setRows(rowstemp)
        }
        else {
            updateRows()
        }
    }, [props.checkHide])

    useEffect(() => {
        if (props.searchValue !== '') {
            let rowstemp = []
            rows.forEach(element => {
                if (element.coin.includes(props.searchValue.toUpperCase())) {
                    console.log()
                    rowstemp.push({ ...element })
                }
            })
            setRows(rowstemp)
        }
        else {
            updateRows()
        }
    }, [props.searchValue])

    const handleChangePage = (event, newPage) => {
        console.log(newPage)
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead className='tab_header'>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ width: column.width }}
                                >
                                    <div className="header_detail">
                                        {column.label}
                                        {column.id !== 'action' && <i class="fas fa-sort"></i>}
                                    </div>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    <TableRow className='rowCoin' hover role="checkbox" tabIndex={-1} key={row.coin}>

                                        {columns.map((column) => {
                                            let value = row[column.id];

                                            if (column.format)
                                                value = column.format(value)

                                            let image, name

                                            homeStates.coinList.forEach(element => {
                                                if (element.code === value) {
                                                    image = element.image
                                                    name = element.name
                                                }
                                            })

                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === 'coin' ?
                                                        <CoinDetailFiat code={value} name={name} image={image} />
                                                        : (column.id === 'action' ? <ActionFiat /> : <input className='coinInfo' key={column.id} type={fiatStates.balanceType} value={value} readOnly />)}

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

export default FiatTable