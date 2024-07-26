import React, {ChangeEvent} from "react";
import {FilterValueType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from "@mui/material/Box";
import {filterButtonContaineSx, getListItemSx} from "./Todolist.styles";

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
    const onClickDeleteTodolistHandler = () => {
        deleteTodolist(todolistId)
    }

    const onChangeTodolistTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId, title)
    }

    return (<div>
        <div style={{display: "flex"}}>
            <h3><EditableSpan title={title} onChange={onChangeTodolistTitleHandler}/></h3>
            <IconButton aria-label="delete" onClick={onClickDeleteTodolistHandler}>
                <DeleteIcon/>
            </IconButton>
            {/*<button onClick={onClickDeleteTodolistHandler}>Delete Todolist</button>*/}
        </div>
        <AddItemForm addItem={onClickAddTAskHandler}/>
        <List>
            {/*<ul>*/}
            {tasks.map((task) => {
                const onChangeTaskTitleHandler = (taskId:string, title: string) => {
                    changeTaskTitle(todolistId, taskId, title)
                }
                const onchangeChangeStatusHandler = (id: string, isDone: boolean) => {
                    changeStatus(id, todolistId, isDone)
                }
                return (
                    <ListItem
                    sx={getListItemSx(task.isDone)}
                    >
                    {/* <li key={task.id}>*/}
                        <div>
                            <Checkbox
                                onChange={(e)=>onchangeChangeStatusHandler(task.id,e.currentTarget.checked)}
                                checked={task.isDone}
                            />
                            {/*<input onChange={(e)=>onchangeChangeStatusHandler(task.id, e.currentTarget.checked)} type="checkbox" checked={task.isDone}/>*/}
                            {/*<span>{task.title}</span>*/}
                            <EditableSpan title={task.title} onChange={(e)=>onChangeTaskTitleHandler(task.id, e)}/>
                            {/*<button onClick={()=>onClickDeleteTaskHandler(task.id)}>Delete</button>*/}
                        </div>
                        <IconButton aria-label="delete" onClick={()=>onClickDeleteTaskHandler(task.id)}>
                            <DeleteIcon/>
                        </IconButton>
                    {/* </li>*/}
                    </ListItem>
                )
            })}
        {/*</ul>*/}
        </List>
        {/*<div>*/}
        <Box sx={filterButtonContaineSx}>
            <Button variant={filter==="all"? "contained" :"outlined"} onClick={onAllClickHandler}>All</Button>
            <Button variant={filter==="active"? "contained" :"outlined"} onClick={onActiveClickHandler}>Active</Button>
            <Button variant={filter==="completed"? "contained" :"outlined"} onClick={onCompletedClickHandler}>Completed</Button>
        </Box>
            {/*<button className={filter==="all"? "active-filter" :""} onClick={onAllClickHandler}>All</button>*/}
            {/*<button className={filter==="active"? "active-filter" :""} onClick={onActiveClickHandler}>Active</button>*/}
            {/*<button className={filter==="completed"? "active-filter" :""} onClick={onCompletedClickHandler}>Completed</button>*/}
        {/*</div>*/}
    </div>)
}





