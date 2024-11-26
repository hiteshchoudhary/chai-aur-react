import { useEffect, useState } from 'react'
import './App.css'
import { TodoProvider } from './contexts'
import { TodoForm } from './components/TodoForm';
import {TodoItem} from './components/TodoItem';

function App() {
  
  const [todos, setTodos] = useState([]);
  
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }
  
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo)));
  }

  // todos adds gets into local storage 

  useEffect(() => {
    const todos = JSON.parse(loacalStorage.getItem("todos"));

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, []);

  // todos into local storage 

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])
  
  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl px-4 py-3 mx-auto text-white rounded-lg shadow-md">
                    <h1 className="mt-2 mb-8 text-2xl font-bold text-center">Manage Your Todos</h1>
                    <div className="mb-4">
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {todos.map((todo) => (
                          <div 
                          key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo}/>
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App