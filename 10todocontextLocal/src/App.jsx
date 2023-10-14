import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  const secondaryColors = [
    "#336600", // Dark Green
    "#33cc33", // Green + Blue = Cyan (Light)
    "#009933", // Dark Green
    "#339966", // Dark Cyan
    "#336666", // Dark Cyan
    "#003366", // Dark Blue
    "#3333cc", // Blue + Red = Purple (Light)
    "#6600cc", // Dark Purple
    "#660066", // Dark Purple
    "#ff33cc", // Red + Blue = Magenta (Light)
    "#cc3399", // Dark Magenta
    "#996699", // Dark Magenta
    "#663366", // Dark Magenta
    "#ff6666", // Red + Green = Yellow (Light)

    "#cc66cc", // Red + Blue = Magenta (Light)
    "#993333", // Dark Red
    "#663333", // Dark Red
    "#ff6633", // Red + Green = Yellow (Light)
    "#ff9966", // Red + Green = Yellow (Light)
    "#ff3300", // Dark Red
    "#cc9933", // Dark Yellow
    "#996633", // Dark Yellow
    "#996600", // Dark Yellow
    "#666600", // Dark Yellow
  ];

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  useEffect(() => {
    const RandomColor =
      secondaryColors[Math.floor(Math.random() * secondaryColors.length)];

    const RandomColorExecution = () => {
      document.querySelector("body").style.backgroundColor = RandomColor;
    };
    RandomColorExecution();
  });
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    const ArrayLength =
      secondaryColors[Math.floor(Math.random() * secondaryColors.length)];
    const Doc = () => {
      document.querySelector("body").style.backgroundColor = ArrayLength;
    };
    Doc();
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
