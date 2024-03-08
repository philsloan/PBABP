import { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, ADD_USER } from "../utils/mutations";
import Auth from "../utils/auth";

const signUp = () => {
  const [signUpForm, setSignUpForm] = useState(false);
  const [userForm, setUserForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [addUser, { error }] = useMutation(ADD_USER);
  const [login, _] = useMutation(LOGIN_USER);
  const handleChangeToSignUp = () => {
    setSignUpForm(!signUpForm);
  };
  const handleUserFormChange = (event) => {
    const { name, value } = event.target;
    setUserForm({ ...userForm, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (userForm.username && userForm.password) {
      if (!signUpForm) {
        try {
          const { data } = await login({
            variables: { ...userForm },
          });
          Auth.login(data.login.token);
        } catch (err) {
          console.error(err);
        }
      } else {
        try {
          const { data } = await addUser({
            variables: { ...userForm },
          });
          Auth.login(data.addUser.token);
        } catch (err) {
          console.error(err);
        }
      }
    }
  };
  return (
    <div>
      {signUpForm ? <h2>Signup</h2> : <h2>Login</h2>}
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">
          Username:
          <input
            type="text"
            placeholder="Username"
            required
            name="username"
            id="username"
            value={userForm.username}
            onChange={handleUserFormChange}
          ></input>
        </label>
        {signUpForm && (
          <label htmlFor="email">
            Email:
            <input
              type="text"
              placeholder="Email"
              required
              name="email"
              id="email"
              value={userForm.email}
              onChange={handleUserFormChange}
            ></input>
          </label>
        )}
        <label htmlFor="password">
          Password:
          <input
            type="password"
            placeholder="Password"
            required
            name="password"
            id="password"
            value={userForm.password}
            onChange={handleUserFormChange}
          ></input>
        </label>
        <div>
          <span onClick={handleChangeToSignUp}>{signUpForm?"Login":"Signup"}</span>
          <button>submit</button>
        </div>
      </form>
    </div>
  );
};

export default signUp;
