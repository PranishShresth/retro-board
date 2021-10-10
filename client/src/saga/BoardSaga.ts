import { put, takeEvery, call, takeLatest } from "redux-saga/effects";
import {
  fetchAllBoardsAPI,
  createBoardAPI,
  fetchActiveBoardAPI,
} from "../utils/api";
import { Board } from "../interfaces";
import { AxiosResponse } from "axios";
import { boardActions } from "../reducers/boardReducer";

function* getBoards() {
  try {
    yield put(boardActions.setLoading(true));

    const result: Promise<AxiosResponse<Board[]>> = yield call(
      fetchAllBoardsAPI
    );
    yield put(boardActions.fetchBoards(result));
    yield put(boardActions.setLoading(true));
  } catch (err) {
    console.log(err);
  }
}

function* createBoard(action: ReturnType<typeof boardActions.createBoard>) {
  try {
    yield put(boardActions.setLoading(true));
    const result: Promise<AxiosResponse<Board>> = yield call(
      createBoardAPI,
      action.payload
    );
    yield put(boardActions.createBoard(result));
    yield put(boardActions.setLoading(false));
  } catch (err) {
    console.log(err);
  }
}

function* fetchActiveBoard(
  action: ReturnType<typeof boardActions.fetchActiveBoard>
) {
  try {
    const result: Promise<AxiosResponse<Board>> = yield call(
      fetchActiveBoardAPI,
      action.payload
    );
    yield put(boardActions.fetchActiveBoard(result));
  } catch (err) {
    console.log(err);
  }
}

function* watchBoardSaga() {
  yield takeLatest("FETCH_BOARDS_REQUESTED", getBoards);
  yield takeLatest("CREATE_BOARD_REQUESTED", createBoard);
  yield takeLatest("FETCH_BOARD_REQUESTED", fetchActiveBoard);
}

export default watchBoardSaga;
