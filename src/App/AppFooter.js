/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';

const Footer = styled.div`
  width: 100%;
  max-width: 960px;
  padding: 1rem;
  margin: 0 auto;

  padding: 24px;
  color: rgba(0, 0, 0, 1);
`;

const Copyright = styled.span`padding-right: 0.5em;`;

class AppFooter extends React.Component {
  render() {
    return (
      <Footer>
        <Copyright css="padding-right: 0.5em">&copy; 2017</Copyright>
        Robert Biehl
      </Footer>
    );
  }
}

export default AppFooter;
