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

type Props = {
  pageContext: PageContext
};

const ReadingTemplate = ({ data, pageContext }) => {
  // transform goodreads data
  const shelfNameMap =  {
    "to-read": "Reading",
    "currently-reading": "Currently Reading",
    "read": "Read"
  }
  console.log("reading-template data", data)
  /*
  data.shelves.edges.map(shelf => {
    shelf.node.name = shelfNameMap[shelf.node.name]
    shelf.node.reviews.map(shelfReview => {
        const review = data.reviews.edges.find(review => review.node.id === shelfReview.id)
        const bookInfo = data.books.edges.find(book => review.node.book.id === book.node.id)
        bookInfo.node["authorNames"] = 
          data.authors.edges
            .filter(author => bookInfo.node.authors.some(bookAuthor => bookAuthor.id === author.node.id))
              .map(author => author.node.name).join(", ")
        shelfReview["book"] = bookInfo
    })
  })
  */
  const { title: siteTitle, subtitle: siteSubtitle, author } = useSiteMetadata();
  /*
  const { edges: bookEdges } = data.books
  const { edges: authorEdges } = data.authors;
  */
  const { edges: shelfEdges } = data.shelves;
  // TODO: incorporate tumblr and instagram on the same page or make a different template for instagram
  // TODO: styling for author header as same margins as on Layout pages
  // TODO: also make the author header fixed maybe

  return (
    <Layout title={siteTitle} subtitle={siteSubtitle}>
      <Sidebar />
      <Page title={"GoodReads"}>
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
