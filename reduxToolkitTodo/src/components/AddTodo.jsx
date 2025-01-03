import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setUpdate, updateTodo } from "../features/todo/todoSlice";

function AddTodo() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const update = useSelector((state) => state.update);

  const addTodoHandler = (e) => {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput("");
  };

  const updateTodoHandler = (e) => {
    e.preventDefault();
    // dispatch(addTodo(input));
    dispatch(updateTodo(input));
    setInput("");
    dispatch(setUpdate(undefined));
  };
  
  useEffect(() => {
    if (update) {
      setInput(update.text);
      console.log(update);
    }else{
      setInput("");
    }
  }, [update]);

  return (
    <form onSubmit={update !== undefined ? updateTodoHandler : addTodoHandler} className="space-x-3 mt-12">
      <input
        type="text"
        className="bg-gray-800 rounded border border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        placeholder="Enter a Todo..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      {update !== undefined ? (
        <button
          type="submit"
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        >
          Update
        </button>
      ) : (
        <button
          type="submit"
          className="text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
        >
          Add Todo
        </button>
      )}
    </form>
  );
}

export default AddTodo;
