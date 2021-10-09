import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/boardReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/RootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: boardReducer.reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
