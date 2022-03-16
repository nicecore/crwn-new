import {
  auth,
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../utils/firebase/firebase.utils";

import { useEffect } from "react";
// Gets auth after a redirect (eg to google login)
import { getRedirectResult } from "firebase/auth";

import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
  // Implementation of auth utils in sign-in page (page-level component/route-level component)
  // Asynchronous because it involves a call to a database

  const logGoogleUser = async () => {
    // Get a response by waiting for signInWithGooglePopup
    // Destructure user object from the response object
    const { user } = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign In With Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>
        Sign In With Google Redirect
      </button>
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default SignIn;
