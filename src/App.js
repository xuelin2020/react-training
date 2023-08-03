import React, { useState } from 'react';

const TodoList = ({ todos, hasKey }) => {
    return (
        <ul>
            {todos.map((todo) => (
                hasKey ? <TodoItem key={todo.id} todo={todo}/> : <TodoItem todo={todo}/>
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
    const [hasKey, setHasKey] = useState(true)

    const handleReorder = () => {
        const shuffledTodos = [...todos];
        shuffledTodos.sort(() => Math.random() - 0.5); // 随机排序
        setTodos(shuffledTodos);

    };
    const handleKey = () => {
        setHasKey(!hasKey)
    }

    return (
        <div>
            <button onClick={handleReorder}>重新排序</button>
            {' '}
            <button onClick={handleKey} style={{background: hasKey ? "green" : 'red'}}>设置key</button>
            <TodoList todos={todos} hasKey={hasKey} />
        </div>
    );
};

export default App;
