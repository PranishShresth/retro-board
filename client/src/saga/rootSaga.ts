import { put, takeEvery, call, takeLatest } from "redux-saga/effects";
import { fetchAllBoardsAPI, createBoardAPI } from "../utils/api";
import { Board } from "../interfaces";
import { AxiosResponse } from "axios";
import boardSlice from "../reducers/rootReducer";

// Our worker Saga: will perform the async increment task
function* getBoards() {
  try {
    const result: Promise<AxiosResponse<Board[]>> = yield call(
      fetchAllBoardsAPI
    );
    yield put(boardSlice.actions.fetchBoards(result));
  } catch (err) {
    console.log(err);
  }
}

function* createBoard(
  action: ReturnType<typeof boardSlice.actions.createBoard>
) {
  try {
    const result: Promise<AxiosResponse<Board>> = yield call(
      createBoardAPI,
      action.payload
    );
    yield put(boardSlice.actions.createBoard(result));
  } catch (err) {
    console.log(err);
  }
}
// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
function* watchRootSaga() {
  yield takeLatest("FETCH_BOARDS_REQUESTED", getBoards);
  yield takeLatest("CREATE_BOARD_REQUESTED", createBoard);
}

export default watchRootSaga;
