import { put, call, takeLatest } from "redux-saga/effects";
import { createListAPI } from "../utils/api";
import { List } from "../interfaces";
import { listActions } from "../reducers/listReducer";

function* createList(action: ReturnType<typeof listActions.addList>) {
  try {
    const result: List = yield call(createListAPI, action.payload);
    yield put(listActions.addList(result));
  } catch (err) {
    console.log(err);
  }
}

function* watchListSaga() {
  yield takeLatest("CREATE_LIST_REQUESTED", createList);
}

export default watchListSaga;
