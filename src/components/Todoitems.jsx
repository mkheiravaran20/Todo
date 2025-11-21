import { useState,useRef,useEffect } from "react";
import {useTodos} from "../hooks/useTodos"

const Todoitems=({todo})=>{

const { deleteTodo, toggleTodo, updateTodo}= useTodos()
const[isEditing, setIsEditing]=useState(false)
const[draft, setDraft]=useState(todo.text)
 const inputRef = useRef(null);




useEffect(()=>{

if(isEditing&&inputRef.current){

    inputRef.current.select()
    inputRef.current.focus()

}





},[isEditing])

const onSave=()=>{

const trimmed=draft.trim()
if(!trimmed){
    setDraft(todo.text)
    setIsEditing(false)
    return
}

if (trimmed !==todo.text){
updateTodo(todo.id, trimmed)

}
setIsEditing(false)


}



const  onCancel=()=>{
    setDraft(todo.text)
    setIsEditing(false)
}

 return(
    <div className={`flex items-center justify-between p-3 border rounded-md   ${
        todo.completed ? "bg-gray-100 text-gray-500 line-through" : "bg-white"}`}>

            <div className="flex items-center gap-3 flex-1">
                <input type="checkbox"
                checked={todo.completed}
                onChange={()=>{toggleTodo(todo.id)}}
                className="w-5 h-5"
                        
                />

       {!isEditing && (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className="flex-1 cursor-text"
          >
            {todo.text}
          </span>
        )}


                 {isEditing && (
          <input
            ref={inputRef}
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            className="flex-1 border px-3 py-2 rounded focus:outline-none"
            onKeyDown={(e) => {
              if (e.key === "Enter") onSave();
              if (e.key === "Escape") onCancel();
            }}
          />
        )}   

            </div>
     <div className="flex items-center gap-2 ml-4">
        {!isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(true)}
              className="text-sm text-blue-600 hover:underline"
            >
              Edit
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-sm text-red-600"
            >
              Delete
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onSave}
              className="text-sm text-green-600 hover:underline"
            >
              Save
            </button>
            <button
              onClick={onCancel}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
          </>
        )}
      </div>

    </div>
 )

}


export default Todoitems;