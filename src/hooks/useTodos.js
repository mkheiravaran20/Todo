import {ToDoContext} from "../context/ToDoContext"
import { useContext } from "react"
export  function useTodos() {
    return useContext(ToDoContext)

}