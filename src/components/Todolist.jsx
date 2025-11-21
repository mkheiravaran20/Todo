import { useTodos } from "../hooks/useTodos";
import  Todoitems from "../components/Todoitems"

 const Todolist = () => {


    const { filteredTodos } = useTodos();
  return (
    <div className="space-y-3">
      {filteredTodos.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No tasks yet.</p>
      ) : (
        filteredTodos.map((t) => <Todoitems key={t.id} todo={t} />)
      )}
    </div>
  );
}
export default Todolist;