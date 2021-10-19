import { color } from "@material-ui/system";
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
    <form onSubmit={onSubmit}>
      <div>
        <fieldset>
          <Icone name="user" />
          <label htmlFor="email"></label>
          <input
            type="email"
            id="email"
            placeholder="username"
            value={email}
            onChange={onChangeEmail}
          ></input>
        </fieldset>
        <fieldset>
          <Icone name="password" />
          <label htmlFor="password"></label>
          <input
            type="password"
            id="password"
            placeholder="password"
            value={password}
            onChange={onChangePassword}
          ></input>
        </fieldset>
      </div>
      <button>
        <Icone name="enter" />
      </button>
    </form>
  );
}
