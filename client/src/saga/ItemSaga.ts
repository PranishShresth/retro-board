import { put, takeEvery, call, takeLatest } from "redux-saga/effects";
import { createItemAPI } from "../utils/api";
import { List } from "../interfaces";
import { AxiosResponse } from "axios";
import boardSlice from "../reducers/boardReducer";

function* createItem(
  action: ReturnType<typeof boardSlice.actions.updateBoard>
) {
  try {
    const result: Promise<AxiosResponse<List>> = yield call(
      createItemAPI,
      action.payload
    );
    yield put(boardSlice.actions.updateBoard(result));
  } catch (err) {
    console.log(err);
  }
}

function* watchItemSaga() {
  yield takeLatest("CREATE_LIST_REQUESTED", createList);
}

export default watchItemSaga;
