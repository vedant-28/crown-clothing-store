import React from 'react';
import { signInWithGooglePopup, createUserDocFromAuth } from '../../utils/firebase/firebase.utils';

const SignIn = () => {
	const logGoogleUser = async () => {
		const { user } = await signInWithGooglePopup();
		console.log(user);
		createUserDocFromAuth(user);
	}

  return (
    <div>
      <h1>Sign in page</h1>
			<button onClick={logGoogleUser}>
				Sign in with Google popup
			</button>
    </div>
  )
}

export default SignIn;
