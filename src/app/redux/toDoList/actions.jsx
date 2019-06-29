import types from './types';


export const addTask = (data) => ({
    type: types.ADD_TASK,
    payload: data
})
export const doneTask = (data) => ({
    type: types.DONE_TASK,
    payload: data
})
export const renameValue = (data) => ({
    type: types.RENAME_VALUE,
    payload: data
})
export const addPoint = (data) => ({
    type: types.ADD_POINT,
    payload: data
})
export const donePoint = (data) => ({
    type: types.DONE_POINT,
    payload: data
})
export const renameValuePoint = (data) => ({
    type: types.RENAME_VALUE_POINT,
    payload: data
})
export const createNewTasks = () => ({
    type: types.CREATE_NEW_TASKS,
    payload: null
})



