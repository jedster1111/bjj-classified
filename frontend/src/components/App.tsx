import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MovePage } from "./pages/MovePage";
import { Header } from "./header/Header";
import { HomePage } from "./pages/HomePage";
import { MeaningOfLifePage } from "./pages/MeaningOfLifePage";

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Switch>
          <Route path="/meaningOfLife">
            <MeaningOfLifePage />
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
