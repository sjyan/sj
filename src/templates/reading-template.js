import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Author from '../components/Sidebar/Author';
import Sidebar from '../components/Sidebar';
import GoodReads from '../components/GoodReads';
import Page from '../components/Page';
import Pagination from '../components/Pagination';
import { useSiteMetadata } from '../hooks';
import type { PageContext, MarkdownRemark } from '../types';
import { SHELVES } from '../constants';

type Props = {
  pageContext: PageContext
};

const ReadingTemplate = ({ data, pageContext }) => {
  console.log("page context", pageContext)

  data.shelves.edges.map(shelf => shelf.node.displayName = SHELVES[shelf.node.name])
  const { title: siteTitle, subtitle: siteSubtitle, author } = useSiteMetadata();
  const { title: readingListTitle } = pageContext
  const { edges: shelfEdges } = data.shelves;
  return (
    <Layout title={siteTitle} subtitle={siteSubtitle}>
      <Sidebar />
      <Page title={readingListTitle}>
        <GoodReads shelfEdges={shelfEdges} />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query {
      shelves: allGoodreadsShelf {
        edges {
          node {
            name
          }
        }
      }
  }
`

export default ReadingTemplate;
