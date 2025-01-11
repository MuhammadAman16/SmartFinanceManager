import React, { useState, createContext, useEffect, useContext } from 'react';
import user_api from '../api/user_api';
import { AuthContext } from './AuthContext';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
    const { user } = useContext(AuthContext);
    const [activeAccount, setActiveAccount] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const fetchAccounts = async () => {
        try {
            if (!user || !user.id) {
                throw new Error('User ID is not available.');
            }
            let res = await user_api.get(`accounts?userId=${user.id}`);
            const dataArray = res.data;
            const account = dataArray.map(item => ({
                id: item.id,
                name: item.name,
                currency: item.currency
            }));
            setActiveAccount(account[0]);
        } catch (error) {
            if (error.response) {
                Alert.alert(`Error: ${error.response.data.error}`);
            } else if (error.request) {
                console.log('No response from server');
            } else {
                console.log('Error in Account: ', error.message);
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts();
    }, [user]);

    return (
        <AccountContext.Provider
            value={{ activeAccount, setActiveAccount, isLoading }}
        >
            {children}
        </AccountContext.Provider>
    );
};
