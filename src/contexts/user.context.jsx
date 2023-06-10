import React, { useState } from 'react'
import { createContext } from "react";

// UserContext => value that we actually want to access
// Provider => actual component, here UserProvider 
export const UserContext = createContext({ // default values of state for Provider are created here:
	currentUser: null, // there will be no context if currentUser value is null.
	setCurrentUser: () => null, // function which does nothing.
});

// Context.Provider => For every context that is built for us;
// there is a ".Provider" is a component which wraps around the components;
// which needs to access the values inside of USerContext.

// <UserContext.Provider> is an alias component which allows us to "Provider" comp. from context API.
// ".Provider" attributes => 1) Value-> holds actual contextial value. It's an obj, which generates 2 values, currentUser & setCurrentUser from useState hook.
// i.e. Provider allows it's children to access values inside it's useState. So we can set value & get value anywhere in the component tree (which is children of Provider).

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser }

  return <UserContext.Provider value={value}>
    { children }
  </UserContext.Provider>
}

/* Context working E.g.:
* This is just a component which leverages useState, which we use to expose the value & setter of useState externally.

We have app component, which we can wrap into UserProvider:
<UserProvider>
	<app />
</UserProvider>

Hence <app /> becomes "children" which is passsed to <UserContext.Provider> to render as it's children.
*/