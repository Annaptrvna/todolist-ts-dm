import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";

function App() {

    let tasks: Array<TaskPropsType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "HTML", isDone: true},
        {id: 4, title: "React", isDone: false}
    ]
    const [currentTasks, setTasks] = useState(tasks)


    const removeTask = (id: number) => {
        let newTasks = tasks.filter((task) => task.id !== id)
        setTasks(newTasks)
    }
  return (
    <div className="App">
      <Todolist title={"What to learn"} tasks={currentTasks} removeTask={removeTask}/>
    </div>
  );
}

export default App;
