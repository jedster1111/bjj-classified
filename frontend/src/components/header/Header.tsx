import React from "react";
import { NavLinks } from "./NavLinks";
import styled from "styled-components";

const StyledHeader = styled.header`
  width: 100%;
  max-width: 1600px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  align-items: center;

  border: solid 1px black;
  background-color: #36494e;

  margin: 5px;
  border-radius: 7px;
  padding: 3px;
`;

const Title = styled.span`
  display: flex;
  justify-content: center;

  color: #f2f2f2;
  font-size: 2em;
`;

export const Header = (): JSX.Element => {
  return (
    <StyledHeader>
      <NavLinks
        links={[
          { to: "/", displayText: "BJJC", exact: true },
          { to: "/moves", displayText: "Moves" },
          { to: "/meaningOfLife", displayText: "Meaning of Life" },
        ]}
      />
      <Title>BJJ Classified</Title>
    </StyledHeader>
  );
};
