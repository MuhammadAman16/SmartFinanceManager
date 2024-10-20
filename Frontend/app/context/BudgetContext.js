import React, { createContext, useState, useContext, useEffect } from 'react'
import initialBudgets from '@/src/components/Data/OnGoingBudget/InitialBudgetsArray';
import user_api from '../api/user_api';

const BudgetConext = createContext();

export const BudgetProvider = ({ children }) => {
    const [budgets, setBudgets] = useState(initialBudgets);
    const [loading, setLoading] = useState(true);
    const [budgetCategories, setBudgetCategories] = useState({
        ongoingbudgets: [],
        successfulbudgets: [],
        unsuccessfulbudgets: []
    });

    const fetchAllBudget = async () => {
        try {
            const res = await user_api.get('api/budget');
            setBudgets(res.data);
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                console.log('No response from server');
            } else {
                console.log('Error: ', error.error);
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchAllBudget();
    }, [])

    const addBudgets = (budgetEntry) => {
        setBudgets((prev) => [...prev, budgetEntry]);
    }

    return (
        <BudgetConext.Provider value={{ budgets, budgetCategories, addBudgets, loading }}>
            {children}
        </BudgetConext.Provider>
    )
}

export const useBudget = () => useContext(BudgetConext)