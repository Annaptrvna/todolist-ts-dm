import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";

export type filterValue = "all" | "completed" | "active"


function App() {
    let initTasks: Array<TaskPropsType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "HTML", isDone: true},
        {id: 4, title: "React", isDone: false}
    ]
    let [tasks, setTasks] = useState(initTasks)
    let [filter, setFilter] = useState<filterValue>('all')

    let tasksForTodolist = tasks;
    if(filter === "completed") {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }
    if(filter === "active") {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }

    const changeFilterValue = (value: filterValue) => {
        setFilter(value)
    }
    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter((task) => task.id !== id)
        setTasks(filteredTasks)
    }
  return (
    <div className="App">
      <Todolist title={"What to learn"} changeFilterValue = {changeFilterValue} tasks={tasksForTodolist} removeTask={removeTask}/>
    </div>
  );
}

export default App;
