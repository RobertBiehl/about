/**
 * React Static Boilerplate
 * Copyright (c) 2015-present Kriasoft. All rights reserved.
 */

/* @flow */

import React from 'react';
import Router from 'universal-router';
import { graphql } from 'relay-runtime';

// The list of all application routes where each route contains a URL path string (pattern),
// the list of components to load asynchronously (chunks), data requirements (GraphQL query),
// and a render() function which shapes the result to be passed into the top-level (App) component.
// For more information visit https://github.com/kriasoft/universal-router
const routes = [
  {
    path: '/',
    query: graphql`query routerHomeQuery {
      experienceList: getExperienceList { ...Experience_list }
      profile: getProfile { ...Profile_profile }
    }`, // prettier-ignore
    components: () => [import(/* webpackChunkName: 'home' */ './Home')],
    render: ([Home], data) => ({
      title: 'Home page',
      body: (
        <Home experienceList={data.experienceList} profile={data.profile} />
      ),
    }),
  },
  {
    path: '/cv',
    query: graphql`query routerAboutQuery {
      experienceList: getExperienceList { ...Experience_list }
      profile: getProfile {
        ...Profile_profile
        ...CVPage_profile
      }
    }`, // prettier-ignore
    components: () => [import('./CVPage')],
    render: ([CVPage], data) => ({
      title: 'Resume',
      body: (
        <CVPage experienceList={data.experienceList} profile={data.profile} />
      ),
    }),
  },
  {
    path: '/project/:id',
    query: graphql`query routerProjectQuery($id: ID!) {
      project: getProject(id: $id) { ...ProjectPage_project }
    }`, // prettier-ignore
    components: () => [import(/* webpackChunkName: 'home' */ './ProjectPage')],
    render: ([ProjectPage], data) => ({
      title:
        data.project && data.project.title
          ? 'Project: ' + data.project.title
          : data.title,
      body: <ProjectPage project={data.project} />,
    }),
  },
  {
    path: '/letter/:id',
    query: graphql`query routerLetterPageQuery($id: ID!) {
      experienceList: getExperienceList { ...Experience_list }
      profile: getProfile {
        ...LetterPage_profile
      }
      profile2: getProfile {
        ...CVPage_profile
      }
      documents: getDocuments {
        ...DocumentPage_document
      }
      projects: getProjects {
        ...ProjectPage_project
      }
      letter: getLetter(id: $id) { ...LetterPage_letter }
      skills: getSkills { ...LetterPage_skills }
    }`, // prettier-ignore
    components: () => [
      import('./LetterPage'),
      import('./CVPage'),
      import('./DocumentPage'),
      import('./ProjectPage'),
    ],
    render: ([LetterPage, CVPage, DocumentPage, ProjectPage], data) => ({
      body: (
        <div>
          <LetterPage
            profile={data.profile}
            letter={data.letter}
            skills={data.skills}
          />
          <CVPage
            experienceList={data.experienceList}
            profile={data.profile2}
          />
          {data.documents.map(d => <DocumentPage document={d} key={d.title} />)}
          {data.projects.map(p => <ProjectPage project={p} key={p.title} />)}
        </div>
      ),
    }),
  },
  {
    path: '/error',
    components: () => [import(/* webpackChunkName: 'main' */ './ErrorPage')],
    render: ([ErrorPage]) => ({
      title: 'Error',
      body: <ErrorPage />,
    }),
  },
  {
    path: '/tasks/:status(pending|completed)?',
    components: () => [import(/* webpackChunkName: 'home' */ './Home')],
    render: ([Home]) => ({
      title: 'Untitled Page',
      body: <Home />,
    }),
  },
];

function resolveRoute({ route, fetch, next }, params) {
  // Skip routes that have no .render() method
  if (!route.render) return next();

  // Shape the result to be passed into the top-level React component (App)
  return {
    params,
    query: route.query,
    variables:
      typeof route.variables === 'function'
        ? route.variables(params)
        : { ...params },
    components:
      typeof route.components === 'function'
        ? Promise.all(
            route.components().map(promise => promise.then(x => x.default)),
          ).then(components => (route.components = components))
        : route.components,
    render: route.render,
  };
}

export default new Router(routes, { resolveRoute });
