import React, {useState} from "react";
import {filterValue} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string)=> void
    changeFilterValue: (value: filterValue) => void
    addTask: (title:string) => void
    changeStatus: (id: string, isDone: boolean) => void
    filter: filterValue
}

export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean

}


export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {
        title,
        tasks,
        removeTask,
        changeFilterValue,
        addTask,
        changeStatus,
        filter
    } = props

    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null >(null)
    const onClickDeleteHandler = (id: string) => {
        removeTask(id)
    }
    const onChangeTitleHandler = (title: string) => {
        setTaskTitle(title)
    }


    const onClickAddTaskHandler = () => {
        if(taskTitle === "") {
            setError("Task should not be empty")
        }
        else {addTask(taskTitle.trim())
        setTaskTitle("")}
    }

    const onKeyDownHandler = (key: string) => {
        setError(null)
        key === "Enter" && onClickAddTaskHandler()
    }

    const onchangeChangeStatusHandler = (id: string, isDone: boolean) => {
        changeStatus(id, isDone)
    }
   return (<div>
            <h3>{title}</h3>
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
                            <button onClick={()=>onClickDeleteHandler(task.id)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
                <div>
                    <button className={filter==="all"? "active-filter" :""} onClick={()=>{changeFilterValue("all")}}>All</button>
                    <button className={filter==="active"? "active-filter" :""} onClick={()=>{changeFilterValue("active")}}>Active</button>
                    <button className={filter==="completed"? "active-filter" :""} onClick={()=>{changeFilterValue("completed")}}>Completed</button>
                </div>
        </div>)
}