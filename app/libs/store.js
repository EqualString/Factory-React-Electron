//http://redux.js.org/
//https://www.npmjs.com/package/redux

import { createStore } from 'redux';

//REDUX store 
function appReducer (state = {}, action){
  switch(action.type){
    case "SET_USER_INFO":{
      state.info = action.payload;      
      return state;
    }
    case "SET_USER_MESSAGES":{
      state.messages = action.payload;
      return state;
    }
    case "SET_USER_PROFILE_IMAGE":{
      state.profileImage = action.payload;
      return state;
    }
    case "SET_USER_COVER_IMAGE":{
      state.coverImage = action.payload;
      return state;
    }
    default: 
      return state;
  }
}

let store = createStore(appReducer);

/*
//Local storage & Redux 
const persistedState = localStorage.getItem('FactoryPersistedReduxStates') ? JSON.parse(localStorage.getItem('FactoryPersistedReduxStates')) : {};
let store = createStore(appReducer, persistedState);

//localStorage.removeItem("FactoryPersistedReduxStates");

store.subscribe( function(){
  //console.log("store changed", store.getState());
  localStorage.setItem('FactoryPersistedReduxStates', JSON.stringify(store.getState()));
});
*/

export default store;