import React, { useState } from 'react';
import { usePagination, useTable } from 'react-table';
import { DataContainer, PaginationCont, TABLE, TableStyles, TD, THead, TR } from './style';


const HousePoolTransaction = () => {


    const [TokenData, setTokenData] = useState<any>([
        {
            'action': "Deposit",
            'total_value': 256.22,
            'account': '0x5f0da096A0B4e9da',
            'time': '23|Oct|2022 - 19:11',
            'locked': 24,
        },
        {
            'action': "Deposit",
            'total_value': 256.22,
            'account': '0x5f0da096A0B4e9da',
            'time': '23|Oct|2022 - 19:11',
            'locked': 15,

        },
        {
            'action': "Deposit",
            'total_value': 256.22,
            'account': '0x5f0da096A0B4e9da',
            'time': '23|Oct|2022 - 19:11',
            'locked': 23.5,

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

                    <tbody {...getTableBodyProps()}>
                        {
                            page.length ?
                                page.map((row: any, i: number) => {
                                    prepareRow(row)

                                    return (
                                        <TR {...row.getRowProps()}>
                                            {row.cells.map((cell: any) => {

                                                // else
                                                // if (cell.column.id === 'dollar_Price') return <td {...cell.getCellProps()}>$ {cell.value}</td>
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
                    </tbody>
                </TABLE>
                {/* 
          Pagination can be built however you'd like. 
          This is just a very basic UI implementation:
        */}
                {
                    page.length ?
                        <PaginationCont className="pagination">

                            <div>Showing 1 to 5 of 35 elements</div>
                            <div>
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
    return (
        <DataContainer>
            HousePoolTransaction
            <TableStyles  >

                {TokenData && <Table columns={columns} data={TokenData} />}
            </TableStyles>
        </DataContainer>
    );
};

export default HousePoolTransaction;