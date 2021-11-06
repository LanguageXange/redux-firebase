import { call, all, put, takeLatest } from "redux-saga/effects";
import { UserActionTypes } from "../user/user-types";
import { emptyCart } from "./cart-actions";

export function* emptyMyCart() {
  yield put(emptyCart());
}

export function* onEmptyCart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, emptyMyCart);
}

export function* cartSagas() {
  yield all([call(onEmptyCart)]);
}
