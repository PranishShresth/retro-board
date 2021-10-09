import { put, takeEvery, call, takeLatest } from "redux-saga/effects";
import {
  fetchAllBoardsAPI,
  createBoardAPI,
  fetchActiveBoardAPI,
} from "../utils/api";
import { Board } from "../interfaces";
import { AxiosResponse } from "axios";
import boardSlice from "../reducers/rootReducer";

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

function* fetchActiveBoard(
  action: ReturnType<typeof boardSlice.actions.fetchActiveBoard>
) {
  try {
    const result: Promise<AxiosResponse<Board>> = yield call(
      fetchActiveBoardAPI,
      action.payload
    );
    yield put(boardSlice.actions.fetchActiveBoard(result));
  } catch (err) {
    console.log(err);
  }
}
function* watchRootSaga() {
  yield takeLatest("FETCH_BOARDS_REQUESTED", getBoards);
  yield takeLatest("CREATE_BOARD_REQUESTED", createBoard);
  yield takeLatest("FETCH_BOARD_REQUESTED", fetchActiveBoard);
}

export default watchRootSaga;
