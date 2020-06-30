import React from "react";
import { meaningOfLife } from "bjj-common";

export const HomePage = () => (
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
