import React, { createContext, useState, useEffect } from 'react'
import * as SecureStore from 'expo-secure-store';
import { jwtDecode } from 'jwt-decode';
import { useNavigation } from '@react-navigation/native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const currentTime = Math.floor(Date.now() / 1000); // Convert to seconds
            return decodedToken.exp < currentTime; // Check if the token has expired
        } catch (error) {
            console.error("Error decoding token:", error);
            return true; // Treat token as expired if decoding fails
        }
    };

    const loadUser = async () => {
        try {
            const token = await SecureStore.getItemAsync('jwtToken');
            if (token) {
                if (isTokenExpired(token)) {
                    await logout();
                } else {
                    const decodedToken = jwtDecode(token)
                    setUser(
                        {
                            fullName: decodedToken.fullName,
                            id: decodedToken.id,
                            email: decodedToken.email
                        }
                    );
                }
            }
        } catch (error) {
            console.error("Error loading token : ", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadUser();
    }, []);

    const login = async (token) => {
        await SecureStore.setItemAsync('jwtToken', token);
        const decodedToken = jwtDecode(token);
        setUser(
            {
                fullName: decodedToken.fullName,
                id: decodedToken.id,
                email: decodedToken.email
            }
        );
    }

    const signup = async (token) => {
        try {
            await SecureStore.setItemAsync('jwtToken', token);
            const decodedToken = jwtDecode(token);
            setUser(
                {
                    fullName: decodedToken.fullName,
                    id: decodedToken.id,
                    email: decodedToken.email
                }
            );
        } catch (error) {
            console.error("Error while storing user : ", error);
        }
    }

    const logout = async () => {
        await SecureStore.deleteItemAsync('jwtToken');
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading, signup }}>
            {children}
        </AuthContext.Provider>
    )
}