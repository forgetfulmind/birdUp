import { createStore, applyMiddleware } from "redux";
// import api from '../middleware/api'
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "../../redux/Reducers";

// const initialState= () =>{
//   return {
//     type: SIGN_IN,
//     payload: localStorage.getItem("userId"),
//   };
// }

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    // initialState(),
    composeWithDevTools(applyMiddleware())
  );

  return store;
};

export default configureStore();
