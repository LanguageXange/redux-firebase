import ShopActionTypes from "./shop-types";
import {
  fireStore,
  convertCollectionsSnapshotToMap,
} from "../../firebase/firebase.utils";
import { getDocs, collection } from "firebase/firestore";
export const fetchCollectionStart = () => ({
  type: ShopActionTypes.FETCH_COLLECTION_START,
});
export const fetchCollectionSuccess = (collectionMap) => ({
  type: ShopActionTypes.FETCH_COLLECTION_SUCCESS,
  payload: collectionMap,
});
export const fetchCollectionFail = (errormessage) => ({
  type: ShopActionTypes.FETCH_COLLECTION_FAIL,
  payload: errormessage,
});
// a thunk is a function that wraps an expression to delay its evaluation.
// thunk is a function returned by another function
// https://daveceddia.com/what-is-a-thunk/
// redux-thunk does: it is a middleware that looks at every action that passes through the system,
//and if it’s a function, it calls that function. That’s all it does.

// Redux will pass two arguments to thunk functions: dispatch, so that they can dispatch new actions if they need to; and getState, so they can access the current state.

export const fetchCollectionStartAsync = () => {
  return async (mydispatch, second) => {
    try {
      const mycollectionRef = collection(fireStore, "mycollections");
      mydispatch(fetchCollectionStart());
      // do I await getDocs here?
      // and turn dispatch into async dispatch above and add try catch block ?
      const mycollectionSnapShot = await getDocs(mycollectionRef); //console.log(mycollectionSnapShot); // array of object
      const collectionMap =
        convertCollectionsSnapshotToMap(mycollectionSnapShot);
      mydispatch(fetchCollectionSuccess(collectionMap));

      // console.log(mydispatch, "what is first argument - should be dispatch");
      // console.log(second, "what is second arg - it should be getState");
    } catch (err) {
      mydispatch(fetchCollectionFail(err.message));
    }
  };
};
