import { put, call, takeLatest } from "redux-saga/effects";
import { createItemAPI, reorderItemAPI, deleteItemAPI } from "../utils/api";
import { Item } from "../interfaces";
import { itemActions } from "../reducers/itemReducer";

function* createItem(action: ReturnType<typeof itemActions.addItem>) {
  try {
    const result: Item = yield call(createItemAPI, action.payload);
    yield put(itemActions.addItem(result));
  } catch (err) {
    console.log(err);
  }
}

function* reorderItem(action: ReturnType<typeof itemActions.reorderItem>) {
  try {
    const result: Item = yield call(reorderItemAPI, action.payload);

    yield put(itemActions.reorderItem(result));
  } catch (err) {
    console.log(err);
  }
}

function* deleteItem(action: ReturnType<typeof itemActions.deleteItem>) {
  try {
    const result: { success: boolean } = yield call(
      deleteItemAPI,
      action.payload
    );
    if (result.success) {
      console.log("deleted");
    }
  } catch (err) {
    console.log(err);
  }
}
function* watchItemSaga() {
  yield takeLatest("CREATE_ITEM_REQUESTED", createItem);
  yield takeLatest("REORDER_ITEM_REQUESTED", reorderItem);
  yield takeLatest("DELETE_ITEM_REQUESTED", deleteItem);
}

export default watchItemSaga;
