/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';

import Link from '../Link';

const Header = styled.header`
  position: relative;
  display: flex;
  max-width: 960px;
  padding: 1rem;
  margin: 0 auto;

  color: #000;
  flex-direction: column;
  background-color: #fff;
  justify-content: space-between;
`;

const Row = styled.div`
  position: relative;
  display: flex;

  margin: auto;
  width: 100%;
  height: 64px;
  box-sizing: border-box;

  align-items: center;
  @media (max-width: 959px) and (orientation: landscape) {
    min-height: 48px;
  }
  @media (max-width: 599px) {
    min-height: 56px;
  }
`;

const Section = styled.section`
  z-index: 1;
  display: inline-flex;
  min-width: 0;
  height: 100%;
  flex: 1;
  align-items: center;
  justify-content: ${props =>
    props.start ? 'flex-start' : props.end ? 'flex-end' : 'center'};
  order: ${props => (props.start ? -1 : props.end ? 1 : null)};
`;

const TitleLink = styled(Link)`
  color: #000;
  font-weight: bolder;
  text-decoration: none;

  &.title:active,
  &.title:hover,
  &.title:visited {
  }
`;

const NavLink = styled(Link)`
  color: #000;
  font-weight: bolder;
  opacity: 0.5;
  margin-left: 1em;
  text-decoration: none;

  @media (max-width: 959px) {
    display: none;
  }
`;

class AppToolbar extends React.Component {
  props: {
    hero: React.Element<*>,
  };

  render() {
    return (
      <Header>
        <Row>
          <Section start>
            <TitleLink href="/">Robert Biehl</TitleLink>
          </Section>
          {/*
          <Section end>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#experience">Experience</NavLink>
          </Section>
          */}
        </Row>
      </Header>
    );
  }
}

export default AppToolbar;
