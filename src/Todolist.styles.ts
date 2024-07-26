import {SxProps} from "@mui/material";

export const filterButtonContaineSx: SxProps = {
    display: "flex",
    justifyContent: "space-between"
}

export const getListItemSx = (isDone: boolean): SxProps => ({
    opacity: isDone? 0.5: 1,
    dipslay: "flex",
    p: "0"
})