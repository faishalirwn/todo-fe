/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import axiosInstance from "../utils/axios";

interface ToDoItemProps {
    todo: Todo;
    onUpdate: () => void;
}

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const ToDoItem: React.FC<ToDoItemProps> = ({ todo, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(todo.title);
    const [completed, setCompleted] = useState(todo.completed);

    const handleUpdate = async () => {
        try {
            await axiosInstance.put(`/todos/${todo.id}`, { title, completed });
            setIsEditing(false);
            onUpdate();
        } catch (error: any) {
            alert(error.response?.data?.message || "Update failed");
        }
    };

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this to-do?")) return;
        try {
            await axiosInstance.delete(`/todos/${todo.id}`);
            onUpdate();
        } catch (error: any) {
            alert(error.response?.data?.message || "Delete failed");
        }
    };

    return (
        <div className="flex items-center justify-between border-b py-2">
            {isEditing ? (
                <div className="flex items-center flex-grow">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={completed}
                        onChange={(e) => setCompleted(e.target.checked)}
                    />
                    <input
                        type="text"
                        className="w-full border px-2 py-1 rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
            ) : (
                <div className="flex items-center flex-grow">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={completed}
                        onChange={async (e) => {
                            const newCheckedValue = e.target.checked;
                            setCompleted(newCheckedValue);
                            try {
                                await axiosInstance.put(`/todos/${todo.id}`, {
                                    completed: newCheckedValue,
                                });
                                onUpdate();
                            } catch (error: any) {
                                alert(
                                    error.response?.data?.message ||
                                        "Update failed"
                                );
                                setCompleted(!newCheckedValue);
                            }
                        }}
                    />
                    <span
                        className={
                            completed ? "line-through text-gray-500" : ""
                        }
                    >
                        {todo.title}
                    </span>
                </div>
            )}
            <div className="flex items-center space-x-2">
                {isEditing ? (
                    <>
                        <button
                            onClick={handleUpdate}
                            className="bg-green-500 text-white px-2 py-1 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="bg-gray-500 text-white px-2 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                        >
                            Edit
                        </button>
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                        >
                            Delete
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default ToDoItem;
