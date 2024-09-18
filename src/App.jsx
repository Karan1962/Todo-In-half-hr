import { useState } from "react";
import { todos } from "./index.js";

const App = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
  });

  const [todoList, setTodoList] = useState(todos);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const newTodo = { ...data, id: Date.now(), complete: false };
    setData({
      title: "",
      description: "",
    });
    setTodoList((prev) => {
      return [...prev, newTodo];
    });
  };

  const handleDelete = (id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleComplete = (id) => {
    setTodoList((prev) => {
      return prev.map((todo) => {
        return todo.id === id ? { ...todo, complete: !todo.complete } : todo;
      });
    });
  };
  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          width: "500px",
          margin: "auto",
        }}
      >
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={data.title}
          onChange={handleChange}
        />
        <input
          type="text"
          placeholder="description"
          name="description"
          value={data.description}
          onChange={handleChange}
        />
        <button onClick={handleClick}>Add Todo</button>
      </div>
      {todoList.map((todo) => {
        return (
          <div key={todo.id}>
            <div>{todo.title}</div>
            <div>{todo.description}</div>
            <button onClick={() => handleComplete(todo.id)}>
              {todo.complete === true ? "Completed" : "Mark As Done"}
            </button>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </div>
        );
      })}
    </div>
  );
};

export default App;
