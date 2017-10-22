/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import { graphql, createFragmentContainer } from 'react-relay';
import type { CVPage_profile } from './__generated__/CVPage_profile.graphql';

import Home from '../Home';
import Profile from '../Profile';
import Projects from '../Projects';
import Experience from '../Experience';

import LocalizedStrings from 'react-localization';
let strings = new LocalizedStrings({
  en: {
    resume: 'Resume',
    personalInfo: 'Personal Info',
    experience: 'Experience',
    dateOfBirth: 'Date of Birth',
    placeOfBirth: 'Place of Birth',
    nationality: 'Nationality',
    maritalStatus: 'Marital Status',
    languages: 'Languages',
  },
  de: {
    resume: 'Lebenslauf',
    personalInfo: 'Persönliche Daten',
    experience: 'Erfahrung',
    dateOfBirth: 'Geburtsdatum',
    placeOfBirth: 'Geburtsort',
    nationality: 'Staatsangehörigkeit',
    maritalStatus: 'Familienstand',
    languages: 'Sprachen',
  },
});

const CV = styled.div`
  @media print {
    page-break-after: always;
    margin-right: -30mm;
  }
`;

const Container = styled.div`margin-bottom: 40px;`;

const CVProfile = styled(Profile)`@media print {display: none;}`;
const Data = styled.dl`
  & div {
    display: flex;
    flex-direction: row;
  }

  & dt {
    margin: 0;
    margin-bottom: 10px;
    flex: 1;
    display: flex;
  }

  & dd {
    margin: 0;
    flex: 4;
    display: flex;
  }
`;

class CVPage extends Home {
  render() {
    const profile = this.props.profile || {};
    return (
      <CV>
        <h1>{strings.resume}</h1>
        <CVProfile profile={profile} className={'no-print'} />

        <Container>
          <h2>{strings.personalInfo}</h2>
          <Data>
            <div>
              <dt>{strings.dateOfBirth}&nbsp;</dt>
              <dd>{profile.dateOfBirth}</dd>
            </div>
            <div>
              <dt>{strings.placeOfBirth}&nbsp;</dt>
              <dd>{profile.placeOfBirth}</dd>
            </div>
            <div>
              <dt>{strings.maritalStatus}&nbsp;</dt>
              <dd>{profile.maritalStatus}</dd>
            </div>
            <div>
              <dt>{strings.nationality}&nbsp;</dt>
              <dd>{profile.nationality}</dd>
            </div>
            <div>
              <dt>{strings.languages}&nbsp;</dt>
              <dd>{profile.languages ? profile.languages.join(', ') : null}</dd>
            </div>
          </Data>
        </Container>
        <Container>
          <h2>{strings.experience}</h2>
          <Experience list={this.props.experienceList} />
        </Container>
      </CV>
    );
  }
}

export default createFragmentContainer(
  CVPage,
  graphql`
    fragment CVPage_profile on Profile {
      name
      image
      bio
      social {
        title
        url
      }
      dateOfBirth
      placeOfBirth
      nationality
      maritalStatus
      languages
    }
  `,
);
