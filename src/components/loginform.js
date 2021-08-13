import { useState } from "react";
import { Redirect } from "react-router-dom";

import Icone from "./icone";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  const onChangeEmail = (evt) => {
    setEmail(evt.target.value);
  };

  const onChangePassword = (evt) => {
    setPassword(evt.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    console.log(email, password);
    localStorage.setItem("appToken", "true");
    setIsLogged(true);
  };

  if (isLogged) {
    return <Redirect to="/" />;
  }

  return (
    <form onSubmit={onSubmit} className="flex justify-center items-center">
      <div className="container mx-auto flex-col w-44 h-24">
        <fieldset className="container mx-auto flex my-3">
          <Icone name="user" />
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="username"
            value={email}
            onChange={onChangeEmail}
            className="rounded-md bg-loginInput shadow-me w-52 h-8 pl-2 ml-1"
          ></input>
        </fieldset>
        <fieldset className="container mx-auto flex w-full">
          <Icone name="password" />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
            className="rounded-md bg-loginInput shadow-me w-52 h-8 pl-2 ml-1"
          ></input>
        </fieldset>
      </div>
      <button className="bg-loginInput shadow-me rounded-xl w-9 h-20 flex items-center justify-center ml-6">
        <Icone twclass="w-8" name="enter"/>
      </button>
    </form>
  );
}
