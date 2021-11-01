import { takeLatest, put, all, call } from "redux-saga/effects";
import { signInWithPopup } from "firebase/auth";
import { getDoc } from "@firebase/firestore";
import { UserActionTypes } from "./user-types";
import {
  provider,
  auth,
  createUserReference,
} from "../../firebase/firebase.utils";
import { googleSignInSuccess, googleSignInFail } from "./user-actions";

export function* googleSignIn() {
  try {
    const result = yield signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = yield call(createUserReference, user);
    const userSnapShot = yield getDoc(userRef);
    // console.log(user, userRef, userSnapShot, "what arer these in usersagas.js");
    yield put(googleSignInSuccess(userSnapShot.data()));
  } catch (err) {
    yield put(googleSignInFail(err.message));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGNIN_START, googleSignIn);
}

// -------------------------------------
// the code in firebase.utils.js
// export const signInWithGoogle = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       // The signed-in user info.
//       const user = result.user;
//       return user.displayName;
//       // console.log(user, "what is user for signInWithGoogle function");
//     } catch (err) {
//       console.log(err);
//     }
//   };

export function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
