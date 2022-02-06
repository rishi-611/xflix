import { createStore, applyMiddleware} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import rootReducer from "./reducers/rootReducer"
// import thunk from "redux-thunk";

// if there are more than one middlewares, add them in this array
const middleware = [];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
