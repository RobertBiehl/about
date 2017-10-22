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

import type { ProjectPage_project } from './__generated__/Project_project.graphql';

import LocalizedStrings from 'react-localization';
let strings = new LocalizedStrings({
  en: {
    keyAspects: 'Key Aspects',
    technologies: 'Technologies',
    references: 'References',
    links: 'Links',
    linkToVideo: 'Link to video',
  },
  de: {
    keyAspects: 'Kernaspekte',
    technologies: 'Technologien',
    references: 'Referenzen',
    links: 'Weitere Infos',
    linkToVideo: 'Link zum Video',
  },
});

const Project = styled.div`
  @media print {
    page-break-after: always;
  }

  & a .print-url {
    display: none;
  }

  @media print {
    & a {
      display: block;
      color: black;
      text-decoration: none;
    }
    & a .print-url:before {
      content: ':';
    }
    & a .print-url {
      display: inline;
    }
  }
`;

const Header = styled.div`
  display: flex;
  min-height: 400px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  & > h1 {
    text-align: center;
  }

  & > * {
    margin-bottom: 10px;
  }

  @media print {
    min-height: inherit;
    text-align: left;
    align-items: flex-start;
    & > h1 {
      text-align: left;
    }
    & > img {
      display: none;
    }
  }

  @media screen {
    &.with-header-bg {
      padding: 2em;
      color: #fff;
      position: relative;
      background-position: center center;
      -webkit-background-size: cover;
      -moz-background-size: cover;
      -o-background-size: cover;
      background-size: cover;
    }

    &.with-header-image > * {
      position: relative;
    }

    &.with-header-image:before {
      content: ' ';
      position: absolute;
      z-index: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
`;

const Aspects = styled.div`
  & h2 {
    @media print {
      display: none;
    }
  }
`;

const Technologies = styled.div``;

const MediaList = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media screen only (max-width: 600px) {
    display: block;
    flex-direction: column;
  }

  @media print {
    margin-right: -30mm;
  }
`;

const Media = styled.div`
  width: 33%;
  @media screen only (max-width: 600px) {
    width: 100%;
  }

  & p {
    margin-top: -10px;
    margin-left: 10px;
    border-left: 1px solid #999;
    padding: 10px;
    padding-bottom: 0;
    font-size: 0.8em;
    min-height: 20px;
  }

  & img,
  & video {
    max-width: 100%;
    padding: 0 10px;
    box-sizing: border-box;
    object-fit: cover;
  }

  @media print {
    & video {
      display: none;
    }
  }

  & .print-only {
    @media screen {
      display: none;
    }
  }
`;

const Links = styled.div`
  & > a {
    padding-right: 5px;
  }
`;

const References = styled.div`@media print {display: none;}`;

type Props = {
  project: ?any,
};

class ProjectPage extends React.Component<any, Props, any> {
  goBack = (event: MouseEvent) => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    const project = this.props.project;
    if (!project) {
      return <div>No Project</div>;
    }

    return (
      <Project>
        <Header
          className={
            (project.header ? 'with-header-image ' : '') +
            (this.styleForProject(project) ? 'with-header-bg' : '')
          }
          style={this.styleForProject(project)}
        >
          <img src={project.logo} title={project.title} />
          <h1>{project.title}</h1>
          <span>
            {project.dateStart} — {project.dateEnd}
          </span>
          <p>{nl2br(project.description)}</p>
        </Header>

        <Aspects>
          <h2>{strings.keyAspects}</h2>
          <ul>{project.aspects.map(item => <li>{item}</li>)}</ul>
        </Aspects>

        <MediaList>
          {project.media ? (
            project.media.map(media => (
              <Media>
                {media.type == 'video' ? (
                  <video controls loop playsInline poster={media.url}>
                    {media.urls ? (
                      media.urls.map(link => (
                        <source src={link.url} type={link.title} />
                      ))
                    ) : null}
                  </video>
                ) : null}
                <img
                  className={media.type == 'video' ? 'print-only' : null}
                  src={media.url}
                  alt={media.description}
                  title={media.description}
                />
                <p>
                  {media.description}
                  {media.shortLink ? (
                    <a href={media.shortLink.url} className={'print-only'}>
                      {strings.linkToVideo}: {media.shortLink.url}
                    </a>
                  ) : null}
                </p>
              </Media>
            ))
          ) : null}
        </MediaList>

        {project.technologies ? (
          <Technologies>
            <h2>{strings.technologies}</h2>
            <ul>
              {project.technologies.map(({ title, items }) => (
                <li>
                  {title}
                  <ul>{items ? items.map(item => <li>{item}</li>) : null}</ul>
                </li>
              ))}
            </ul>
          </Technologies>
        ) : null}

        <div dangerouslySetInnerHTML={{ __html: project.body }} />

        {project.references ? (
          <References>
            <h2>{strings.references}</h2>
            {project.references.map(({ title, url }) => (
              <a href={url} title={title}>
                {title}
              </a>
            ))}
          </References>
        ) : null}

        {project.links ? (
          <Links>
            <h2>{strings.links}</h2>
            <ul>
              {project.links.map(({ title, url }) => (
                <li>
                  <a href={url} title={title}>
                    {title}
                    <span className={'print-url'}> {url}</span>
                  </a>
                </li>
              ))}
            </ul>
          </Links>
        ) : null}
      </Project>
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

export default createFragmentContainer(
  ProjectPage,
  graphql`
    fragment ProjectPage_project on Project {
      title
      description
      logo
      dateStart
      dateEnd
      aspects
      media {
        type
        url
        urls {
          title
          url
        }
        description
        shortLink {
          title
          url
        }
      }
      technologies {
        title
        items
      }
      references {
        title
        url
      }
      links {
        title
        url
      }
      header
      headerColor1
      headerColor2
    }
  `,
);
