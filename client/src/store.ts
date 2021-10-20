import { configureStore } from "@reduxjs/toolkit";
import boardReducer from "./reducers/boardReducer";
import listReducer from "./reducers/listReducer";
import itemReducer from "./reducers/itemReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./saga/RootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    board: boardReducer.reducer,
    list: listReducer.reducer,
    item: itemReducer.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;

export default store;
