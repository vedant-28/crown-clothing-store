// Commented code contains another method of signing in; sign in with redirect. It also has explanation about how it's done.

import React from 'react';
// import { useEffect } from 'react';
// import { getRedirectResult } from 'firebase/auth';
import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';

const SignIn = () => {
	// useEffect(() => {
	// 	const redirectResult = async () => {
	// 		const response = await getRedirectResult(auth);
	// 		console.log(response);
	// 		if(response) {
	// 			const userDocRef = createUserDocFromAuth(response.user);
	// 		}
	// 	}
	// 	return redirectResult;
	// }, []);

	// runs useEffect only once when SignIn comp mounts for the first time.
	// using this useEffect, when we come back to our website after signing in from redirect;
	// SignIn component mounts for the first time; then this call back runs for first time.
	// Then this will give us back a response which will be having a result from redirect based on "auth".
	// Hence "auth" obj is singleton as it keeps track of all authentications happening throughout the application.
	// "auth" behaves kind of central memory bank which tracks all authentication states for application as well as firebase instance, regardless of where the website is going.

	const logGooglePopupUser = async () => {
		const { user } = await signInWithGooglePopup();
		console.log(user);
		createUserDocFromAuth(user);
	};
	// When we use Redirect way of signing in, we redirect to entire new domain. So our website will unmount everything as it does not know we'll come back or not.
	// Hence, to see results of redirected sign-in, we need to use useEffect hook & getRedirectResult() from firebase.
	// getRedirectResult() receives result from "auth"
	// const logGoogleRedirectUser = async () => {
	// 	const { user } = await signInWithGoogleRedirect();
	// 	console.log(user);
	// 	createUserDocFromAuth(user);
	// }
  return (
    <div>
      <h1>Sign in page</h1>
			<button onClick={logGooglePopupUser}>
				Sign in with Google popup
			</button>
			<SignUpForm />
			{/* <button onClick={logGoogleRedirectUser}>
				Sign in with Google Redirect
			</button> */}
    </div>
  )
}

export default SignIn;