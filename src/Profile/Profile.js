/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';

import styled from 'styled-components';
import nl2br from 'react-nl2br';

import { graphql, createFragmentContainer } from 'react-relay';

import type { Profile_profile } from './__generated__/Profile_profile.graphql';

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
  profile: ?Profile_profile,
};

type State = {};

class Profile extends React.Component<any, Props, State> {
  render() {
    const profile = this.props.profile || {};
    const social = profile.social;
    return (
      <Container {...this.props}>
        <ProfileImage src={profile.image} alt={profile.name} />
        <Bio>{nl2br(profile.bio)}</Bio>
        <SocialLinks>
          {social ? (
            social.map(({ title, url }) => {
              return (
                <SocialLink href={url} key={title}>
                  <img
                    src={'/img/social/' + title.toLowerCase() + '.svg'}
                    alt={title}
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

export default createFragmentContainer(
  Profile,
  // This `_list` fragment name suffix corresponds to the prop named `list` that
  // is expected to be populated with server data by the `<TodoList>` component.
  graphql`
    fragment Profile_profile on Profile {
      name
      image
      bio
      social {
        title
        url
      }
    }
  `,
);
