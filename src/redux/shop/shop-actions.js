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
//  return a function to perform dispatch
export const fetchCollectionStartAsync = () => {
  return async (dispatch) => {
    try {
      const mycollectionRef = collection(fireStore, "mycollections");
      dispatch(fetchCollectionStart());
      // do I await getDocs here?
      // and turn dispatch into async dispatch above and add try catch block ?
      const mycollectionSnapShot = await getDocs(mycollectionRef); //console.log(mycollectionSnapShot); // array of object
      const collectionMap =
        convertCollectionsSnapshotToMap(mycollectionSnapShot);
      dispatch(fetchCollectionSuccess(collectionMap));
    } catch (err) {
      dispatch(fetchCollectionFail(err.message));
    }
  };
};
