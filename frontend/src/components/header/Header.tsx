import React from "react";
import { NavLinks } from "./NavLinks";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: grid;
  border: solid 1px black;
`;

export const Header = (): JSX.Element => {
  return (
    <StyledHeader>
      <NavLinks
        links={[
          { to: "/", displayText: "BJJC", exact: true },
          { to: "/moves", displayText: "Moves" },
        ]}
      />
    </StyledHeader>
  );
};
