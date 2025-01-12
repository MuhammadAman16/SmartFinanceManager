import React from 'react'
import { DataTable } from 'react-native-paper';

const DisplayBudgetTable = ({ data }) => {
    const headers = data.length > 0 ? Object.keys(data[0]) : [];

    return (
        <DataTable>
            <DataTable.Header>
                {headers.map((header, index) => (
                    <DataTable.Title
                        key={index}
                        style={{ paddingHorizontal: 10 }}
                    >
                        {header.charAt(0).toUpperCase() + header.slice(1)}
                    </DataTable.Title>
                ))}
            </DataTable.Header>
            {/* <DataTable.Header>
                <DataTable.Title style={{ paddingHorizontal: 10 }}>Name</DataTable.Title>
                <DataTable.Title style={{ paddingHorizontal: 10 }}>Amount</DataTable.Title>
                <DataTable.Title style={{ paddingHorizontal: 10 }}>Period</DataTable.Title>
                <DataTable.Title style={{ paddingHorizontal: 10 }}>Currency</DataTable.Title>
                <DataTable.Title style={{ paddingHorizontal: 10 }}>StartDate</DataTable.Title>
                <DataTable.Title style={{ paddingHorizontal: 10 }}>EndDate</DataTable.Title>
                <DataTable.Title style={{ paddingHorizontal: 10 }}>Remaining</DataTable.Title>
            </DataTable.Header> */}
            {data.map((budget, index) => (
                <DataTable.Row key={index}>
                    {headers.map((key, i) => (
                        <DataTable.Cell
                            key={i}
                            style={{
                                paddingHorizontal: 10,
                                flexWrap: 'wrap', // Allow text to wrap
                                flex: 1,          // Ensure flexible width
                            }}
                            numeric={typeof budget[key] === 'number'}
                        >
                            {budget[key]}
                        </DataTable.Cell>
                    ))}
                </DataTable.Row>
            ))}
            {/* {data.map((budget, index) => (
                <DataTable.Row key={index}>
                    <DataTable.Cell style={{ paddingHorizontal: 10 }}>{budget.name}</DataTable.Cell>
                    <DataTable.Cell style={{ paddingHorizontal: 10 }} numeric>{budget.amount}</DataTable.Cell>
                    <DataTable.Cell style={{ paddingHorizontal: 10 }}>{budget.period}</DataTable.Cell>
                    <DataTable.Cell style={{ paddingHorizontal: 10 }}>{budget.currency}</DataTable.Cell>
                    <DataTable.Cell style={{ paddingHorizontal: 10 }}>{budget.startDate}</DataTable.Cell>
                    <DataTable.Cell style={{ paddingHorizontal: 10 }}>{budget.endDate}</DataTable.Cell>
                    <DataTable.Cell style={{ paddingHorizontal: 10 }} numeric>{budget.remainingAmount}</DataTable.Cell>
                </DataTable.Row>
            ))} */}
        </DataTable>
    );
};


export default DisplayBudgetTable