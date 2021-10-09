import listSaga from "./ListSaga";
import boardSaga from "./BoardSaga";
import { fork, all } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fork(listSaga), fork(boardSaga)]);
}
