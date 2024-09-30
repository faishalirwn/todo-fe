import React, { ReactNode, useContext } from "react";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
                <Link href="/" className="text-xl font-bold">
                    To-Do App
                </Link>
                <nav>
                    {user ? (
                        <div className="flex gap-x-2 items-center">
                            <p>(Username: {user.username})</p>
                            <Link href="/todos" className="mr-4">
                                My To-Dos
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-red-500 px-3 py-1 rounded"
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/login" className="mr-4">
                                Login
                            </Link>
                            <Link href="/signup">Sign Up</Link>
                        </>
                    )}
                </nav>
            </header>
            <main className="flex-grow container mx-auto p-4">{children}</main>
        </div>
    );
};

export default Layout;
