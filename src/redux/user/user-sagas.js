import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDoc } from "@firebase/firestore";
import { UserActionTypes } from "./user-types";
import {
  provider,
  auth,
  createUserReference,
  getCurrentUser,
} from "../../firebase/firebase.utils";
import {
  signInFail,
  signInSuccess,
  signOutSuccess,
  signOutFail,
  signUpFail,
  signUpSuccess,
} from "./user-actions";

// remember that we receive email and password as an object (user-actions.js) when email sign in start
// check sign-in component
// mysaga@gmail.com
// 123456789
//  payload: 'Firebase: Error (auth/invalid-value-(email),-starting-an-object-on-a-scalar-field).'

// notice repetive code with emailSignIn, googleSignIn and checkUserAuth
function* getSnapshotFromAuthHelper(userAuth, someExtraInfo) {
  try {
    const userRef = yield call(createUserReference, userAuth, someExtraInfo);
    const userSnapShot = yield getDoc(userRef);
    yield put(signInSuccess(userSnapShot.data()));
  } catch (err) {
    yield put(signInFail(err.message));
  }
}

export function* emailSignIn(action) {
  const { email, password } = action.payload;
  try {
    const response = yield signInWithEmailAndPassword(auth, email, password);
    const myuser = yield response.user;
    yield getSnapshotFromAuthHelper(myuser);
  } catch (err) {
    yield put(signInFail(err));
  }
}

export function* onEmailSignIn() {
  yield takeLatest(UserActionTypes.EMAIL_SIGNIN_START, emailSignIn);
}

export function* googleSignIn() {
  try {
    const result = yield signInWithPopup(auth, provider);
    const myuser = result.user;
    yield getSnapshotFromAuthHelper(myuser);
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

// check user session

// original code in App.js
// useEffect(() => {
//   // onAuthStateChanged is an observer and returns Unsubscribe huh?
//   const unsub = onAuthStateChanged(auth, async (user) => {
//     if (user) {
//       const userRef = await createUserReference(user);
//       const userSnapshot = await getDoc(userRef);
//       setCurUser(userSnapshot.data());
//     } else {
//       setCurUser(null);
//       console.log("user not sign in");
//     }
//   });

//   return () => unsub(); // clean up function
// }, [setCurUser]);

export function* checkUserAuth() {
  //yield console.log("check user auth");
  // use the helper function from firebase utils.js
  try {
    const myuser = yield getCurrentUser();
    yield getSnapshotFromAuthHelper(myuser);
  } catch (err) {
    yield put(signInFail(err));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, checkUserAuth);
}

// sign out

export function* userSignOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (err) {
    yield put(signOutFail(err));
  }
}

export function* onSignOut() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, userSignOut);
}

// sign up sagas
// original code in sign-up component
// ----------------------------------
// try {
//   const newUser = await createUserWithEmailAndPassword(
//     auth,
//     email,
//     password
//   );
//   // console.log(newUser, "what is new User"); // UserCredentialImpl
//   //  need to pass the user object rather than entire newUser
//   await createUserReference(newUser.user, {
//     displayName,
//     hobby: "leetcode practice",
//   });

//   this.setState({
//     displayName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//   });
// } catch (error) {
//   console.error(error);
// }
/// --------------------------------

export function* userSignUp(action) {
  const { email, password, displayName } = action.payload;
  try {
    const newUser = yield createUserWithEmailAndPassword(auth, email, password);
    const userAuth = newUser.user;
    yield put(signUpSuccess({ user: userAuth, extraData: { displayName } }));
  } catch (err) {
    yield put(signUpFail(err));
  }
}

export function* signInAfterSignUp(action) {
  const { user, extraData } = action.payload;
  yield getSnapshotFromAuthHelper(user, extraData);
}

export function* onSignUp() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, userSignUp);
}
export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}

// our user Sagas to be called in root saga
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignIn),
    call(onCheckUserSession),
    call(onSignOut),
    call(onSignUp),
    call(onSignUpSuccess),
  ]);
}
