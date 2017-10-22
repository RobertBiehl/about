/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import styled from 'styled-components';
import nl2br from 'react-nl2br';

import history from '../history';
import Link from '../Link';
import { graphql, createFragmentContainer } from 'react-relay';

import type { LetterPage_profile } from './__generated__/LetterPage_profile.graphql';
import type { LetterPage_letter } from './__generated__/LetterPage_letter.graphql';
import type { LetterPage_skills } from './__generated__/LetterPage_skills.graphql';

import LocalizedStrings from 'react-localization';
let strings = new LocalizedStrings({
  en: {
    attachments: 'Attachments',
    coverLetter: 'Cover letter',
    skills: 'Technologies and skills',
    resume: 'Resume',
    diplomaCertificate: 'Diploma certificiate',
    bestThesisAward: 'Best thesis award',
    universityPerformanceOverview: 'University performance overview',
    certificatesOfEmployment: 'Certificates of employment',
    portfolio: 'Portfolio',
  },
  de: {
    attachments: 'Anlagen',
    coverLetter: 'Bewerbungsschreiben',
    skills: 'Vertraute Technologien und Fähigkeiten',
    resume: 'Lebenslauf',
    diplomaCertificate: 'Diplomzeugnis',
    bestThesisAward: 'Best Thesis Award',
    universityPerformanceOverview: 'Diplom Leistungsübersicht',
    certificatesOfEmployment: 'Arbeitszeugnisse',
    portfolio: 'Portfolio',
  },
});

const Cover = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  @media print {
    position: relative;
    width: 100%;
    height: 250mm; /* 297mm; */
    page-break-after: always;
  }

  & .profile-image {
    width: 100px;
    height: 100px;
    border-radius: 50px;
    margin-left: 10px;

    &:first-child {
      margin-left: 0;
    }
  }

  & .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    align-items: flex-start;

    & h1 {
      margin-bottom: 0;
      padding-bottom: 0;
    }
    & h2 {
      margin: 0;
      padding: 0;
    }
  }

  & .footer {
    color: #999;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    align-self: stretch;

    & a,
    & a:visited {
      color: #999;
    }

    & h1,
    & h2,
    & h3 {
      margin-bottom: 0;
      padding-bottom: 0;
    }

    @media print {
      margin-right: -20mm;
    }
  }

  & .sender-address {
    flex: 1;
  }

  & .attachments {
    flex: 1;
    & h3 {
    }
    & ul {
      margin-top: 0;
      margin-left: 0;
      padding-left: 0;
      list-style-position: inside;
    }
  }
`;

const Letter = styled.div`
  @media print {
    page-break-after: always;
  }

  & a,
  & a:visited {
    color: #000;
    text-decoration: none;
  }
`;

const Address = styled.div`
  min-height: 200px;

  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

const Subject = styled.div`font-weight: 600;`;

const Body = styled.div`@media print {margin-right: -20mm;}`;

const Skills = styled.div`@media print {page-break-after: always;}`;

type Props = {
  profile: ?any,
};

class LetterPage extends React.Component<any, Props, any> {
  goBack = (event: MouseEvent) => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    const profile = this.props.profile || {};
    const address = profile.address || {};
    const letter = this.props.letter || {};
    const skills = this.props.skills;

    document.title = 'Letter ' + letter.jobName;

    return (
      <div>
        <Cover>
          <div>
            <img className="profile-image" src={profile.image} />
          </div>
          <div className="content">
            <div>
              <h1>{letter.coverTitle}</h1>
              <h2>{letter.coverSubtitle}</h2>
            </div>
          </div>
          <div className="footer">
            {/*
            <div className="sender-address">
              <h1 className="name">{profile.name}</h1>
              <span className="streetAddress">{address.streetAddress}</span><br />
              <span className="postalCode">{address.postalCode} {address.city}</span><br />
              <span className="phone">{address.phone}</span><br />
              <a href={'mailto:'+address.email} className="email">{address.email}</a><br />
              <a href={address.link.url} className="link">{address.link.title}</a><br />
            </div>
            */}
            <div className="attachments">
              <h3>{strings.attachments}</h3>
              <ul>
                <li>{strings.coverLetter}</li>
                <li>{strings.skills}</li>
                <li>{strings.resume}</li>
                <li>{strings.diplomaCertificate}</li>
                <li>{strings.bestThesisAward}</li>
                <li>{strings.universityPerformanceOverview}</li>
                <li>{strings.portfolio}</li>
              </ul>
            </div>
          </div>
        </Cover>
        <Letter>
          {letter.address ? (
            <Address>
              <span>{letter.address.company}</span>
              <span>{letter.address.name}</span>
              <span>{letter.address.streetAddress}</span>
              <span>
                {letter.address.postalCode} {letter.address.city}
              </span>
            </Address>
          ) : null}
          <Subject>{letter.subject}</Subject>
          <Body>
            <div dangerouslySetInnerHTML={{ __html: letter.html }} />
          </Body>
        </Letter>
        {skills ? (
          <Skills>
            <h1>{strings.skills}</h1>
            <div dangerouslySetInnerHTML={{ __html: skills.html }} />
            {skills.skills.map(skill => (
              <div>
                <h3>{skill.title}</h3>
                {skill.description ? <p>{skill.description}</p> : null}
                <ul>
                  {skill.items ? (
                    skill.items.map(item => <li>{item}</li>)
                  ) : null}
                </ul>
              </div>
            ))}
          </Skills>
        ) : null}
      </div>
    );
  }

  styleForProject(project) {
    console.log(project.headerColor1);
    console.log(project.headerColor2);

    if (project.headerColor1 && project.headerColor2) {
      return {
        background:
          'linear-gradient(157deg, ' +
          project.headerColor1 +
          ' 0%,' +
          project.headerColor2 +
          ' 100%)',
      };
    } else if (project.header) {
      return {
        background: project.header ? 'url(' + project.header + ')' : null,
      };
    }
    return null;
  }
}

export default createFragmentContainer(
  LetterPage,
  graphql`
    fragment LetterPage_profile on Profile {
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
      address {
        streetAddress
        city
        postalCode
        email
        link {
          title
          url
        }
      }
    }

    fragment LetterPage_letter on Letter {
      address {
        streetAddress
        city
        postalCode
        email
        link {
          title
          url
        }
      }
      jobId
      jobName
      coverTitle
      coverSubtitle
      subject
      html
    }

    fragment LetterPage_skills on Skills {
      skills {
        title
        description
        items
      }
      html
    }
  `,
);
