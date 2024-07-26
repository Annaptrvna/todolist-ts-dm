import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";


import Box from "@mui/material/Box";
import {AddBox} from "@mui/icons-material";
import {filterButtonContaineSx} from "./Todolist.styles";
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
            if(taskTitle === "") {
                setError("Task should not be empty")
            }
            else(addItem(taskTitle.trim())
            )
            setTaskTitle("")
        }
    }
    const onClickAddItemHandler = () =>{
        if(taskTitle === "") {
            setError("Task should not be empty")
        }
        else {addItem(taskTitle.trim())
            setTaskTitle("")}
    }

    const ButtonType = {
        maxWidth: "39px",
        maxHeight: "39px",
        minWidth: "39px",
        minHeight: "39px"
    }


    return (
        // <div>
        <Box sx={filterButtonContaineSx}>
            <TextField
                size={"small"}
                className={error? "error" : ""}
                onChange={(e) => onChangeInputHandler(e.currentTarget.value)}
                onKeyDown={(e) => onKeyDownHandler(e.code)}
                value={taskTitle}
                error={!!error}
                label={"Enter title"}
                helperText={error}
            />
        {/*<input*/}
        {/*    type="text"*/}
        {/*    value={taskTitle}*/}
        {/*    className={error? "error" : ""}*/}
        {/*    onChange={(e) => onChangeInputHandler(e.currentTarget.value)}*/}
        {/*    onKeyDown={(e) => onKeyDownHandler(e.code)}*/}
        {/*/>*/}
            <IconButton color={"primary"} onClick={onClickAddItemHandler}><AddBox/></IconButton>
            {/*{error && <div className={"error-message"}>{error}</div>}*/}
        {/*// </div>*/}
</Box>

)
}