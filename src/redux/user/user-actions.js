import { UserActionTypes } from "./user-types";

// action creator is a function that returns an object

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});

// adding actions for sagas

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGNIN_START,
});

export const googleSignInFail = (message) => ({
  type: UserActionTypes.GOOGLE_SIGNIN_FAIL,
  payload: message,
});

export const googleSignInSuccess = (user) => ({
  type: UserActionTypes.GOOGLE_SIGNIN_SUCCESS,
  payload: user,
});

// EMAIL
export const emailSignInStart = (emailandPass) => ({
  type: UserActionTypes.EMAIL_SIGNIN_START,
  payload: emailandPass,
});

export const emailSignInFail = (message) => ({
  type: UserActionTypes.EMAIL_SIGNIN_FAIL,
  payload: message,
});

export const emailSignInSuccess = (user) => ({
  type: UserActionTypes.EMAIL_SIGNIN_SUCCESS,
  payload: user,
});
