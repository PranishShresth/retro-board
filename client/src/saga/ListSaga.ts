import { put, takeEvery, call, takeLatest } from "redux-saga/effects";
import { createListAPI } from "../utils/api";
import { List } from "../interfaces";
import { AxiosResponse } from "axios";
import boardSlice from "../reducers/boardReducer";

function* createList(
  action: ReturnType<typeof boardSlice.actions.updateBoard>
) {
  try {
    const result: Promise<AxiosResponse<List>> = yield call(
      createListAPI,
      action.payload
    );
    yield put(boardSlice.actions.updateBoard(result));
  } catch (err) {
    console.log(err);
  }
}

function* watchListSaga() {
  yield takeLatest("CREATE_LIST_REQUESTED", createList);
}

export default watchListSaga;
