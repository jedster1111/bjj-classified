import React from "react";
import { meaningOfLife } from "bjj-common";
import { BrowserRouter, Link, Switch, Route } from "react-router-dom";
import { MovePage } from "./pages/MovePage";

const HomePage = () => (
  <header className="App-header">
    <p>
      Edit <code>src/App.tsx</code> and save to reload. The meaning of life:{" "}
      {meaningOfLife()}!
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
  </header>
);

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/moves">Moves</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/meaningOfLife">
            <div>{meaningOfLife()}</div>
          </Route>
          <Route path="/moves">
            <MovePage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
