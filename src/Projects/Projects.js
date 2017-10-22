/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
`;

const Logo = styled.img`
  max-width: 100%;
  transform: scale3d(1, 1, 1);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
`;

const Video = styled.video`
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: 'green';
  object-fit: cover;
  transition: opacity 0.5s ease;
`;

const Project = styled.a`
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex: -1;
  flex-direction: row;
  width: 180px;
  height: 240px;
  margin-right: 20px;
  text-align: center;
  color: #fff;
  align-content: center;
  justify-content: center;
  position: relative;

  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  overflow: hidden;

  transform: scale3d(1, 1, 1);
  transition: transform 0.5s ease;
  &:hover {
    transform: scale3d(1.1, 1.1, 1.1);

    -webkit-box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.5) !important;
    box-shadow: 0 2px 20px 0 rgba(0, 0, 0, 0.5) !important;
  }

  &:hover ${Logo} {
    box-shadow: '0 2px 20px 0 rgba(0,0,0,0.5)';
    transform: scale3d(1.1, 1.1, 1.3);
  }

  &:hover ${Video} {
    opacity: 1;
  }
`;

const ProjectTitle = styled.span`
  position: absolute;
  text-indent: 9000px;
`;

class Projects extends React.Component {
  render() {
    const projects = this.props.projects || [];
    return (
      <Container>
        {projects.map(project => (
          <Project
            href={project.url}
            key={project.title}
            style={this.styleForProject(project)}
          >
            <ProjectTitle>{project.title}</ProjectTitle>
            {project.video ? (
              <Video muted autoPlay loop playsInline>
                <source src={project.video} type="video/mp4" />
              </Video>
            ) : null}
            {project.logo ? (
              <Logo
                src={project.logo}
                alt={project.title}
                title={project.title}
              />
            ) : (
              project.title
            )}
          </Project>
        ))}
      </Container>
    );
  }

  styleForProject(project) {
    return {
      background:
        'linear-gradient(157deg, ' +
        project.style.color1 +
        ' 0%,' +
        project.style.color2 +
        ' 100%)',
      /*[
          project.style.color1,
          '-moz-linear-gradient(-45deg, '+project.style.color1+' 0%, '+project.style.color2+' 100%)', // FF3.6-15
          '-webkit-linear-gradient(-45deg, '+project.style.color1+' 0%,'+project.style.color2+' 100%)', // Chrome10-25,Safari5.1-6
          'linear-gradient(135deg, '+project.style.color1+' 0%,'+project.style.color2+' 100%)', //W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+
      ],*/
      WebkitBoxShadow:
        '0 2px 20px 0 ' +
        this.hexToRgbA(project.style.color1, 0.5) +
        ', 0 2px 20px 0 ' +
        this.hexToRgbA(project.style.color2, 0.5),
      boxShadow:
        '0 2px 20px 0 ' +
        this.hexToRgbA(project.style.color1, 0.5) +
        ', 0 2px 20px 0 ' +
        this.hexToRgbA(project.style.color2, 0.5),
    };
  }

  hexToRgbA(hex, alpha = undefined) {
    alpha = alpha || 1;
    var c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return (
        'rgba(' +
        [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') +
        ', ' +
        alpha +
        ')'
      );
    }
    throw new Error('Bad Hex');
  }
}

export default Projects;
