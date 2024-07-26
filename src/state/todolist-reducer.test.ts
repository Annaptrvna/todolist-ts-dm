import {v1} from "uuid";
import {
    addTodolistAC,
    AddTodolistType, changeTodolistFilterAC,
    ChangeTodolistFilterType,
    changeTodolistTitleAC,
    ChangeTodolistTitleType,
    deleteTodolistAC,
    DeleteTodolistType,
    todolistReducer
} from "./todolist-reducer";
import {TodolistType} from "../App";

let todolistState: Array<TodolistType>
let todolistId1: string;
let todolistId2: string;

beforeAll(()=>{
    todolistId1 = v1()
    todolistId2 = v1()
    todolistState = [
        {id: todolistId1, title: "todolist1", filter: "all"},
        {id: todolistId2, title: "todolist2", filter: "all"}
    ]
})
test("reducer should add new todolist", ()=> {
    const todolistId3 = v1()
    const action = addTodolistAC(todolistId3, "todolist3") as AddTodolistType
    const newState: Array<TodolistType> = todolistReducer(todolistState, action)
    expect(newState.length).toBe(3)
    expect(todolistState.length).toBe(2)
    expect(newState[2].title).toBe("todolist3")
    expect(newState[2].filter).toBe("all")
    expect(newState[2].id).toBe(todolistId3)
})

test("reducer should update todolist title", ()=> {
    const action = changeTodolistTitleAC(todolistId1, "New Title") as ChangeTodolistTitleType
    const newState: Array<TodolistType> = todolistReducer(todolistState, action)
    expect(newState[0].title).toBe("New title")
    expect(newState[1].title).toBe("todolist2")
})

test("reducer should change todolist filter", ()=>{
    const action = changeTodolistFilterAC(todolistId1, "completed") as ChangeTodolistFilterType
    const newState: Array<TodolistType> = todolistReducer(todolistState, action)
    expect(newState[0].filter).toBe("completed")
    expect(newState[1].filter).toBe("all")
})

test("reducer should remove todolist", ()=>{
    const action = deleteTodolistAC(todolistId1) as DeleteTodolistType
    const newState: Array<TodolistType> = todolistReducer(todolistState, action)
    expect(newState.length).toBe(1)
    expect(newState[0].id).toBe(todolistId2)
})