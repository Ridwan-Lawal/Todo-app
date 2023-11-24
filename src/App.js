import { useState } from "react";

export default function App() {
  return (
    <div className="h-screen px-6 flex justify-center items-center">
      <TodoContainer />
    </div>
  );
}

function TodoContainer() {
  const [todoLists, setTodoLists] = useState([]);
  const [task, setTask] = useState("");

  function handleAddTask(newTask) {
    setTodoLists((curList) => [...curList, newTask]);
  }

  function handleDeleteTask(id) {
    setTodoLists((curList) => curList.filter((todo) => todo.id !== id));
  }

  function handleEditTask(id, todo) {
    setTask(todo);
    handleDeleteTask(id);
  }

  return (
    <div className="bg-white rounded-md shadow-xl w-full max-w-md py-8 px-8">
      <Header />
      <AddTodoForm onAddTask={handleAddTask} task={task} setTask={setTask} />
      <TodoLists
        todoLists={todoLists}
        onEditTask={handleEditTask}
        onDeleteTask={handleDeleteTask}
      />
      <Footer todoLists={todoLists} />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1 className="text-gray-700 text-3xl font-bold">Todo App</h1>
    </header>
  );
}

function AddTodoForm({ onAddTask, task, setTask }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!task) return;

    const newTask = { task, id: crypto.randomUUID() };
    onAddTask(newTask);

    setTask("");
  }

  return (
    <form onSubmit={handleSubmit} className=" flex items-center gap-4 mt-6">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Add a new task..."
        className="border py-2 focus:outline-0 focus:border-purple-700 px-4 w-full text-slate-900  rounded-sm"
      />
      <button
        className={`${
          task ? "bg-purple-700" : "bg-purple-400"
        } hover:scale-105 transition-transform rounded-sm text-white font-bold text-3xl px-3 pb-2`}
      >
        +
      </button>
    </form>
  );
}

function TodoLists({ todoLists, onDeleteTask, onEditTask }) {
  return (
    <div className="mt-6 space-y-3">
      {todoLists.map((task) => (
        <TodoCard
          task={task}
          onEditTask={onEditTask}
          onDeleteTask={onDeleteTask}
          key={task.id}
        />
      ))}
    </div>
  );
}

function TodoCard({ task, onDeleteTask, onEditTask }) {
  return (
    <div className="bg-gray-100 group  rounded-md overflow-hidden pl-4 hover:cursor-pointer group flex items-center justify-between">
      <p className="text-blue-950 py-2">{task.task}</p>

      <aside className="flex opacity-0 transition-opacity duration-300  group-hover:opacity-100 overflow-hidden">
        <Buttons
          image="/edit.png"
          bgColor="bg-blue-700"
          onClick={() => onEditTask(task.id, task.task)}
        />
        <Buttons
          image="/delete.png"
          bgColor="bg-red-700"
          onClick={() => onDeleteTask(task.id)}
        />
      </aside>
    </div>
  );
}

function Buttons({ image, bgColor, onClick }) {
  return (
    <section onClick={onClick} className={`${bgColor} w-fit py-3 pl-3 pr-3 `}>
      <img src={image} className="w-4" alt="delete" />
    </section>
  );
}

function Footer({ todoLists }) {
  return (
    <div className="flex justify-between items-center mt-5">
      <p>You have {todoLists.length} pending tasks</p>
      <button
        className={`border py-2 px-5 rounded-md ${
          todoLists.length === 0
            ? "bg-purple-400 cursor-not-allowed"
            : "bg-purple-700 hover:scale-105 cursor-pointer"
        }   transition-transform text-white`}
      >
        Clear all
      </button>
    </div>
  );
}
