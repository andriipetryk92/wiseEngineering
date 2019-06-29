import types from './types';

const initState = {
    lists: [],
    tasks: [],
};

export default function (state = initState, action) {
    switch (action.type) {
        case types.ADD_TASK: {
            return {
                ...state,
                tasks: [
                    ...state.tasks, action.payload
                ]
            }
        }
        case types.DONE_TASK: {
            const tasks = state.tasks.slice();
            if (action.payload !== -1) tasks.splice(action.payload, 1);
            return {
                ...state,
                tasks: [...tasks]
            }
        }
        case types.RENAME_VALUE: {
            const tasks = state.tasks.slice()
            if (action.payload.index !== -1)
                tasks[action.payload.index].valueTask = action.payload.renameValueTask.charAt(0).toUpperCase() + action.payload.renameValueTask.slice(1)
            return {
                ...state,
                tasks: [...tasks]
            }
        }
        case types.ADD_POINT: {
            const tasks = state.tasks.slice();
            tasks[action.payload.indexTask].points.push(action.payload.point)
            return {
                ...state,
                tasks: [...tasks]
            }
        }

        case types.DONE_POINT: {
            const tasks = state.tasks.slice();
            if (action.payload.index !== -1) tasks[action.payload.indexTask].points.splice(action.payload.index, 1);

            return {
                ...state,
                tasks: [...tasks]
            }
        }
        case types.RENAME_VALUE_POINT: {
            const tasks = state.tasks.slice();
            if (action.payload.index !== -1)
                tasks[action.payload.indexTask].points[action.payload.index].value = action.payload.renameValue.charAt(0).toUpperCase() + action.payload.renameValue.slice(1)
            return {
                ...state,
                tasks: [...tasks]
            }
        }
        case types.CREATE_NEW_TASKS: {
            const lists = state.lists.slice();
            let tasks = { tasks: state.tasks.slice() };
            lists.push(tasks);
            tasks = [];
            return {
                ...state,
                lists: [...lists],
                tasks: [...tasks]
            }
        }
        default: return state;
    }
}
