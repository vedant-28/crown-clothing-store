// sign-in comp needs to utilize context value, 
// so 2 things are needed => useContext hook & actual context itslef

import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";// context; alias: UserContext, gives back a value which is passed in to "value" attribute; which is "currentUser" & "setCurrentUser" of useState; which are instantiated as an object, we get back (exact object) with whatever value is there as "currentUser" in UserProvider's useState.

// useContext => glorified hook into an another component, that will re-render it's subsequent comps, whenever "UserContext" comp is updated, which provides context to us.
import {
  signInWithGooglePopup,
  createUserDocFromAuth,
  signInUserAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields); // "defaultFormFields" gets mapped to "formFields" state variable, Hence "formFields" is an object.
  const { email, password } = formFields; // destructuring values coming in "formFields" state variable; whichis an object.

  //console.log(formFields);

  const { setCurrentUser } = useContext(UserContext); // for sign-in form, we need to set value. setCurrentUser() setter function is executed when we get "user" value after clicking "submit."

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    console.log(user);
    createUserDocFromAuth(user);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { user } = await signInUserAuthWithEmailAndPassword(email,password);
      setCurrentUser(user); // Running setCurrentUser setter function whenever we get "user" value.
      resetFormFields();
    } catch (err) {
      // eslint-disable-next-line default-case
      switch(err.code) {
        case "auth/user-not-found": 
          alert("Incorrect email");
          break;
        case "auth/wrong-password":
          alert("Incorrect password");
          break;
        default: console.log(err);
      }
    }
  };

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
      <h2>I Already Have An Account</h2>
      <span>sign in with your email & password</span>
      <form onSubmit={handleSubmit}>
        {/*With "name", we will be able to distinguish which value out of these 4 <input>'s is changing*/}
        {/*"value" is the value that we pass as input & will be displayed in input field.*/}
        {/*Usually, value from the state is displayed in input. When user enters a "value" in input, onChange is fired & those respective values related to that form field are pushed into state variable*/}
        {/*The visual aspect user sees in form field's input box, is not determined by <input>, but by a "value". By this, we can control what these fields are & what we're doing with'em through our state itself*/}

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

        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
