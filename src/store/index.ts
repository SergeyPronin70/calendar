import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { authReducer } from "./reducers/auth";
import { EventReducer } from "./reducers/event";

const rootReducer = combineReducers({
    auth: authReducer,
    events: EventReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;