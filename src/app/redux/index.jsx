import { combineReducers } from "redux";

import { reducer as form } from 'redux-form';

import auth from './auth';
import toDoList from './toDoList';

const appReducer = combineReducers({
  auth,
  toDoList,
  form,
});



export default appReducer;
