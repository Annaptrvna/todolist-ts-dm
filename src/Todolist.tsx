import React from "react";
import {filterValue} from "./App";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string)=> void
    changeFilterValue: (value: filterValue) => void
}

export type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
export const Todolist = (props:TodolistPropsType) => {
    const onClickHandler = (id: string) => {
        props.removeTask(id)
    }

    const onClickFilterHandler = (value: filterValue) => {
        props.changeFilterValue(value)
    }
   return (<div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((task) => {
                    return (
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <button onClick={()=>onClickHandler(task.id)}>Delete</button>
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