import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Author from '../components/Sidebar/Author';
import Sidebar from '../components/Sidebar';
import GoodReads from '../components/GoodReads';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

/*
type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};
*/

const ReadingTemplate = ({ data }) => {
  /*
  data.books.edges.map((item, i) => {
    const bookAuthorIds = item.node.authors.map(author => author.id)
    item.node.authors["name"] = 
      data.authors.edges.filter(item => bookAuthorIds.some(id => id === item.node.id)).
        map(filteredAuthor => filteredAuthor.node.name).join(", ")
    return item
  });
  */
  data.shelves.edges.map(shelf => {
    shelf.node.reviews.map(shelfReview => {
        const review = data.reviews.edges.find(review => review.node.id === shelfReview.id)
        const bookInfo = data.books.edges.find(book => review.node.book.id === book.node.id)
        console.log("authors", bookInfo.node.authors);
        bookInfo.node["authorNames"] = 
          data.authors.edges
            .filter(author => bookInfo.node.authors.some(bookAuthor => bookAuthor.id === author.node.id))
              .map(author => author.node.name).join(", ")
        shelfReview["book"] = bookInfo
    })
  })
  const { title: siteTitle, subtitle: siteSubtitle, author } = useSiteMetadata();
  const { edges: bookEdges } = data.books
  const { edges: authorEdges } = data.authors;
  const { edges: shelfEdges } = data.shelves;
  // TODO: incorporate tumblr and instagram on the same page or make a different template for instagram
  // TODO: styling for author header as same margins as on Layout pages
  // TODO: also make the author header fixed maybe

  return (
    <Layout title={siteTitle} subtitle={siteSubtitle}>
      <Sidebar />
      <GoodReads bookEdges={bookEdges} authorEdges={authorEdges} shelfEdges={shelfEdges} />
    </Layout>
  );
};

export const query = graphql`
  query {
    books:
      allGoodreadsBook {
        edges {
          node {
            id, 
            isbn, 
            isbn13, 
            text_reviews_count, 
            uri, 
            title, 
            title_without_series, 
            image_url, 
            small_image_url, 
            large_image_url, 
            link, 
            num_pages, 
            format, 
            edition_information, 
            publisher, 
            publication_day, 
            publication_month, 
            publication_year, 
            average_rating, 
            ratings_count, 
            description,
            published,
            work {
              id
              uri
            }
            authors {
              id
              # author nodes here!
              # see author query for all fields
            }
            reviews {
              id
              # review nodes here!
              # see review query for all fields
            }
          }
        }
      },
    authors:
      allGoodreadsAuthor {
        edges {
          node {
            id
            name
            role
            image_url
            small_image_url
            link
            average_rating
            ratings_count
            text_reviews_count
            books {
              id
              # book nodes here!
              # see book query for all available fields
            }
          }
        }
      },
    shelves:
      allGoodreadsShelf {
        edges {
          node {
            id
            name
            exclusive
            review_shelf_id
            reviews {
              id
              # reviews nodes here!
              # see review query for all fields
            }
          }
        }
      },
    reviews:
      allGoodreadsReview {
        edges {
          node {
            id
            rating
            votes
            spoiler_flag
            spoilers_state
            recommended_by
            recommended_for
            started_at
            read_at
            date_added
            date_updated
            read_count
            body
            comments_count
            url
            link
            owned
            book {
              id
              # book node here!
              # see book query for all fields
            }
          }
        }
      }
  }
`

export default ReadingTemplate;
