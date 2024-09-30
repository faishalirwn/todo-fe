/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useState, useEffect, ReactNode } from "react";
import axiosInstance from "../utils/axios";
import { useRouter } from "next/router";

interface AuthContextType {
    user: User | null;
    login: (username: string, password: string) => Promise<void>;
    signup: (username: string, password: string) => Promise<void>;
    logout: () => void;
}

interface User {
    id: number;
    username: string;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {},
    signup: async () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        async function getUserInfo() {
            const response = await axiosInstance.get("/user");
            return response.data;
        }
        const token = localStorage.getItem("token");
        if (token) {
            getUserInfo().then((user) => {
                setUser({ id: user.id, username: user.username });
            });
        }
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await axiosInstance.post("/auth/login", {
                username,
                password,
            });
            const { token } = response.data;
            localStorage.setItem("token", token);
            const userInfoRes = await axiosInstance.get("/user");
            setUser({ id: userInfoRes.data.id, username });
            router.push("/todos");
        } catch (error: any) {
            alert(error.response?.data?.message || "Login failed");
        }
    };

    const signup = async (username: string, password: string) => {
        try {
            await axiosInstance.post("/auth/signup", { username, password });
            await login(username, password);
        } catch (error: any) {
            alert(error.response?.data?.message || "Signup failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
