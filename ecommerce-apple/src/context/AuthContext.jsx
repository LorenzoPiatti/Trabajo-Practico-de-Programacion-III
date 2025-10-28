import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);
    const [user, setUser] = useState(() => {
        const u = localStorage.getItem("currentUser");
        return u ? JSON.parse(u) : null;
    });

    useEffect(() => {
        if (token) localStorage.setItem("token", token);
        else localStorage.removeItem("token");
    }, [token]);

    useEffect(() => {
        if (user) localStorage.setItem("currentUser", JSON.stringify(user));
        else localStorage.removeItem("currentUser");
    }, [user]);

    const login = ({ token: newToken, user: userObj }) => {
        if (!userObj.role) userObj.role = "user";
        setToken(newToken);
        setUser({ ...userObj, token: newToken });
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("currentUser");
    };

    return (
        <AuthContext.Provider value={{ token, user, login, logout, isLoggedIn: !!token }}>
            {children}
        </AuthContext.Provider>
    );
}