import { takeLatest, put, all, call } from "redux-saga/effects";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { getDoc } from "@firebase/firestore";
import { UserActionTypes } from "./user-types";
import {
  provider,
  auth,
  createUserReference,
} from "../../firebase/firebase.utils";
import { signInFail, signInSuccess } from "./user-actions";

// remember that we receive email and password as an object (user-actions.js) when email sign in start
// check sign-in component
// mysaga@gmail.com
// 123456789
//  payload: 'Firebase: Error (auth/invalid-value-(email),-starting-an-object-on-a-scalar-field).'

export function* emailSignIn(action) {
  const { email, password } = action.payload;
  try {
    const response = yield signInWithEmailAndPassword(auth, email, password);
    const myuser = yield response.user;
    const userRef = yield call(createUserReference, myuser);
    const userSnapShot = yield getDoc(userRef);
    yield put(signInSuccess(userSnapShot.data()));
  } catch (err) {
    yield put(signInFail(err.message));
  }
}

export function* onEmailSignIn() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, emailSignIn);
}

export function* googleSignIn() {
  try {
    const result = yield signInWithPopup(auth, provider);
    const user = result.user;
    const userRef = yield call(createUserReference, user);
    const userSnapShot = yield getDoc(userRef);
    // console.log(user, userRef, userSnapShot, "what arer these in usersagas.js");
    yield put(signInSuccess(userSnapShot.data()));
  } catch (err) {
    yield put(signInFail(err.message));
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
  yield all([call(onGoogleSignInStart), call(onEmailSignIn)]);
}
