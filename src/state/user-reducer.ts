export type UserType = {
    name: string
    age: number,
    childrenCount: number
}

type ActionType = {
    type: string
    [key: string]: any
}

export const userReducer = (state: UserType, action: ActionType) => {
    switch(action.type){
        case "INCREMENT-AGE" :
            state.age = state.age + 1
            return state
        case "INCREMENT-CHILDRENCOUNT":
            state.childrenCount = state.childrenCount + 1
            return state
        default:
            throw new Error("I don't understand your action")
    }



}
