import { UserActionTypes } from "./user-types";

const initial_state = {
  currentUser: null,
  error: null,
};

const userReducer = (state = initial_state, action) => {
  switch (action.type) {
    case UserActionTypes.GOOGLE_SIGNIN_SUCCESS:
    case UserActionTypes.EMAIL_SIGNIN_SUCCESS:
      return { ...state, currentUser: action.payload, error: null };
    case UserActionTypes.GOOGLE_SIGNIN_FAIL:
    case UserActionTypes.EMAIL_SIGNIN_FAIL:
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default userReducer;
