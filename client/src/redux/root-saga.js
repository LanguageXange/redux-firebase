import { all, call } from "redux-saga/effects";
import { cartSagas } from "./cart/cart-sagas";
import { onFetchCollectionStart } from "./shop/shop-sagas";
import { userSagas } from "./user/user-sagas";

// all - allow us to call the saga concurrently
export default function* myRootSaga() {
  yield all([call(onFetchCollectionStart), call(userSagas), call(cartSagas)]);
}
