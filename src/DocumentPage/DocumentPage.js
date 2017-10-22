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

import type { DocumentPage_document } from './__generated__/DocumentPage_document.graphql';

const DocumentContainer = styled.div``;

const Document = styled.div`
  @media print {
    page-break-after: always;

    & img {
      display: block;
      page-break-after: always;
    }
  }

  & img {
    width: 100%;
  }
`;

type Props = {
  document: ?any,
};

class DocumentPage extends React.Component<any, Props, any> {
  goBack = (event: MouseEvent) => {
    event.preventDefault();
    history.goBack();
  };

  render() {
    const doc = this.props.document;
    if (!doc) {
      return <div>No Document</div>;
    }

    const numDocs = doc.urls.length;
    let currentDocNumber = 0;
    return (
      <DocumentContainer>
        {doc.urls.map(url => (
          <Document>
            <h1>
              {doc.title}
              {numDocs > 1 ? ' ' + ++currentDocNumber : ''}
            </h1>
            <img key={url} src={url} alt={doc.title} />
          </Document>
        ))}
      </DocumentContainer>
    );
  }
}

export default createFragmentContainer(
  DocumentPage,
  graphql`
    fragment DocumentPage_document on Document {
      title
      urls
    }
  `,
);
