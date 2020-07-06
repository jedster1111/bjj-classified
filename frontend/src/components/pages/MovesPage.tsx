import React, { useEffect, useState } from "react";
import { MoveDto } from "bjj-common";
import { getMoves } from "../../api";
import styled from "styled-components";
import { useRouteMatch, Route, useHistory } from "react-router-dom";
import { MoveVideoList } from "../moves/MoveVideoList";

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

const MoveListElement = styled.li``;

const MoveButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: solid black 1px;
  border-radius: 5px;
  background-color: #8ef9f3;
  text-align: center;
`;

const MoveVideosListContainer = styled.div`
  width: 800px;
  padding: 25px;
  margin: auto;
`;

export const MovesPage = (): JSX.Element => {
  const { path } = useRouteMatch();
  const history = useHistory();

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

  const handleMoveClick = (moveId: string) => {
    history.push(`${path}/${moveId}`);
  };

  return (
    <MovePageContainer>
      <MovesList>
        {moves.map((move) => (
          <MoveListElement
            key={move.id}
            onClick={() => handleMoveClick(move.id)}
          >
            <MoveButton>{move.name}</MoveButton>
          </MoveListElement>
        ))}
      </MovesList>

      <Route path={`${path}/:moveId`}>
        <MoveVideosListContainer>
          <MoveVideoList />
        </MoveVideosListContainer>
      </Route>
    </MovePageContainer>
  );
};
