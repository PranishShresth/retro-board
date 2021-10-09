import { put, takeEvery, call } from "redux-saga/effects";
import { fetchAllBoards } from "../utils/api";
import { Board } from "../interfaces";
import { AxiosResponse } from "axios";
import boardSlice from "../reducers/rootReducer";

// ...

// Our worker Saga: will perform the async increment task
function* getBoards() {
  try {
    const result: Promise<AxiosResponse<Board[]>> = yield call(fetchAllBoards);
    yield put(boardSlice.actions.fetchBoards(result));
  } catch (err) {
    yield put({ type: "INCREMENT" });
  }
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchRootSaga() {
  yield takeEvery("FETCH_BOARDS_REQUESTED", getBoards);
}

export default watchRootSaga;
