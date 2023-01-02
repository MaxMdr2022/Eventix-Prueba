import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";

export const Profile = () => {
  const { user, isAuthenticated } = useAuth0();
const history = useHistory()
  const { loginWithRedirect } = useAuth0();
console.log(user)
  return isAuthenticated ? (
    <div>
      <button onClick={() => history.goBack()}>back</button>
      <div>
        <img src={user.picture} alt="" />
      </div>
      <h2>{user.name}</h2>
      {JSON.stringify(user)}
    </div>
  ) : loginWithRedirect();
};
