import { UserActionTypes } from "./user-types";

// action creator is a function that returns an object

export const setCurrentUser = (user) => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user,
});
