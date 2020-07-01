import React, { useEffect, useState } from "react";
import { MoveDto } from "bjj-common";
import { getMoves } from "../../api";
import styled from "styled-components";

const MovePageContainer = styled.div`
  height: 100%;
`;

const MovesList = styled.ul`
  width: 80%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  column-gap: 2em;
  row-gap: 1.4em;
`;

const Move = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 35px;
  /* width: 150px;
  height: 100px; */
  border: solid black 1px;
  border-radius: 5px;
  background-color: #8ef9f3;
  text-align: center;
`;

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
    <MovePageContainer>
      <MovesList>
        {moves.map((move) => (
          <Move key={move.id}>{move.name}</Move>
        ))}
      </MovesList>
    </MovePageContainer>
  );
};
