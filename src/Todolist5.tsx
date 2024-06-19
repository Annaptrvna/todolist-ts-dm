import React, {useState} from "react";
import {FilterValueType} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string, todolistId: string)=> void
    changeFilterValue: (filter: FilterValueType, todoLId: string) => void
    addTask: (title:string, todolistId: string) => void
    changeStatus: (id: string, todolistId: string, isDone: boolean) => void
    filter: FilterValueType
    todolistId: string
    removeTodolist: (todolistId: string) => void
}

export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean

}


export const Todolist5: React.FC<TodolistPropsType> = (props) => {
    const {
        title,
        tasks,
        removeTask,
        removeTodolist,
        changeFilterValue,
        addTask,
        changeStatus,
        filter,
        todolistId
    } = props

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null >(null)
    const onClickDeleteTaskHandler = (id: string) => {
        removeTask(id, todolistId)
    }
    const onChangeTitleHandler = (title: string) => {
        error && setError(null)
        setTaskTitle(title)
    }

    const onClickRemoveTodolistHandler = () =>{
        removeTodolist(todolistId)
        console.log(todolistId)
    }
    const onClickAddTaskHandler = () => {
        if(taskTitle === "") {
            setError("Task should not be empty")
        }
        else {addTask(taskTitle.trim(), todolistId)
        setTaskTitle("")}
    }

    const onKeyDownHandler = (key: string) => {
        setError(null)
    }

    const onchangeChangeStatusHandler = (id: string, isDone: boolean) => {
        changeStatus(id, todolistId, isDone)
    }
   return (<div>
            <h3>{title}</h3>
            <button onClick={onClickRemoveTodolistHandler}>Delete Todolist</button>
            <div>
                <input
                    className={error? "error" : ""}
                    onChange={(e)=>onChangeTitleHandler(e.currentTarget.value)}
                    value={taskTitle}
                    onKeyDown={(e)=>onKeyDownHandler(e.code)}/>
                <button onClick={onClickAddTaskHandler}>+</button>
                {error && <div className={"error-message"}>{error}</div>}
            </div>
            <ul>
                {tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input onChange={(e)=>onchangeChangeStatusHandler(task.id, e.currentTarget.checked)} type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>onClickDeleteTaskHandler(task.id)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
                <div>
                    <button className={filter==="all"? "active-filter" :""} onClick={()=>{changeFilterValue("all", todolistId )}}>All</button>
                    <button className={filter==="active"? "active-filter" :""} onClick={()=>{changeFilterValue("active", todolistId )}}>Active</button>
                    <button className={filter==="completed"? "active-filter" :""} onClick={()=>{changeFilterValue("completed", todolistId )}}>Completed</button>
                </div>
        </div>)
}