import React from "react";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
}

type TaskPropsType = {
    id: number,
    title: string,
    isDone: boolean
}
export const Todolist = (props:TodolistPropsType) => {
    return (<div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                <li>
                    <input type="checkbox"/>
                    <span>HTML</span>
                </li>
                <li>
                    <input type="checkbox"/>
                    <span>CSS</span>
                </li>
                <li>
                    <input type="checkbox"/>
                    <span>JS</span>
                </li>
                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </ul>
        </div>)
}