import React from 'react';
import './App.css';

function App() {

  return (
    <div className="App">
      <Todolist/>
      <Todolist/>
      <Todolist/>
    </div>
  );
}

const Todolist = () =>{

    return (
        <div>
            <h3>What to learn</h3>
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
        </div>
    )
}
export default App;
