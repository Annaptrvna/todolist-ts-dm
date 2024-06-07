import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v4} from "uuid";


export type filterValue = "all" | "completed" | "active"


function App() {
    let initTasks: Array<TaskPropsType> = [
        {id: v4(), title: "CSS", isDone: true},
        {id: v4(), title: "JS", isDone: false},
        {id: v4(), title: "HTML", isDone: true},
        {id: v4(), title: "React", isDone: false}
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
    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter((task) => task.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title: string) => {
        const newTask = {id: v4(), title: title, isDone: false}
        title ? setTasks([...tasks, newTask])
            : alert("Title should not be empty!")
    }


  return (
    <div className="App">
      <Todolist
          title={"What to learn"}
          changeFilterValue = {changeFilterValue}
          tasks={tasksForTodolist}
          removeTask={removeTask}
          addTask={addTask}
      />
    </div>
  );
}

export default App;
