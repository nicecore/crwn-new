import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";


const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}


const SignUpForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    // confirm passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email, 
        password
      );

      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();


    } catch(error) {
      if(error.code === 'auth/email-already-in-use') {
        alert("This email already has an account associated with it.")
      } else {
        console.log('user creation encountered an error', error);

      }

    }


    // see if user is authed with email/pw


    // create user document from what this returns

  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    setFormFields({...formFields, [name]: value})
  }

  return (
    <div>
      <h1>Sign up with email and password</h1>
      <form onSubmit={handleSubmit} action="">
        <FormInput label="Display Name" required type="text" onChange={handleChange} name="displayName" value={displayName} />

        <FormInput label="Email" required type="email" onChange={handleChange} name="email" value={email} />

        <FormInput label="Password" required type="password" onChange={handleChange} name="password" value={password} />

        <FormInput label="Confirm Password" required type="password" onChange={handleChange} name="confirmPassword" value={confirmPassword} />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
