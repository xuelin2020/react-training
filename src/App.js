import React, { useState } from 'react';

const TodoList = ({ todos }) => {
    return (
        <ul>
            {todos.map((todo) => (
                <TodoItem
                    key={todo.id}
                    todo={todo} />
            ))}
        </ul>
    );
};

const TodoItem = ({ todo }) => {
    const [completed, setCompleted] = useState(todo.completed);

    const handleToggleComplete = () => {
        setCompleted(!completed);
    };

    return (
        <li>
            <input type="checkbox" checked={completed} onChange={handleToggleComplete} />
            <span style={{ textDecoration: completed ? 'line-through' : 'none' }}>{todo.text}</span>
        </li>
    );
};

const App = () => {
    const initialTodos = [
        { id: 1, text: 'Learn React', completed: false },
        { id: 2, text: 'Build a Todo App', completed: true },
        { id: 3, text: 'Deploy to production', completed: false },
    ];

    const [todos, setTodos] = useState(initialTodos);

    const handleReorder = () => {
        const shuffledTodos = [...todos];
        shuffledTodos.sort(() => Math.random() - 0.5); // 随机排序
        setTodos(shuffledTodos);
    };

    return (
        <div>
            <button onClick={handleReorder}>重新排序</button>
            <TodoList todos={todos} />
        </div>
    );
};

export default App;
