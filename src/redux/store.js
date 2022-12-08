import thunk from "redux-thunk";
import { applyMiddleware, compose, createStore } from "redux";
import rootReducer from "./reducers";

export default function configureStore() {
  const middleware = [];
  const enhancers = [];

  // Connect the thunk to the redux store
  middleware.push(thunk);

  enhancers.push(applyMiddleware(...middleware));
  const store = createStore(rootReducer, compose(...enhancers));

  // const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}