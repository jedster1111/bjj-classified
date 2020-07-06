import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { MovesPage } from "./pages/MovesPage";
import { Header } from "./header/Header";
import { HomePage } from "./pages/HomePage";
import { MeaningOfLifePage } from "./pages/MeaningOfLifePage";
import styled from "styled-components";
import { GlobalCss } from "./globalCss/GlobalCss";

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #afd0bf;

  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
`;

const Main = styled.div`
  flex: 1;
  max-width: 1600px;
  width: 100%;

  margin: 5px;
  padding: 3px;
`;

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <GlobalCss />
      <StyledApp>
        <Header />
        <Main>
          <Switch>
            <Route path="/meaningOfLife">
              <MeaningOfLifePage />
            </Route>
            <Route path="/moves" exact={false}>
              <MovesPage />
            </Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </Main>
      </StyledApp>
    </BrowserRouter>
  );
}

export default App;
