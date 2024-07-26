import {FilterValueType, TodolistType} from "../App";


export type AddTodolistType = {
    type:"ADD-TODOLIST"
    id: string
    filter: FilterValueType
    title: string
}

export type ChangeTodolistTitleType = {
    type: "CHANGE-TODOLIST-TITLE"
    id: string
    title: string
}

export type ChangeTodolistFilterType = {
    type: "CHANGE-TODOLIST-FILTER"
    id: string
    filter: FilterValueType
}

export type DeleteTodolistType = {
    type: "REMOVE-TODOLIST"
    id: string
}

type ActionsType = AddTodolistType | ChangeTodolistTitleType | DeleteTodolistType | ChangeTodolistFilterType
export const todolistReducer = (state:Array<TodolistType>, action: ActionsType): Array<TodolistType> => {
    switch(action.type){
        case "ADD-TODOLIST": {
            return [
                ...state, {
                    id: action.id,
                    title: action.title,
                    filter: action.filter
                }
            ]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(td => td.id === action.id? {...td, title: action.title} : td)
        }
        case "CHANGE-TODOLIST-FILTER": {
            return state.map(td=> td.id === action.id? {...td, filter: action.filter} : td)
        }
        case "REMOVE-TODOLIST": {
            return state.filter(td => td.id !== action.id)
        }
        default:
            throw new Error("I don't understand your action type")
    }
}

export const deleteTodolistAC = (id: string)=> {
    return {type: "REMOVE-TODOLIST", id: id}
}

export const changeTodolistTitleAC = (id: string, title: string) => {
    return {type: "CHANGE-TODOLIST-TITLE", id, title}
}

export const changeTodolistFilterAC = (id: string, filter: FilterValueType) => {
    return {type: "CHANGE-TODOLIST-FILTER", id, filter}
}

export const addTodolistAC = (id: string, title: string) => {
        return {type: "ADD-TODOLIST", id, title, filter:"all"}
}