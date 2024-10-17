import React from "react";

const initialBudgets = [
    {
        id: '1',
        category: 'Home Budget',
        totalAmount: 5000,
        startDate: new Date('2024-09-01'),
        endDate: new Date('2024-09-30'),
        remainingAmount: 5000, // Initialize with totalAmount
    },
    {
        id: '2',
        category: 'Car Maintenance',
        totalAmount: 1000,
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-09-20'),
        remainingAmount: 1000, // Initialize with totalAmount
    },
    {
        id: '3',
        category: 'September Budget',
        totalAmount: 2000,
        startDate: new Date('2023-09-01'),
        endDate: new Date('2023-09-10'),
        remainingAmount: 2000, // Initialize with totalAmount
    },
];

export default initialBudgets;