import React from "react";
import styled from "styled-components";
import { useRouteMatch, Route, useHistory } from "react-router-dom";
import { getMoves } from "../../api";
import { MoveVideoList } from "../moves/MoveVideoList";
import { useLoadData } from "../../hooks/useLoadData";

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

  const [isLoading, error, moves] = useLoadData(getMoves);

  if (isLoading === undefined || isLoading) return <div>Loading...</div>;

  if (error) return <div>Whoops, is the backend running?</div>;

  if (!moves?.length) return <div>There are no moves in the db currently?</div>;

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
