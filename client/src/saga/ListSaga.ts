import { put, call, takeLatest, takeEvery } from "redux-saga/effects";
import { createListAPI, deleteListAPI, updateListAPI } from "../utils/api";
import { List } from "../interfaces";
import { listActions } from "../reducers/listReducer";
import {
  CREATE_LIST_REQUESTED,
  DELETE_LIST_REQUESTED,
  UPDATE_LIST_REQUESTED,
} from "../utils/types";

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

function* deleteList(action: any) {
  try {
    const result: { success: boolean } = yield call(
      deleteListAPI,
      action.payload
    );
    if (result.success) {
      console.log("deleted");
    }
  } catch (err) {
    console.log(err);
  }
}

function* watchListSaga() {
  yield takeLatest(CREATE_LIST_REQUESTED, createList);
  yield takeLatest(UPDATE_LIST_REQUESTED, updateList);
  yield takeEvery(DELETE_LIST_REQUESTED, deleteList);
}

export default watchListSaga;
