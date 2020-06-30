import React from "react";
import { NavLinks } from "./NavLinks";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: grid;
  border: solid 1px black;
  background-color: #36494e;

  margin: 5px;
  border-radius: 7px;
  padding: 3px;
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
    </StyledHeader>
  );
};
