/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import nl2br from 'react-nl2br';
import { graphql, createFragmentContainer } from 'react-relay';

import type { Experience_list } from './__generated__/Experience_list.graphql';

import LocalizedStrings from 'react-localization';
let strings = new LocalizedStrings({
  en: {
    see: 'see',
    projects: 'Project(s)',
    project: 'Project',
  },
  de: {
    see: 'siehe',
    projects: 'Projekt(e)',
    project: 'Projekt',
  },
});

const Container = styled.div`
  flex: 1;
  flex-direction: row;
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;

  page-break-inside: avoid;

  &.highlighted {
    color: #d3b47d;
    font-weight: normal;
  }
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

  @media print {
    font-size: 1em;
  }
`;

const Technologies = styled(Value)`margin: 10px 0;`;

const Technology = styled.span`
  display: inline-block;
  color: #000;
  font-size: 0.8em;

  border: 1px solid #000;
  border-radius: 5px;
  padding: 5px;
  margin-right: 10px;
  margin-bottom: 10px;

  @media print {
    font-size: 1em;
  }
`;

const Projects = styled(Value)`
  margin: 10px 0;
  color:#999;
  font-size: 0.8em;

  @media print {
    display:none;
    & :before {
      content: '${strings.see} ';
    }
  }
`;

const Project = styled.a`
  display: inline-block;
  margin-right: 0.5em;
  text-decoration: none;
  color:#999;

  @media screen {
    & :before {
      content: '→ ${strings.project}: ';
    }
  }
  @media print {
    & :after {
      content: ', ';
    }
    & :last-child:after{
      content: '';
    }
  }
`;

type Props = {
  list: ?any,
};

class Experience extends React.Component<any, Props, any> {
  render() {
    console.log(
      'PROPS: ' + (this.props.list ? JSON.stringify(this.props.list) : 'null'),
    );

    const list = this.props.list || [];

    return (
      <Container>
        {list.map(item => (
          <Item
            key={item.range + item.position}
            className={item.highlighted ? 'highlighted' : null}
          >
            <Range>
              {item.range}
              {item.icon ? <Icon src={item.icon} alt={item.title} /> : null}
            </Range>
            <Content>
              <Position>{item.position}</Position>
              <Company>{item.company}</Company>
              <Location>{item.location}</Location>
              {item.description ? (
                <Description>{nl2br(item.description)}</Description>
              ) : null}
              {item.projects ? (
                <Projects>
                  {item.projects.map(project => (
                    <Project
                      href={'/project/' + project.id}
                      title={project.shortTitle}
                      key={project.id}
                    >
                      {project.shortTitle}
                    </Project>
                  ))}
                </Projects>
              ) : null}
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

export default createFragmentContainer(
  Experience,
  // This `_list` fragment name suffix corresponds to the prop named `list` that
  // is expected to be populated with server data by the `<Experience>` component.
  graphql`
    fragment Experience_list on Experience @relay(plural: true) {
      range
      icon
      location
      position
      company
      description
      highlighted
      technologies {
        title
        description
      }
      projects {
        shortTitle
        id
      }
    }
  `,
);
