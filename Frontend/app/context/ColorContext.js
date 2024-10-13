import React, { createContext, useState } from "react";

export const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [selectedColor, setSelectedColor] = useState('');
    return (
        <ColorContext.Provider value={{ selectedColor, setSelectedColor }}>
            {children}
        </ColorContext.Provider>
    );
}