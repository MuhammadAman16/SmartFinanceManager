import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const DisplayBudgetTable_2 = ({ data }) => {
    return (
        <ScrollView horizontal style={styles.tableContainer}>
            <View>
                {/* Table Header */}
                <View style={[styles.tableRow, styles.headerRow]}>
                    <Text style={[styles.tableCell, styles.headerCell]}>Name</Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>Amount</Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>Period</Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>Currency</Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>Start Date</Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>End Date</Text>
                    <Text style={[styles.tableCell, styles.headerCell]}>Remaining</Text>
                </View>
                {/* Table Rows */}
                {data.map((budget, index) => (
                    <View key={index} style={styles.tableRow}>
                        <Text style={styles.tableCell}>{budget.name}</Text>
                        <Text style={styles.tableCell}>{budget.amount}</Text>
                        <Text style={styles.tableCell}>{budget.period}</Text>
                        <Text style={styles.tableCell}>{budget.currency}</Text>
                        <Text style={styles.tableCell}>{budget.startDate}</Text>
                        <Text style={styles.tableCell}>{budget.endDate}</Text>
                        <Text style={styles.tableCell}>{budget.remainingAmount}</Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    tableContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        backgroundColor: '#f9f9f9',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    headerRow: {
        backgroundColor: '#f1f1f1',
    },
    tableCell: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        textAlign: 'center',

        borderRightWidth: 1,
        borderRightColor: '#ddd',
    },
    headerCell: {
        fontWeight: 'bold',
    },
});

export default DisplayBudgetTable_2;
