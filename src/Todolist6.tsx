import React from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

type TodolistPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    removeTask: (id: string, todolistId: string)=> void
    changeFilterValue: (filter: FilterValueType, todoLId: string) => void
    addTask: (todolistId: string, title:string) => void
    changeStatus: (id: string, todolistId: string, isDone: boolean) => void
    filter: FilterValueType
    todolistId: string
    deleteTodolist: (todolistId: string) => void
    // addTodolist: (title: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
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
        deleteTodolist,
        changeFilterValue,
        changeTaskTitle,
        changeTodolistTitle,
        addTask,
        changeStatus,
        filter,
        todolistId
    } = props

    const onAllClickHandler = () => changeFilterValue("all", todolistId )
    const onActiveClickHandler = () => changeFilterValue("active", todolistId )
    const onCompletedClickHandler = () => changeFilterValue("completed", todolistId )
    const onClickAddTAskHandler = (title: string) => {
        addTask(todolistId, title)
    }
    const onClickDeleteTaskHandler = (id: string) => {
        removeTask(id, todolistId)
    }
    const onClickDeleteTodolistHandler = () =>{
        deleteTodolist(todolistId)
    }
    const onchangeChangeStatusHandler = (id: string, isDone: boolean) => {
        changeStatus(id, todolistId, isDone)
    }

    const onChangeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId, title)
    }

   return (<div>
            <h3><EditableSpan title={title} onChange={onChangeTodolistTitleHandler}/></h3>
            <button onClick={onClickDeleteTodolistHandler}>Delete Todolist</button>
       <AddItemForm addItem={onClickAddTAskHandler}/>
            <ul>
                {tasks.map((task) => {
                    const onChangeTaskTitleHandler = (taskId:string, title: string) => {
                        changeTaskTitle(todolistId, taskId, title)
                    }
                    return (
                        <li key={task.id}>
                            <input onChange={(e)=>onchangeChangeStatusHandler(task.id, e.currentTarget.checked)} type="checkbox" checked={task.isDone}/>
                            {/*<span>{task.title}</span>*/}
                            <EditableSpan title={task.title} onChange={(e)=>onChangeTaskTitleHandler(task.id, e)}/>
                            <button onClick={()=>onClickDeleteTaskHandler(task.id)}>Delete</button>
                        </li>
                    )
                })}
            </ul>
                <div>
                    <button className={filter==="all"? "active-filter" :""} onClick={onAllClickHandler}>All</button>
                    <button className={filter==="active"? "active-filter" :""} onClick={onActiveClickHandler}>Active</button>
                    <button className={filter==="completed"? "active-filter" :""} onClick={onCompletedClickHandler}>Completed</button>
                </div>
        </div>)
}





