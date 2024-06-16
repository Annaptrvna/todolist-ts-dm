import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1, v4} from "uuid";


export type FilterValueType = "all" | "completed" | "active"
type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksListType = {
    [id: string]: TaskPropsType[]
}

function App() {
    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(td => td.id!== todolistId))
        const {[todolistId]: tasksToRemove, ...otherTasks} = tasks
        setTasks(otherTasks)

    }
    const removeTask = (id: string, todolistId: string) => {
        let filteredTasks = tasks[todolistId].filter((task) => task.id !== id)
        setTasks({...tasks, [todolistId]: filteredTasks})
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {id: v4(), title: title, isDone: false}
        title ? setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
            : alert("Title should not be empty!")
    }

    const changeStatus = (id: string, todolistId: string, isDone: boolean) => {
        // const task = tasks[todolistId].find(t=> t.id === id)
        // if(task){task.isDone = isDone};
        // setTasks([...tasks])
        const changedTasks = tasks[todolistId].map(t=>t.id===id ? {...t, isDone: isDone} : t)
        setTasks({...tasks, [todolistId]: changedTasks})

    }

    const changeFilter = (filter: FilterValueType, todoListId: string) => {
        const filteredTodolists: TodolistType[] = todolists.map(tl =>tl.id === todoListId ? {...tl, filter:filter} : tl)
        setTodolists(filteredTodolists)
    }

    const TodolistId1 = v1()
    const TodolistId2 = v1()


    const [todolists, setTodolists] = useState<TodolistType[]>([
                                                   {id: TodolistId1, title: "What to learn", filter: "all"},
                                                   {id: TodolistId2, title: "What to buy", filter: "all"}
                                               ])

    const [tasks, setTasks] = useState<TasksListType>(
        {
            [TodolistId1]:[
        {id: v4(), title: "CSS", isDone: true},
        {id: v4(), title: "JS", isDone: false},
        {id: v4(), title: "HTML", isDone: true},
        {id: v4(), title: "React", isDone: false}
    ],
        [TodolistId2]: [
        {id: v4(), title: "CSS", isDone: true},
        {id: v4(), title: "JS", isDone: false},
        {id: v4(), title: "HTML", isDone: true},
        {id: v4(), title: "React", isDone: false}
    ]
        }
    )

  return (
    <div className="App">
        {todolists.map((tl)=> {

            let tasksForTodolist = tasks[tl.id];
            if(tl.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
            }
            if(tl.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
            }

            return(
                <Todolist
                    removeTodolist={removeTodolist}
                    todolistId={tl.id}
                    title={tl.title}
                    changeFilterValue = {changeFilter}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                />
            )
        })}

    </div>
  );
}

export default App;
