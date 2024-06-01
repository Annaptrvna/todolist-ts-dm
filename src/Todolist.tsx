import React, {useState} from "react";
import {filterValue} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string)=> void
    changeFilterValue: (value: filterValue) => void
    addTask: (title:string) => void
}

export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}


export const Todolist = (props:TodolistPropsType) => {

    const [taskTitle, setTaskTitle] = useState("")
    const onClickDeleteHandler = (id: string) => {
        props.removeTask(id)
    }
    const onChangeTitleHandler = (title: string) => {
        setTaskTitle(title)
    }


    const onClickAddTaskHandler = () => {
        props.addTask(taskTitle.trim())
        setTaskTitle("")
    }

    const onKeyDownHandler = (key: string) => {
        key === "Enter" && onClickAddTaskHandler()
    }
    const onClickFilterHandler = (value: filterValue) => {
        props.changeFilterValue(value)
    }
   return (<div>
            <h3>{props.title}</h3>
            <div>
                <input
                    onChange={(e)=>onChangeTitleHandler(e.currentTarget.value)}
                    value={taskTitle}
                    onKeyDown={(e)=>onKeyDownHandler(e.code)}/>
                <button onClick={onClickAddTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>onClickDeleteHandler(task.id)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
                <div>
                    <button onClick={()=>{props.changeFilterValue("all")}}>All</button>
                    <button onClick={()=>{props.changeFilterValue("active")}}>Active</button>
                    <button onClick={()=>{props.changeFilterValue("completed")}}>Completed</button>
                </div>
        </div>)
}