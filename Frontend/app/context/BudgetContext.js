import { View, Text } from 'react-native'
import React, { createContext, useState, useContext } from 'react'
import initialBudgets from '@/src/components/Data/OnGoingBudget/InitialBudgetsArray';

const BudgetConext = createContext();

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState(initialBudgets);
    const [budgetCategories, setBudgetCategories] = useState({
        ongoingbudgets: [],
        successfulbudgets: [],
        unsuccessfulbudgets: []
    });

    const addBudgets = (budgetEntry) => {
        setBudgets((prev) => [...prev, budgetEntry]);
    }

    return (
        <BudgetConext.Provider value={{ budgets, budgetCategories, addBudgets }}>
            {children}
        </BudgetConext.Provider>
    )
}

export const useBudget = () => useContext(BudgetConext)