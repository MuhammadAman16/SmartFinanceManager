// src/components/BudgetDetail/utils.js
import transactions from "../Data/OnGoingBudget/TransacionsArray";

export const filterDateRange = (transactions, startDate, endDate) => {
    return transactions.filter(
      (transaction) =>
        transaction.date >= startDate && transaction.date <= endDate
    );
  };
  
  export const calculateAmountSpent = () => {
    let totalIncome = 0;
    let totalExpenses = 0;
  
    transactions.forEach((transaction) => {
      if (transaction.type === 'income') {
        totalIncome += transaction.amount;
      } else if (transaction.type === 'expense') {
        totalExpenses += transaction.amount;
      }
    });
  
    return { totalIncome, totalExpenses };
  };
  
  export const getExpenseByCategory = () => {
    const expenses = transactions
      .filter((transaction) => transaction.type === 'expense')
      .reduce((acc, transaction) => {
        const { category, amount } = transaction;
        acc[category] = (acc[category] || 0) + amount;
        return acc;
      }, {});
  
    return Object.keys(expenses)
      .map((category) => ({
        category,
        amount: expenses[category],
        color: `#${Math.floor(Math.random() * 16777215).toString(16)}`,
        legendFontColor: '#7F7F7F',
        legendFontSize: 9,
      }))
      .sort((a, b) => b.amount - a.amount);
  };
  
  export const calculateCashFlow = (transactions, startDate, endDate) => {
    let cashFlow = 0;
    const cashFlowData = [];
    const sortedTransactions = [...transactions].sort((a, b) => a.date - b.date);
  
    for (
      let date = new Date(startDate);
      date <= endDate;
      date.setDate(date.getDate() + 1)
    ) {
      const formattedDate = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  
      sortedTransactions.forEach((transaction) => {
        const transactionDate = `${String(transaction.date.getMonth() + 1).padStart(2, '0')}-${String(transaction.date.getDate()).padStart(2, '0')}`;
  
        if (transactionDate === formattedDate) {
          if (transaction.type === 'income') {
            cashFlow -= transaction.amount;
          } else if (transaction.type === 'expense') {
            cashFlow += transaction.amount;
          }
        }
      });
  
      cashFlowData.push({ date: formattedDate, cashFlow });
    }
  
    return cashFlowData;
  };
  