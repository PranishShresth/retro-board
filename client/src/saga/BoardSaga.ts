import { put, call, takeLatest } from "redux-saga/effects";
import {
  fetchAllBoardsAPI,
  createBoardAPI,
  fetchActiveBoardAPI,
  deleteBoardAPI,
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
    yield put(boardActions.setLoading(false));
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
    yield put(boardActions.setLoading(true));
    const result: Promise<AxiosResponse<Board>> = yield call(
      fetchActiveBoardAPI,
      action.payload
    );
    yield put(boardActions.fetchActiveBoard(result));
    yield put(boardActions.setLoading(false));
  } catch (err) {
    console.log(err);
  }
}

function* deleteBoard(
  action: ReturnType<typeof boardActions.fetchActiveBoard>
) {
  try {
    yield put(boardActions.setLoading(true));
    yield call(deleteBoardAPI, action.payload);
    yield put(boardActions.deleteBoard({ _id: action.payload }));
    yield put(boardActions.setLoading(false));
  } catch (err) {
    console.log(err);
  }
}

function* watchBoardSaga() {
  yield takeLatest("FETCH_BOARDS_REQUESTED", getBoards);
  yield takeLatest("CREATE_BOARD_REQUESTED", createBoard);
  yield takeLatest("FETCH_BOARD_REQUESTED", fetchActiveBoard);
  yield takeLatest("DELETE_BOARD_REQUESTED", deleteBoard);
}

export default watchBoardSaga;
