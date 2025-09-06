import React, { useState } from 'react';

type Task = {
  id: number;
  text: string;
  completed: boolean;
};

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }]);
    setNewTask('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const clearCompleted = () => {
    setTasks(tasks.filter(t => !t.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <div style={{ maxWidth: 400, margin: '50px auto', padding: 20, backgroundColor: '#f9f9f9', borderRadius: 8, boxShadow: '0 0 10px rgba(0,0,0,0.1)', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>ToDo App</h1>

      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <input
          type="text"
          placeholder="Новая задача"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addTask()}
          style={{ flex: 1, padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
        />
        <button
          onClick={addTask}
          style={{ padding: '8px 12px', borderRadius: 4, border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}
        >
          Добавить
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 20 }}>
        <button onClick={() => setFilter('all')} disabled={filter === 'all'}>Все</button>
        <button onClick={() => setFilter('active')} disabled={filter === 'active'}>Невыполненные</button>
        <button onClick={() => setFilter('completed')} disabled={filter === 'completed'}>Выполненные</button>
      </div>

      <ul style={{ marginBottom: 20, paddingLeft: 0 }}>
        {filteredTasks.map(task => (
          <li key={task.id} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.text}</span>
          </li>
        ))}
      </ul>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span>Осталось задач: {tasks.filter(t => !t.completed).length}</span>
        <button onClick={clearCompleted} style={{ padding: '6px 10px', borderRadius: 4, border: 'none', backgroundColor: '#dc3545', color: '#fff', cursor: 'pointer' }}>
          Очистить выполненные
        </button>
      </div>
    </div>
  );
};

export default App;
