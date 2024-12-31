import React from 'react'
import { DataTable } from 'react-native-paper';

const DisplayBudgetTable = ({ data }) => {
    return (
        <DataTable>
            <DataTable.Header>
                <DataTable.Title style={{paddingHorizontal: 10}}>Name</DataTable.Title>
                <DataTable.Title style={{paddingHorizontal: 10}}>Amount</DataTable.Title>
                <DataTable.Title style={{paddingHorizontal: 10}}>Period</DataTable.Title>
                <DataTable.Title style={{paddingHorizontal: 10}}>Currency</DataTable.Title>
                <DataTable.Title style={{paddingHorizontal: 10}}>StartDate</DataTable.Title>
                <DataTable.Title style={{paddingHorizontal: 10}}>EndDate</DataTable.Title>
                {/* <DataTable.Title style={{paddingHorizontal: 10}}>Categories</DataTable.Title> */}
                <DataTable.Title style={{paddingHorizontal: 10}}>Remaining</DataTable.Title>
            </DataTable.Header>
            {data.map((budget, index) => (
                <DataTable.Row
                    key={index}
                >
                    <DataTable.Cell style={{paddingHorizontal: 10}}>{budget.name}</DataTable.Cell>
                    <DataTable.Cell style={{paddingHorizontal: 10}} numeric>{budget.amount}</DataTable.Cell>
                    <DataTable.Cell style={{paddingHorizontal: 10}}>{budget.period}</DataTable.Cell>
                    <DataTable.Cell style={{paddingHorizontal: 10}}>{budget.currency}</DataTable.Cell>
                    <DataTable.Cell style={{paddingHorizontal: 10}}>{budget.startDate}</DataTable.Cell>
                    <DataTable.Cell style={{paddingHorizontal: 10}}>{budget.endDate}</DataTable.Cell>
                    {/* <DataTable.Cell style={{paddingHorizontal: 10}}>{budget.categories}</DataTable.Cell> */}
                    <DataTable.Cell style={{paddingHorizontal: 10}} numeric>{budget.remainingAmount}</DataTable.Cell>
                </DataTable.Row>
            ))}
        </DataTable>
    );
}

export default DisplayBudgetTable