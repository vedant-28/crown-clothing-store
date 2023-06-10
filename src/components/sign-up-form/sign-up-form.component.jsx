import React, { useState } from "react";
import { userAuthWithEmailAndPassword, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-up-form.styles.scss';

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields); // "defaultFormFields" gets mapped to "formFields" state variable, Hence "formFields" is an object.
  const { displayName, email, password, confirmPassword } = formFields; // destructuring values coming in "formFields" state variable; whichis an object.

  //console.log(formFields);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const { user } = await userAuthWithEmailAndPassword(email, password);
      await createUserDocFromAuth(user, { displayName });
      resetFormFields();
      // When email & passwd based auth is done, it does not have displayName inside it by default 
      // (when provider is google, we have to enter our name in account hence it returns by default.)
      // Hence to set displayName in our db, it is passed externally here, which we get from sign up form, when user fills it.
      //console.log(response);
    } catch (err) {
      if(err.code === "auth/email-already-in-use") {
        alert("User already exists");
      }
      else console.log("User creation error",err);
    }
  }

  // e => it's an event which is fired when values inside <input> changes.
  // we're getting name & value from event obj to set in to state.
  const changeHandler = (e) => {
    const { name, value } = e.target; // "target" gives back 'thing' in event object which emitts actual event. that 'thing' in this case is input. 
    //Hence target give us back all things attached to input & not just event.

    // setting object in state as we're going to update only one appropriate form field. 
    // So the other form fields that was previously on the state are spread. 
    // So "...formFields" is going to spread all the fields, and then update appropriate field by using []: notation.
    /* []: notation => It's used to set key of value in object dynamically (both key & value of object are generated dynamically.);
        passing array as a key => take "name" & "value" from destructured array formFields => "const { name, value } = e.target";
        which is spread here as "...formFields" & set them here as "[name]: value". more details: https://medium.com/@bretdoucette/understanding-this-setstate-name-value-a5ef7b4ea2b4
    */
    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>I don't have an account</h2>
      <span>Sign Up With Your Email & Password</span>
      <form onSubmit={handleSubmit}>
        {/*With "name", we will be able to distinguish which value out of these 4 <input>'s is changing*/}
        {/*"value" is the value that we pass as input & will be displayed in input field.*/}
        {/*Usually, value from the state is displayed in input. When user enters a "value" in input, onChange is fired & those respective values related to that form field are pushed into state variable*/}
        {/*The visual aspect user sees in form field's input box, is not determined by <input>, but by a "value". By this, we can control what these fields are & what we're doing with'em through our state itself*/}
        <FormInput
          label="Display Name"
          required
          type="text"
          name="displayName"
          value={displayName}
          onChange={changeHandler}
        />

        <FormInput
          label="Email"
          required
          type="email"
          name="email"
          value={email}
          onChange={changeHandler}
        />

        <FormInput
          label="Password"
          required
          type="password"
          name="password"
          value={password}
          onChange={changeHandler}
        />

        <FormInput
          label="Confirm Password"
          required
          type="password"
          name="confirmPassword"
          value={confirmPassword}
          onChange={changeHandler}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
