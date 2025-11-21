import {useTodos} from "../hooks/useTodos";

export default function TodoFilters() {
  const { filter, setFilter, clearCompleted, todos } = useTodos();

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
      <div>{remaining} left</div>

      <div className="flex gap-3">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "font-bold" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={filter === "active" ? "font-bold" : ""}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={filter === "completed" ? "font-bold" : ""}
        >
          Completed
        </button>
      </div>

      <button onClick={clearCompleted} className="text-red-600">
        Clear
      </button>
    </div>
  );
}
