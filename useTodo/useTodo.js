import { todoReducer } from "./todoReducer"
import { useEffect, useReducer } from "react"
export const useTodo = () => {
    const initialState = [
        // {
        //     id: new Date().getTime(),
        //     descripcion:'Recolectar la piedra del Alma',
        //     done:false,
        // },
    
    ];
    const init = () =>{
        return JSON.parse(localStorage.getItem('todos') || [])
    }

    const [todos, dispatch] = useReducer(todoReducer, initialState, init)

    useEffect(() => {
      localStorage.setItem('todos',JSON.stringify(todos))
    
    }, [todos])
    

    const handleNewTodo =(todo) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        dispatch(action)
    } 

    const handleDeleteTodo = (id) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        })

    }
    const handleToggleTodo = (id) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        })

    }


  return {
    ...initialState,
    todos,
    todosCount: todos.length,
    pendingTodosCount:todos.filter( todo => !todo.done).length,
    handleDeleteTodo,
    handleNewTodo,
    handleToggleTodo,

  }
}
