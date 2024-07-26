import React from "react";
import {userReducer, UserType} from "./user-reducer";

let initState: UserType;

beforeEach(()=>{
    initState = {
        name: "Anna",
        age: 26,
        childrenCount: 3
    }


})

test("Reducer should increment user age", ()=> {
    const newState = userReducer(initState, {type: "INCREMENT-AGE"})
    expect(newState.age).toBe(27)
})

test("Reducer should increment user children count", ()=> {
    const newState = userReducer(initState, {type: "INCREMENT-CHILDRENCOUNT"})
    expect(newState.childrenCount).toBe(4)
})