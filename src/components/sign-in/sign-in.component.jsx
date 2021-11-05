import React, { useState } from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import "./sign-in.styles.scss";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user-actions";
import { connect } from "react-redux";
const SignIn = ({ myEmailSignIn, myGoogleSignIn }) => {
  const [userInfo, setUserInfo] = useState({ email: "", password: "" });
  const { email, password } = userInfo;
  const handleSubmit = (event) => {
    event.preventDefault();

    myEmailSignIn(email, password);
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          handleChange={handleChange}
          value={email}
          label="email"
          required
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          handleChange={handleChange}
          label="password"
          required
        />
        <CustomButton type="submit"> Sign in </CustomButton>
        <CustomButton type="button" onClick={myGoogleSignIn} isGoogle>
          {" "}
          Sign in With Google{" "}
        </CustomButton>
      </form>
    </div>
  );
};

const getMyActions = (dispatch) => ({
  myGoogleSignIn: () => dispatch(googleSignInStart()),
  myEmailSignIn: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(null, getMyActions)(SignIn);

// the following is return from SignInWithtPopup
// operationType: "signIn"
// providerId: "google.com"
// user: UserImpl {providerId: 'firebase', emailVerified: true, isAnonymous: false, tenantId: null, providerData: Array(1), …}
// _tokenResponse: {federatedId: 'https://accounts.google.com/xxxxx', providerId: 'google.com', email: 'xx', emailVerified: true, firstName: 'xxx'}
