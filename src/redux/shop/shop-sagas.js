import { takeLatest, call, put } from "redux-saga/effects";
import {
  convertCollectionsSnapshotToMap,
  fireStore,
} from "../../firebase/firebase.utils";
import ShopActionTypes from "./shop-types";
import { getDocs, collection } from "firebase/firestore";

import { fetchCollectionSuccess, fetchCollectionFail } from "./shop-actions";

export function* fetchMyCollections() {
  yield console.log("i am a saga i am called");
  try {
    const mycollectionRef = collection(fireStore, "mycollections");
    const mycollectionSnapShot = yield getDocs(mycollectionRef);
    const collectionMap = yield call(
      convertCollectionsSnapshotToMap,
      mycollectionSnapShot
    );

    yield put(fetchCollectionSuccess(collectionMap));
  } catch (err) {
    console.log(err);
    yield put(fetchCollectionFail(err.message));
  }
}

// below is the original thunk code
// export const fetchCollectionStartAsync = () => {
//   return async (mydispatch, second) => {
//     try {
//       const mycollectionRef = collection(fireStore, "mycollections");
//       mydispatch(fetchCollectionStart())
//       const mycollectionSnapShot = await getDocs(mycollectionRef); //console.log(mycollectionSnapShot); // array of object
//       const collectionMap =
//         convertCollectionsSnapshotToMap(mycollectionSnapShot);
//       mydispatch(fetchCollectionSuccess(collectionMap));

//       // console.log(mydispatch, "what is first argument - should be dispatch");
//       // console.log(second, "what is second arg - it should be getState");
//     } catch (err) {
//       mydispatch(fetchCollectionFail(err.message));
//     }
//   };
// };

export function* onFetchCollectionStart() {
  yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START, fetchMyCollections);
}
