import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Login, Home } from "./pages";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import { CssBaseline, GlobalStyles } from "@material-ui/core";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles />
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}
