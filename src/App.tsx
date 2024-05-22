import React from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";

function App() {
    let tasks1: Array<TaskPropsType> = [
        {id: 1, title: "CSS", isDone: true},
        {id: 2, title: "JS", isDone: false},
        {id: 3, title: "HTML", isDone: true},
        {id: 4, title: "React", isDone: false}
    ]

    let tasks2: Array<TaskPropsType> = [
        {id: 5, title: "Bread", isDone: true},
        {id: 6, title: "Butter", isDone: false},
        {id: 7, title: "Meat", isDone: true},
        {id: 8, title: "Milk", isDone: false}
    ]
  return (
    <div className="App">
      <Todolist title={"What to learn"} tasks={tasks1}/>
      <Todolist title={"What to buy"} tasks={tasks2}/>
    </div>
  );
}

export default App;
