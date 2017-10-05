/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';

import styled from 'styled-components';
import nl2br from 'react-nl2br';

const Container = styled.div`text-align: center;`;

const ProfileImage = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  margin-bottom: 20px;
`;

const Bio = styled.div`
  margin: auto;
  margin-bottom: 20px;
  min-width: 280px;
  width: 50%;
`;

const SocialLinks = styled.div`
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const SocialLink = styled.a`
  min-width: 44px;
  min-height: 44px;
  flex: 1;
  display: inline-flex;

  transition: opacity 0.1s ease;
  &:hover {
    opacity: 0.5;
  }
`;

type Props = {
  imageURL: ?String,
  name: ?String,
  social: ?Object,
  bio: ?String,
};

type State = {};

class Profile extends React.Component<any, Props, State> {
  render() {
    const social = this.props.social;
    return (
      <Container>
        <ProfileImage src={this.props.imageURL} alt={this.props.name} />
        <Bio>{nl2br(this.props.bio)}</Bio>
        <SocialLinks>
          {social ? (
            Object.keys(social).map(function(key, index) {
              const link = social[key];
              return (
                <SocialLink href={link} key={key}>
                  <img
                    src={'/img/social/' + key.toLowerCase() + '.svg'}
                    alt={key}
                  />
                </SocialLink>
              );
            })
          ) : null}
        </SocialLinks>
      </Container>
    );
  }
}

export default Profile;
