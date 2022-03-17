import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form.component";

import './authentication.styles.scss'

const Authentication = () => {
  // Implementation of auth utils in sign-in page (page-level component/route-level component)
  // Asynchronous because it involves a call to a database

  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm></SignUpForm>
    </div>
  );
};

export default Authentication;
