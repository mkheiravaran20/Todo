import { TodoProvider } from "./context/ToDoContext";
import TodoForm from "./components/TodoForm";
import Todolist from "./components/Todolist";
import TodoFilters from "./components/TodoFilters";

export default function App() {
  return (
    <TodoProvider>
      <div className="min-h-screen flex items-start justify-center p-6">
        <div className="w-full max-w-2xl">
          <header className="mb-6">
            <h1 className="text-4xl font-extrabold tracking-widest text-center">TODO</h1>
          </header>

          <main className="bg-white shadow-md rounded-lg p-6">
            <TodoForm />
            <Todolist />
            <TodoFilters />
          </main>
        </div>
      </div>
    </TodoProvider>
  );
}
