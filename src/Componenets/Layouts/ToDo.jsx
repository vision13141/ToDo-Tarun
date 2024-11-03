import { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');
    const [search, setSearch] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [currentTime, setCurrentTime] = useState(new Date());
    const [filteredTodos, setFilteredTodos] = useState([]); // For filtered tasks
    const [isLoggedIn, setIsLoggedIn] = useState(true); // State to manage login status

    // Update clock every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Handle the Enter key globally
    useEffect(() => {
        const handleEnterKey = (event) => {
            if (event.key === 'Enter') {
                if (document.activeElement.id === 'todo-input') {
                    handleAddTodo(); // Add/Edit todo when input is focused
                } else if (document.activeElement.id === 'search-input') {
                    handleSearch(); // Trigger search when search input is focused
                }
            }
        };

        window.addEventListener('keydown', handleEnterKey);
        return () => window.removeEventListener('keydown', handleEnterKey);
    }, [input, search]);

    const handleAddTodo = () => {
        if (!input.trim()) return;

        if (isEditing) {
            setTodos((prev) =>
                prev.map((todo) =>
                    todo.id === editId ? { ...todo, text: input } : todo
                )
            );
            setIsEditing(false);
            setEditId(null);
        } else {
            setTodos([...todos, { id: Date.now(), text: input }]);
        }

        setInput('');
    };

    const handleDeleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const handleDeleteAll = () => {
        setTodos([]);
    };

    const handleEditTodo = (id, text) => {
        setIsEditing(true);
        setEditId(id);
        setInput(text);
    };

    // Handle search filter logic
    const handleSearch = () => {
        const filtered = todos.filter((todo) =>
            todo.text.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredTodos(filtered);
    };

    // Automatically filter todos as the search input changes
    useEffect(() => {
        handleSearch();
    }, [search, todos]);

    // Format current date and time in 12-hour format with AM/PM
    const formatTime = (date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM
        hours = hours % 12; // Convert to 12-hour format
        hours = hours ? hours : 12; // Adjust hour '0' to '12'
        return `${hours}:${minutes}:${seconds} ${ampm}`; // Return formatted time
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    useEffect(() => {
        // Update filteredTodos to show all tasks initially
        setFilteredTodos(todos);
    }, [todos]);

    // Render the app only if the user is logged in
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear()
        navigate('/')
    };

    return (
        <>
            <div className="min-h-screen flex flex-col items-center bg-gray-100 p-4">
                {/* Logout Button */}
                <div className="mb-4 ml-[700px]">
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>

                <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    {/* Digital Clock and Calendar */}
                    <div className="mb-6 text-center">
                        <h1 className="text-3xl font-bold mb-2 text-blue-700">
                            Todo List App
                        </h1>
                        <p className="text-xl font-semibold text-red-600 bg-green-500 p-4 inline-block rounded-full">
                            {formatTime(currentTime)} -{' '}
                            {formatDate(currentTime)}
                        </p>
                    </div>
                    {/* Todo List Box */}
                    <div className="flex gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Add a new task..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="border border-gray-300 rounded p-2 flex-grow"
                            id="todo-input" // Add an ID to identify the input field for Enter key
                        />
                        <button
                            onClick={handleAddTodo}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            {isEditing ? 'Edit' : 'Add'}
                        </button>
                    </div>

                    {/* Search Input with Search Icon */}
                    <div className="flex items-center gap-2 mb-4">
                        <input
                            type="text"
                            placeholder="Search tasks..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="border border-gray-300 rounded p-2 flex-grow"
                            id="search-input" // Add an ID to identify the search input field for Enter key
                        />
                        <FaSearch
                            onClick={handleSearch} // Trigger search when search icon is clicked
                            className="cursor-pointer text-gray-600"
                            size={24}
                        />
                    </div>

                    {/* Todo List Display */}
                    <ul>
                        {filteredTodos.length > 0 ? (
                            filteredTodos.map((todo) => (
                                <li
                                    key={todo.id}
                                    className="flex justify-between items-center bg-gray-100 p-2 mb-2 rounded"
                                >
                                    <span>{todo.text}</span>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() =>
                                                handleEditTodo(
                                                    todo.id,
                                                    todo.text
                                                )
                                            }
                                            className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() =>
                                                handleDeleteTodo(todo.id)
                                            }
                                            className="bg-red-500 text-white px-2 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </li>
                            ))
                        ) : (
                            <p className="text-center text-gray-500">
                                No tasks found
                            </p>
                        )}
                    </ul>

                    {todos.length > 0 && (
                        <div className="text-center mt-4">
                            <button
                                onClick={handleDeleteAll}
                                className="bg-red-600 text-white px-4 py-2 rounded"
                            >
                                Delete All
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default TodoApp;
