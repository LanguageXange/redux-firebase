import { UserActionTypes } from "./user-types";

// action creator is a function that returns an object

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

// GOOGLE
export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGNIN_START,
});

// EMAIL
export const emailSignInStart = (emailandPass) => ({
  type: UserActionTypes.EMAIL_SIGNIN_START,
  payload: emailandPass,
});

// refactor a bit so that both google and email sign in use the same
// sign in success and sign in fail action creator
export const signInFail = (message) => ({
  type: UserActionTypes.SIGNIN_FAIL,
  payload: message,
});

export const signInSuccess = (user) => ({
  type: UserActionTypes.SIGNIN_SUCCESS,
  payload: user,
});

// recreating persistence with sagas
export const checkUserSession = () => ({
  type: UserActionTypes.CHECK_USER_SESSION,
});

// sign out sagas
export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START,
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS,
});

export const signOutFail = (err) => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: err,
});
