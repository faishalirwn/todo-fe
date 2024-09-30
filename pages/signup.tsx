import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Link from "next/link";

const Signup = () => {
    const { signup } = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        await signup(username, password);
    };

    return (
        <div className="max-w-md mx-auto bg-white shadow p-6 rounded">
            <h2 className="text-2xl mb-4">Sign Up</h2>
            <form onSubmit={handleSignup}>
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
                        autoComplete="new-password"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Confirm Password</label>
                    <input
                        type="password"
                        className="w-full border px-3 py-2 rounded"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="new-password"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded"
                >
                    Sign Up
                </button>
            </form>
            <p className="mt-4 text-center">
                Already have an account?{" "}
                <Link href="/login" className="text-blue-600">
                    Login
                </Link>
            </p>
        </div>
    );
};

export default Signup;
