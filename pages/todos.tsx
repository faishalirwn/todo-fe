/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axiosInstance from "../utils/axios";
import TodoItem from "../components/TodoItem";
import { useRouter } from "next/router";

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const Todos = () => {
    const { user } = useContext(AuthContext);
    const router = useRouter();
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState("");

    useEffect(() => {
        if (!user) {
            router.push("/login");
        } else {
            fetchTodos();
        }
    }, [router, user]);

    const fetchTodos = async () => {
        try {
            const response = await axiosInstance.get("/todos");
            setTodos(response.data);
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to fetch to-dos");
        }
    };

    const handleAddTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTodo.trim()) return;
        try {
            await axiosInstance.post("/todos", { title: newTodo });
            setNewTodo("");
            fetchTodos();
        } catch (error: any) {
            alert(error.response?.data?.message || "Failed to add to-do");
        }
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl mb-4">My To-Dos</h1>
            <form onSubmit={handleAddTodo} className="flex mb-4">
                <input
                    type="text"
                    className="flex-grow border px-3 py-2 rounded-l"
                    placeholder="Add a new to-do"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    required
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-r"
                >
                    Add
                </button>
            </form>
            <div className="space-y-2">
                {todos.length === 0 ? (
                    <p className="text-gray-500">No to-dos yet. Add one!</p>
                ) : (
                    todos.map((todo) => (
                        <TodoItem
                            key={todo.id}
                            todo={todo}
                            onUpdate={fetchTodos}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Todos;
