import React, { useState } from 'react';
import { usePagination, useTable } from 'react-table';
import { CountdownCircleTimer } from "react-countdown-circle-timer";

import { DataContainer, PaginationCont, TABLE, TableStyles, TD, THead, TBody, TR, TimerWrapper } from './style';


const HousePoolTransaction = () => {



    const [TokenData, setTokenData] = useState<any>([
        {
            'action': "Deposit",
            'total_value': 256.22,
            'account': '0x5f0da096A0B4e9da',
            'time': '23|Oct|2022 - 19:11',
            'locked': 200,
        },
        {
            'action': "Deposit",
            'total_value': 256.22,
            'account': '0x5f0da096A0B4e9da',
            'time': '23|Oct|2022 - 19:11',
            'locked': 50,

        },
        {
            'action': "Deposit",
            'total_value': 256.22,
            'account': '0x5f0da096A0B4e9da',
            'time': '23|Oct|2022 - 19:11',
            'locked': 70,

        },
        {
            'action': "Deposit",
            'total_value': 256.22,
            'account': '0x5f0da096A0B4e9da',
            'time': '23|Oct|2022 - 19:11',
            'locked': 8,

        },
    ])


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
                                            {row.cells.map((cell: any) => {

                                                // else
                                                if (cell.column.id === 'locked') return <td {...cell.getCellProps()}>

                                                    <TimerWrapper >
                                                        <CountdownCircleTimer
                                                            isPlaying
                                                            isLinearGradient={true}
                                                            duration={cell.value}
                                                            colors={[
                                                                ["#EF0896", 0],
                                                                ["#7007FF", 1],
                                                            ]}
                                                            size={55}
                                                            strokeWidth={4}
                                                        >
                                                            {renderTime}
                                                        </CountdownCircleTimer>
                                                    </TimerWrapper>

                                                    {/* {cell.value} */}
                                                </td>
                                                return <TD {...cell.getCellProps()}>{cell.render('Cell')}</TD>
                                            })}
                                        </TR>
                                    )
                                })
                                :
                                <tr>
                                    <td colSpan={5} style={{ textAlign: "center" }}>No Data Available</td>
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

                            <div className="dataCount">Showing 1 to 5 of 35 elements</div>
                            <div className="pageCount">
                                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                                    {'<'}
                                </button>{' '}
                                <strong>
                                    Page {pageIndex + 1} of {pageOptions.length}
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
                accessor: 'total_value',
            },
            {
                Header: 'ACCOUNT',
                accessor: 'account',
            },
            {
                Header: 'LOCKED FOR',
                accessor: 'locked',
            },
            {
                Header: 'TIME',
                accessor: 'time',
            },
        ],
        []
    )

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
        <DataContainer>
            HousePoolTransaction
            <TableStyles  >

                {TokenData && <Table columns={columns} data={TokenData} />}
            </TableStyles>

        </DataContainer >
    );
};

export default HousePoolTransaction;