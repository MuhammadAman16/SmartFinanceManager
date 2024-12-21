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
            const res = await user_api.get('budget');
            const today = new Date();
            const ongoing = res.data.filter((budget) => {
                const start = new Date(budget.startDate);
                const end = new Date(budget.endDate);
                return end.getTime() >= today.getTime() && start.getTime() <= today.getTime();
            })
            const successful = res.data.filter((budget) => {
                const end = new Date(budget.endDate);
                return end.getTime() <= today.getTime() && budget.remainingAmount >= 0;
            })
            const unsuccessful = res.data.filter((budget) => {
                const end = new Date(budget.endDate);
                return end.getTime() <= today.getTime() && budget.remainingAmount < 0;
            })
            // console.log(ongoing);
            setBudgets(res.data);
            setBudgetCategories({
                ongoingbudgets: ongoing,
                successfulbudgets: successful,
                unsuccessfulbudgets: unsuccessful
            });
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