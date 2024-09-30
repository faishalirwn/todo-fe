import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";

const Home = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/todos");
        }
    }, [router, user]);

    return (
        <div className="text-center">
            <h1 className="text-4xl mb-6">Welcome to the To-Do App</h1>
            <div className="space-x-4">
                <Link
                    href="/login"
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Login
                </Link>
                <Link
                    href="/signup"
                    className="bg-green-600 text-white px-4 py-2 rounded"
                >
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Home;
