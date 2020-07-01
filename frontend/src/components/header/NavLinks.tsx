import React from "react";
import { Link, useRouteMatch } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: inline-block;
`;

type NavLinkProps = {
  to: string;
  isActive?: boolean;
  children: string;
};

const NavLink = styled(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ isActive, ...rest }: NavLinkProps) => <Link {...rest} />
)<NavLinkProps>`
  display: inline-block;
  background-color: ${getBackgroundColour};
  padding: 14px 16px;
  text-decoration: none;
  color: #f2f2f2;
  margin: 2px 2px;
  border-radius: 3px;
  border: solid 1px #e2efde;

  :hover {
    background-color: ${getBackgroundColourWhenHovered};
  }
`;

function getBackgroundColour({ isActive }: NavLinkProps): string {
  return isActive ? "#E9926D" : "cornflowerblue";
}

function getBackgroundColourWhenHovered({ isActive }: NavLinkProps): string {
  return isActive ? "#EEA98C" : "#a9c4f5";
}

type MyLinkProps = {
  to: string;
  exact?: boolean;
  displayText: string;
};

const MyLink = ({ to, exact, displayText }: MyLinkProps) => {
  const match = useRouteMatch({ path: to, exact });
  return (
    <NavLink to={to} isActive={Boolean(match)}>
      {displayText}
    </NavLink>
  );
};

type LinkProp = {
  to: string;
  exact?: boolean;
  displayText: string;
};

type NavLinksProps = {
  links: LinkProp[];
};

export const NavLinks = ({ links }: NavLinksProps): JSX.Element => {
  return (
    <Nav>
      {links.map((link) => (
        <MyLink key={link.to} {...link} />
      ))}
    </Nav>
  );
};
