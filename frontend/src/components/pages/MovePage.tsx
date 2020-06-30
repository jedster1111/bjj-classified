import React, { useEffect, useState } from "react";
import axios from "axios";

type MoveDto = {
  id: string;
  name: string;
};

async function getMoves() {
  return axios.get<MoveDto[]>("http://localhost:8000/moves");
}

export const MovePage = (): JSX.Element => {
  const [moves, setMoves] = useState<MoveDto[]>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    console.log(moves);
    async function handleLoad() {
      try {
        const moves = (await getMoves()).data;
        console.log(moves);
        setMoves(moves);
      } catch (e) {
        console.log(e);
        setError(e);
      }
    }

    handleLoad();
  }, []);

  if (error) return <div>Whoops, is the backend running?</div>;

  if (!moves) return <div>Loading...</div>;

  if (!moves.length) return <div>There are no moves in the db currently?</div>;

  return (
    <div>
      Moves!
      <ul>
        {moves.map((move) => (
          <li key={move.id}>{move.name}</li>
        ))}
      </ul>
    </div>
  );
};
