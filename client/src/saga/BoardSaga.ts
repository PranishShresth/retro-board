import { put, call, takeLatest, all } from "redux-saga/effects";
import {
  fetchAllBoardsAPI,
  createBoardAPI,
  fetchActiveBoardAPI,
  deleteBoardAPI,
} from "../utils/api";
import { Board, Item, List } from "../interfaces";
import { AxiosResponse } from "axios";
import { boardActions } from "../reducers/boardReducer";
import { itemActions } from "../reducers/itemReducer";
import { listActions } from "../reducers/listReducer";

function* getBoards() {
  try {
    yield put(boardActions.setLoading(true));

    const result: Board[] = yield call(fetchAllBoardsAPI);
    yield put(boardActions.fetchBoards(result));
    yield put(boardActions.setLoading(false));
  } catch (err) {
    console.log(err);
  }
}

function* createBoard(action: ReturnType<typeof boardActions.createBoard>) {
  try {
    yield put(boardActions.setLoading(true));
    const result: Board = yield call(createBoardAPI, action.payload);
    yield put(boardActions.createBoard(result));
    yield put(boardActions.setLoading(false));
  } catch (err) {
    console.log(err);
  }
}

type Resp = {
  board: Board;
  list: List[];
  items: Item[];
};
function* fetchActiveBoard(
  action: ReturnType<typeof boardActions.fetchActiveBoard>
) {
  try {
    yield put(boardActions.setLoading(true));
    const result: Resp = yield call(fetchActiveBoardAPI, action.payload);

    yield all([
      put(boardActions.fetchActiveBoard(result.board)),
      put(listActions.loadAllLists(result.list)),
      put(itemActions.loadAllItems(result.items)),
    ]);

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
