/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';

import styled from 'styled-components';
import md from './index.md';

import nl2br from 'react-nl2br';

const Container = styled.div`
  flex: 1;
  flex-direction: row;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
`;

const Range = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Value = styled.div`font-size: 1em;`;

const Content = styled.div`
  flex: 4;
  display: flex;
  flex-direction: column;

  & > Description {
    margin-bottom: 10px;
  }
`;

const Position = styled(Value)`
  font-size: 1em;
  font-weight: bolder;
`;

const Company = styled(Value)``;

const Icon = styled.img`
  max-width: 32px;
  margin-top: 10px;
`;

const Location = styled(Value)`
  font-size: 0.8em;
  margin-bottom: 10px;
`;

const Description = styled(Value)`
  margin-bottom: 10px;
  max-width: 400px;
  font-size: 0.8em;
  font-weight: lighter;
`;

const Technologies = styled(Value)`margin: 10px 0;`;

const Technology = styled.span`
  color: #000;
  font-size: 0.8em;

  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
`;

class Experience extends React.Component {
  render() {
    const list = md.list || [];
    return (
      <Container>
        {list.map(item => (
          <Item key={item.range + item.title} style={item.style}>
            <Range>
              {item.range}
              {item.icon ? <Icon src={item.icon} alt={item.title} /> : null}
            </Range>
            <Content>
              <Position>{item.position}</Position>
              <Company>{item.company}</Company>
              <Location>{item.location}</Location>
              <Description>{nl2br(item.description)}</Description>
              {item.technologies ? (
                <Technologies>
                  {item.technologies.map(tech => (
                    <Technology title={tech.description} key={tech.title}>
                      {tech.title}
                    </Technology>
                  ))}
                </Technologies>
              ) : null}
            </Content>
          </Item>
        ))}
      </Container>
    );
  }
}

export default Experience;
