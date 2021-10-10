import { put, call, takeLatest } from "redux-saga/effects";
import { createItemAPI, reorderItemAPI } from "../utils/api";
import { List } from "../interfaces";
import { AxiosResponse } from "axios";
import boardSlice from "../reducers/boardReducer";

function* createItem(action: ReturnType<typeof boardSlice.actions.updateList>) {
  try {
    const result: Promise<AxiosResponse<List>> = yield call(
      createItemAPI,
      action.payload
    );

    yield put(boardSlice.actions.updateList(result));
  } catch (err) {
    console.log(err);
  }
}

function* reorderItem(
  action: ReturnType<typeof boardSlice.actions.updateList>
) {
  try {
    const result: Promise<AxiosResponse<List>> = yield call(
      reorderItemAPI,
      action.payload
    );

    yield put(boardSlice.actions.updateList(result));
  } catch (err) {
    console.log(err);
  }
}
function* watchItemSaga() {
  yield takeLatest("CREATE_ITEM_REQUESTED", createItem);
  yield takeLatest("REORDER_ITEM_REQUESTED", reorderItem);
}

export default watchItemSaga;
