import React from "react";

type AddItemFormPropsType = {
    className: string
    onChange: (inputValue:string) => void
    onKeyDown: (key: string) => void
    onClick: () => void
    errorMessage: string | null
    classErrorMessage: string
    curInputValue: string

}
export const AddItemForm = ({
                                className,
                                onChange,
                                onKeyDown,
                                onClick,
                                errorMessage,
                                curInputValue
                            }: AddItemFormPropsType) => {
    const onChangeInputHandler = (inputValue: string) => onChange(inputValue)
    const onKeyDownHandler = (key: string) => onKeyDown(key)

    const onClickAddItemHandler = () => onClick()

    return (<div>
            <input
                className={className}
                onChange={(e) => onChangeInputHandler(e.currentTarget.value)}
                onKeyDown={(e) => onKeyDownHandler(e.code)}
                value={curInputValue}
            />
            <button onClick={onClickAddItemHandler}>+</button>
            {errorMessage && <div className={className}>{errorMessage}</div>}
        </div>)
}