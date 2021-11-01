import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import "./sign-in.styles.scss";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user-actions";
import { connect } from "react-redux";
class SignIn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { myEmailSignIn } = this.props;
    const { email, password } = this.state;
    myEmailSignIn(email, password);
  };

  handleChange = (event) => {
    const { value, name } = event.target;

    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            handleChange={this.handleChange}
            value={this.state.email}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <CustomButton type="submit"> Sign in </CustomButton>
          <CustomButton
            type="button"
            onClick={this.props.myGoogleSignIn}
            isGoogle
          >
            {" "}
            Sign in With Google{" "}
          </CustomButton>
        </form>
      </div>
    );
  }
}

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
