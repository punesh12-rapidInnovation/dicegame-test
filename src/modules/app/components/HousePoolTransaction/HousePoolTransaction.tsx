import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { usePagination, useTable } from 'react-table';
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { DataContainer, PaginationCont, TABLE, TableStyles, TD, THead, TBody, TR, TimerWrapper } from './style';
import axios from 'axios';
import { convertToEther, dateFromTimestamp, timeFromTimestamp } from 'utils/helper';
import CircleTimer from 'shared/circleTimer/CircleTimer';


const HousePoolTransaction = (props: any) => {
    const { depositDoneNumber, withdrawDoneNumber } = props;


    // const [TokenData, setTokenData] = useState<any>([
    //     {
    //         'action': "Deposit",
    //         "_sender": "0x6531B1e3745802bb92F3BaFcE20dBb547f39f222",
    //         "_amount": "100000000000000000",
    //         "_depositedTime": "1639378776",
    //         "_boxNum": "30",
    //         "_releaseTime": "1639378836",
    //         'locked': 20,

    //     },

    // ])
    const [depositTxs, setDepositTxs] = useState<any>([])
    const [withdrawTxs, setWithdrawTxs] = useState<any>([])
    const [lockedTimeLeft, setLockedTimeLeft] = useState<any>([]);
    const [lockedTimeIntervalId, setLockedTimeIntervalId] = useState<any>([]);

    const { userAddress } = useSelector((state: any) => state.wallet);

    useEffect(() => {
        const axiosInstance = axios.create({
            baseURL: "https://diceroll.rapidinnovation.tech/pool",
        });
        const getdata = async () => {
            console.log(userAddress);
            if (userAddress) {
                const res2 = await axiosInstance.get(`/alldeposit/${userAddress}`)
                console.log("deposit api", res2);

                const depositTxs: any[] = Array.isArray(res2.data) ? res2.data : [];
                setDepositTxs(depositTxs.map((item: any) => ({ ...item, action: "Deposit", locked: item._releaseTime - item._depositedTime, })));


                const res3 = await axiosInstance.get(`/allwithdraw/${userAddress}`)
                const withdrawTxs: any[] = Array.isArray(res3.data) ? res3.data : [];
                setWithdrawTxs(withdrawTxs.map((item: any) => ({ ...item, action: "Withdraw" })));

            }
        } //

        getdata();
    }, [userAddress,depositDoneNumber,withdrawDoneNumber])


    useEffect(() => {
        depositTxs.forEach((item: any, i: number) => {
            localStorage.setItem(`lockedTime${i}`, `${item._releaseTime - item._depositedTime}`);
            const intervalId = setInterval(() => {
                const lockedTimeString: any = localStorage.getItem(`lockedTime${i}`);
                let lockedTime = parseFloat(lockedTimeString);
                if (!lockedTime) {
                    clearInterval(intervalId)
                } else {
                    localStorage.setItem(`lockedTime${i}`, `${lockedTime - 1}`)
                }
            }, 1000);
            setLockedTimeIntervalId([...lockedTimeIntervalId, intervalId])
        })

        return () => {
            depositTxs.forEach((item: any, i: number) => {
                localStorage.removeItem(`lockedTime${i}`);
                clearInterval(lockedTimeIntervalId[i])
            })
        }
    }, [depositTxs])






    function Table({ columns, data }: { columns: any, data: any }) {
        // Use the state and functions returned from useTable to build your UI
        const {
            getTableProps,
            getTableBodyProps,
            headerGroups,
            prepareRow,
            // @ts-ignore
            page, // Instead of using 'rows', we'll use page,
            // which has only the rows for the active page

            // The rest of these things are super handy, too ;)
            // @ts-ignore
            canPreviousPage,
            // @ts-ignore
            canNextPage,
            // @ts-ignore
            pageOptions,
            // @ts-ignore
            pageCount,
            // @ts-ignore
            gotoPage,
            // @ts-ignore
            nextPage,
            // @ts-ignore
            previousPage,
            // @ts-ignore
            setPageSize,
            // @ts-ignore
            state: {
                // @ts-ignore
                pageIndex,
                // @ts-ignore
                pageSize
            },
        } = useTable(
            {
                columns,
                data,
                initialState: {
                    // @ts-ignore 
                    pageIndex: 0
                },
            },
            usePagination
        )

        console.log("pageOptions",pageOptions);
        console.log("page",page);
        
        // Render the UI for your table
        return (
            <>
                <TABLE {...getTableProps()}>
                    <THead>
                        {headerGroups.map((headerGroup: any) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column: any) => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </THead>

                    <TBody {...getTableBodyProps()}>
                        {
                            page.length ?
                                page.map((row: any, i: number) => {
                                    prepareRow(row)

                                    return (
                                        <TR className="table-row" {...row.getRowProps()}>
                                            {row.cells.map((cell: any, rowIndex: number) => {

                                                // else
                                                if (cell.column.id === 'locked') return <td {...cell.getCellProps()}>

                                                    {cell.value &&
                                                        //   <TimerWrapper >
                                                        //     <CountdownCircleTimer
                                                        //         isPlaying
                                                        //         isLinearGradient={true}
                                                        //         duration={cell.value}
                                                        //         colors={[
                                                        //             ["#EF0896", 0],
                                                        //             ["#7007FF", 1],
                                                        //         ]}
                                                        //         size={55}
                                                        //         strokeWidth={4}
                                                        //     >
                                                        //         {renderTime}
                                                        //     </CountdownCircleTimer>
                                                        // </TimerWrapper>
                                                        <CircleTimer
                                                            value={cell.value}
                                                            // value={lockedTimeLeft} 
                                                            rowIndex={rowIndex}
                                                        ></CircleTimer>
                                                        // <p>7</p>
                                                    }

                                                    {/* {cell.value} */}
                                                </td>

                                                if (cell.column.Header === "TOTAL VALUE") return <TD {...cell.getCellProps()}>{parseFloat(convertToEther(cell.value))} PLS</TD>
                                                if (cell.column.Header === "ACCOUNT") return <TD {...cell.getCellProps()}>{cell.value.slice(0, 4)}...{cell.value.slice(-4)}</TD>
                                                if (cell.column.Header === "TIME") return <TD {...cell.getCellProps()}>{dateFromTimestamp(cell.value)} {timeFromTimestamp(cell.value)}</TD>

                                                return <TD {...cell.getCellProps()}>{cell.render('Cell')}</TD>
                                            })}
                                        </TR>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan={5}> <div style={{ textAlign: "center", color: '#fff', marginTop: "20px" }}>No Data Available</div></td>
                                </tr>
                        }
                    </TBody>
                </TABLE>
                {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
                {
                    page.length ?
                        <PaginationCont className="pagination">

                            <div className="dataCount">Showing {parseFloat(page[0].id) + 1} to {parseFloat(page[page.length-1 ].id) + 1} of {data.length} elements</div>
                            <div className="pageCount">
                                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    {'<'}
                                </button>{' '}
                                <strong>
                                    Page {pageIndex + 1} of {pageCount}
                                </strong>
                                <button onClick={() => nextPage()} disabled={!canNextPage}>
                                    {'>'}
                                </button>{' '}
                                {' '}
                            </div>

                        </PaginationCont>
                        : null
                }
            </>
        )
    }


    const columns = React.useMemo(
        () => [

            {
                Header: 'ACTION',
                accessor: 'action',
            },
            {
                Header: 'TOTAL VALUE',
                accessor: '_amount',
            },
            {
                Header: 'ACCOUNT',
                accessor: '_sender',
            },
            {
                Header: 'LOCKED FOR',
                accessor: 'locked',
            },
            {
                Header: 'TIME',
                accessor: 'createdAt',
            },
        ],
        []
    )
    //@ts-ignore 
    const renderTime = ({ remainingTime }) => {
        if (remainingTime === 0) {
            return <div className="timer">0</div>;
        }
        else
            return (
                <div className="timer">
                    {/* <div className="text">Remaining time</div> */}
                    <div className="value">{formatRemainingTime(remainingTime)}</div>
                </div>
            );
    }

    const formatRemainingTime = (time: any) => {
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        return `${minutes}:${seconds}`;
    };
    return (
        <>
            <DataContainer>
                <TableStyles  >

                    {depositTxs && <Table columns={columns} data={[...depositTxs, ...withdrawTxs]} />}
                </TableStyles>

            </DataContainer >
        </>
    );
};

export default HousePoolTransaction;