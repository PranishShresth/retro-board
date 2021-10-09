import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/rootSaga";

const sagaMiddleware = createSagaMiddleware();
sagaMiddleware.run(rootSaga);

const store = configureStore({
  reducer: boardReducer.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
