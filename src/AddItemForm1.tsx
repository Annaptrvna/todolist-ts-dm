import React, {useState} from "react";

type AddItemFormPropsType = {
    addItem: ( title: string) => void

}
export const AddItemForm = ({
                                addItem
                            }: AddItemFormPropsType) => {
    const [taskTitle, setTaskTitle] = useState("")
    const [error, setError] = useState<string | null >(null)
    const onChangeInputHandler = (title: string) => {error && setError(null)
    setTaskTitle(title)}
    const onKeyDownHandler = (key: string) => {
        setError(null)
        if(key==="Enter"){
            addItem(taskTitle.trim())
        }
    }
    const onClickAddItemHandler = () =>{
        if(taskTitle === "") {
            setError("Task should not be empty")
        }
        else {addItem(taskTitle.trim())
            setTaskTitle("")}
    }


    return (<div>
            <input
                className={error? "error" : ""}
                onChange={(e) => onChangeInputHandler(e.currentTarget.value)}
                onKeyDown={(e) => onKeyDownHandler(e.code)}
                value={taskTitle}
            />
            <button onClick={onClickAddItemHandler}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>)
}