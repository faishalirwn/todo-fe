import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
    const { login, user } = useContext(AuthContext);
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(username, password);
    };

    useEffect(() => {
        if (user) {
            router.push("/todos");
        }
    }, [router, user]);

    return (
        <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
            <h2 className="text-2xl mb-4">Login</h2>
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label className="block mb-1">Username</label>
                    <input
                        type="text"
                        className="w-full border px-3 py-2 rounded"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        autoComplete="username"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-center">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-blue-600">
                    Sign Up
                </Link>
            </p>
        </div>
    );
};

export default Login;
