import React from "react";

const transactions = [
    {
        type: 'expense',
        amount: 200,
        date: new Date('2023-09-02T14:00:00'),
        category: 'food',
    },
    {
        type: 'expense',
        amount: 100,
        date: new Date('2023-09-03T14:00:00'),
        category: 'entertainment',
    },
    {
        type: 'expense',
        amount: 4500,
        date: new Date('2024-09-05T14:00:00'),
        category: 'groceries',
    },
    {
        type: 'income',
        amount: 200,
        date: new Date('2023-09-06T14:00:00'),
        category: 'salary',
    },
    {
        type: 'income',
        amount: 500,
        date: new Date('2023-09-04T14:00:00'),
        category: 'freelance',
    },
];

export default transactions;