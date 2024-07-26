import React, {useState} from "react";
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
    title: string
    onChange: (title: string) => void
}
export const EditableSpan = (props: EditableSpanPropsType) => {
    const [ editMode, setEditMode ] = useState(false)
    const [ title, setTitle ] = useState("")

    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    const activeViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }
    return (editMode ?
        <TextField
            size={"small"}
            onChange={(e) => setTitle(e.currentTarget.value)}
            value={title}
            label={"Enter title"}
            onBlur={activeViewMode}
            autoFocus
        />
            // <input type="text" value={title} onBlur={activeViewMode} onChange={(e) => setTitle(e.currentTarget.value)}
            //        autoFocus/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>)
}