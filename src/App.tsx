import React, {useState} from 'react';
import './App.css';
import {TaskPropsType} from "./Todolist5";
import {v1, v4} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {Todolist} from "./Todolist";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import {MenuButton} from "./MenuButton";
import {createTheme, CssBaseline, Switch, ThemeProvider} from "@mui/material";
import { lime, purple } from '@mui/material/colors';



export type FilterValueType = "all" | "completed" | "active"
export type TodolistType = {
    id: string
    title: string
    filter: FilterValueType
}

type TasksListType = {
    [id: string]: TaskPropsType[]
}

type ThemeMode = "light" | "dark"

function App() {
    const addTodolist = ( title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title: title, filter: "all" }
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [todolistId]: []})
    }
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(td => td.id!== todolistId))
        const {[todolistId]: tasksToRemove, ...otherTasks} = tasks
        setTasks(otherTasks)
    }
    const removeTask = (id: string, todolistId: string) => {
        let filteredTasks = tasks[todolistId].filter((task) => task.id !== id)
        setTasks({...tasks, [todolistId]: filteredTasks})
    }
    const addTask = (todolistId: string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false}
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

    const changeTaskTitle = (todolistId: string, taskId: string, title: string)=>{
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=> t.id===taskId? {...t, title: title}:t)})
    }
    const changeTodolistTitle = (todolistId: string, title: string) => {
        setTodolists(todolists.map(td => td.id === todolistId ? {...td, title: title} : td))
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


    const [themeMode, setThemeMode] = useState<ThemeMode>("light")
    const theme = createTheme({
                                  palette: {
                                      mode: themeMode,
                                      primary: {
                                          main: "#3EC05CFF"
                                      }
                                  }
                              })
    const onChangeThemeMode = () => {
        setThemeMode(themeMode==="light" ? "dark" : "light")
    }
  return (
    <div className="App">
        <ThemeProvider theme={theme}>
            <CssBaseline/>
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Switch onChange={onChangeThemeMode}/>
                    <MenuButton color="inherit">Login</MenuButton>
                    <MenuButton color="inherit">Logout</MenuButton>
                    <MenuButton color="inherit">FAQ</MenuButton>
                </Toolbar>
            </AppBar>
        </Box>
        <Container fixed sx={{ mt:"20px"}}>
            <Grid container >
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container  >
        {todolists.map((tl)=> {
            let tasksForTodolist = tasks[tl.id];
            if(tl.filter === "completed") {
                tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
            }
            if(tl.filter === "active") {
                tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
            }

            return(
                <Grid item sx={{ mt:"20px", mr:"20px"}}>
                 <Paper elevation={3} sx={{p: "20px"}} >
                    <Todolist
                        deleteTodolist={deleteTodolist}
                        todolistId={tl.id}
                        title={tl.title}
                        changeFilterValue = {changeFilter}
                        tasks={tasksForTodolist}
                        removeTask={removeTask}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        changeTaskTitle={changeTaskTitle}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                </Paper>
                    </Grid>

            )
        }
        )}
            </Grid>
        </Container>
        </ThemeProvider>
    </div>
  );
}

export default App;
//-----------------------------
// Todolist6
//
// export type FilterValueType = "all" | "completed" | "active"
// type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValueType
// }
//
// type TasksListType = {
//     [id: string]: TaskPropsType[]
// }
//
// function App() {
//     const addTodolist = ( title: string) => {
//         const todolistId = v1()
//         const newTodolist: TodolistType = {id: todolistId, title: title, filter: "all" }
//         setTodolists([...todolists, newTodolist])
//         setTasks({...tasks, [todolistId]: []})
//     }
//     const deleteTodolist = (todolistId: string) => {
//         setTodolists(todolists.filter(td => td.id!== todolistId))
//         const {[todolistId]: tasksToRemove, ...otherTasks} = tasks
//         setTasks(otherTasks)
//     }
//     const removeTask = (id: string, todolistId: string) => {
//         let filteredTasks = tasks[todolistId].filter((task) => task.id !== id)
//         setTasks({...tasks, [todolistId]: filteredTasks})
//     }
//     const addTask = (todolistId: string, title: string) => {
//         const newTask = {id: v1(), title: title, isDone: false}
//         title ? setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
//             : alert("Title should not be empty!")
//     }
//     const changeStatus = (id: string, todolistId: string, isDone: boolean) => {
//         // const task = tasks[todolistId].find(t=> t.id === id)
//         // if(task){task.isDone = isDone};
//         // setTasks([...tasks])
//         const changedTasks = tasks[todolistId].map(t=>t.id===id ? {...t, isDone: isDone} : t)
//         setTasks({...tasks, [todolistId]: changedTasks})
//     }
//     const changeFilter = (filter: FilterValueType, todoListId: string) => {
//         const filteredTodolists: TodolistType[] = todolists.map(tl =>tl.id === todoListId ? {...tl, filter:filter} : tl)
//         setTodolists(filteredTodolists)
//     }
//
//     const changeTaskTitle = (todolistId: string, taskId: string, title: string)=>{
//         setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=> t.id===taskId? {...t, title: title}:t)})
//     }
//     const changeTodolistTitle = (todolistId: string, title: string) => {
//         setTodolists(todolists.map(td => td.id === todolistId ? {...td, title: title} : td))
//     }
//
//     const TodolistId1 = v1()
//     const TodolistId2 = v1()
//
//     const [todolists, setTodolists] = useState<TodolistType[]>([
//                                                                    {id: TodolistId1, title: "What to learn", filter: "all"},
//                                                                    {id: TodolistId2, title: "What to buy", filter: "all"}
//                                                                ])
//
//     const [tasks, setTasks] = useState<TasksListType>(
//         {
//             [TodolistId1]:[
//                 {id: v4(), title: "CSS", isDone: true},
//                 {id: v4(), title: "JS", isDone: false},
//                 {id: v4(), title: "HTML", isDone: true},
//                 {id: v4(), title: "React", isDone: false}
//             ],
//             [TodolistId2]: [
//                 {id: v4(), title: "CSS", isDone: true},
//                 {id: v4(), title: "JS", isDone: false},
//                 {id: v4(), title: "HTML", isDone: true},
//                 {id: v4(), title: "React", isDone: false}
//             ]
//         }
//     )
//
//     return (
//         <div className="App">
//             <AddItemForm addItem={addTodolist}/>
//             {todolists.map((tl)=> {
//
//                 let tasksForTodolist = tasks[tl.id];
//                 if(tl.filter === "completed") {
//                     tasksForTodolist = tasksForTodolist.filter(task => task.isDone)
//                 }
//                 if(tl.filter === "active") {
//                     tasksForTodolist = tasksForTodolist.filter(task => !task.isDone)
//                 }
//
//                 return(
//                     <Todolist
//                         deleteTodolist={deleteTodolist}
//                         todolistId={tl.id}
//                         title={tl.title}
//                         changeFilterValue = {changeFilter}
//                         tasks={tasksForTodolist}
//                         removeTask={removeTask}
//                         addTask={addTask}
//                         changeStatus={changeStatus}
//                         filter={tl.filter}
//                         changeTaskTitle={changeTaskTitle}
//                         changeTodolistTitle={changeTodolistTitle}
//                     />
//                 )
//             })}
//
//         </div>
//     );
// }
//
// export default App;