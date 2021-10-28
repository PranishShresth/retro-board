import { put, call, takeLatest } from "redux-saga/effects";
import { createListAPI, updateListAPI } from "../utils/api";
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

function* updateList(action: ReturnType<typeof listActions.updateList>) {
  try {
    const result: List = yield call(updateListAPI, action.payload);
    yield put(listActions.updateList(result));
  } catch (err) {
    console.log(err);
  }
}

function* watchListSaga() {
  yield takeLatest("CREATE_LIST_REQUESTED", createList);
  yield takeLatest("UPDATE_LIST_REQUESTED", updateList);
}

export default watchListSaga;
