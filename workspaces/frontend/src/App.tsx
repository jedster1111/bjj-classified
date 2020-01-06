import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import { getAthletes } from "./api";

const App: React.FC = () => {
  const [athletes, setAthletes] = useState<string[]>([]);

  useEffect(() => {
    const getAndSetAthletes = async (): Promise<void> => {
      const athletes = await getAthletes();
      setAthletes(athletes);
    };

    getAndSetAthletes();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        {athletes.join(", ")}
        <a>learn react</a>
      </header>
    </div>
  );
};

export default App;
