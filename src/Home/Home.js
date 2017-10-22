/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import { graphql, createFragmentContainer } from 'react-relay';

import Profile from '../Profile';
import Projects from '../Projects';
import Experience from '../Experience';

const Container = styled.div`margin-bottom: 40px;`;

const ProjectsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen and (max-width: 959px) {
    flex-direction: column;
  }
`;

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Profile profile={this.props.profile} />

        <Container>
          <ProjectsContainer>
            <div>
              <h2 name={'projects'} id={'projects'}>
                {'Current Projects'}
              </h2>
              <Projects
                title={'Current'}
                projects={[
                  {
                    title: 'SnapMe',
                    logo: '/img/logo/snapme.png',
                    url: 'https://snapmeapp.com',
                    video: '/video/snapme.mp4',
                    style: {
                      color1: '#46C8FA',
                      color2: '#3CE6B4',
                      shadowColor1: '#46C8FA',
                      shadowColor2: '#3CE6B4',
                    },
                  },
                  {
                    title: 'Caffe2Kit',
                    logo: '/img/logo/caffe2kit.svg',
                    url: 'https://github.com/RobertBiehl/caffe2-ios',
                    style: {
                      color1: '#FBC39A',
                      color2: '#F57D8A',
                      shadowColor1: '#FBC39A',
                      shadowColor2: '#F57D8A',
                    },
                  },
                ]}
              />
            </div>

            <div>
              <h2>{'Previous'}</h2>
              <Projects
                projects={[
                  {
                    title: 'Fashionfreax',
                    logo: '/img/logo/fashionfreax.svg',
                    url: 'https://www.fashionfreax.net',
                    video: '/video/fashionfreax.mp4',
                    style: {
                      color1: '#FF2D55',
                      color2: '#FF2D55',
                      shadowColor1: '#FF2D55',
                      shadowColor2: '#FF2D55',
                    },
                  },
                  {
                    title: 'Lens',
                    logo: '/img/logo/lens.svg',
                    url: 'https://www.youtube.com/watch?v=NIIFmSaGTGg',
                    video: '/video/lens.mp4',
                    style: {
                      color1: '#ED3DBA',
                      color2: '#D61D81',
                      shadowColor1: '#ED3DBA',
                      shadowColor2: '#D61D81',
                    },
                  },
                ]}
              />
            </div>
          </ProjectsContainer>
        </Container>
        <Container>
          <h2 name={'experience'} id={'experience'}>
            {'Experience'}
          </h2>
          <Experience list={this.props.experienceList} />
        </Container>
      </div>
    );
  }
}
