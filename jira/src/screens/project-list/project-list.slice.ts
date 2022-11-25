import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";


interface State{
    projectModalOpen: boolean;
}
const initialState: State = {
    projectModalOpen:false
}
export const projectListSlice = createSlice({
    name: 'preojectListSlice',
    initialState,
    reducers: {
        openProjectModal(state, action) {
            state.projectModalOpen=true
        },
        closeProjectModal(state, action) {
              state.projectModalOpen=false
        }
    }
})


export const projectActions = projectListSlice.actions
export const selectProjectModalOpen=(state:RootState)=>state.projectList.projectModalOpen