'use strict';

const path = require('path');
const siteConfig = require('../../config.js');
const _ = require('lodash');

module.exports = async (graphql, actions) => {
  const { createPage } = actions;

  const result = await graphql(`
    {
      allGoodreadsShelf {
        edges {
          node {
            name
            id
            reviews {
              book {
                id
              }
            }
          }
        }
      }
    }
  `);

  const shelves = result.data.allGoodreadsShelf;
  const { booksPerPage } = siteConfig;

  _.each(shelves.edges, (edge) => {
      const bookCount = edge.node.reviews.filter(review => review.book).length
      const numPages = Math.ceil(bookCount / booksPerPage)
      const listSlug = `/${edge.node.name}`

      for (let i = 0; i < numPages; i += 1) {
        createPage({
          path: i === 0 ? listSlug : `${listSlug}/page/${i}`,
          component: path.resolve('./src/templates/books-template.js'),
          context: {
            id: edge.node.id,
            name: edge.node.name, 
            currentPage: i,
            booksLimit: booksPerPage,
            booksOffset: i * booksPerPage,
            prevPagePath: i <= 1 ? listSlug : `${listSlug}/page/${i - 1}`,
            nextPagePath: `${listSlug}/page/${i + 1}`,
            hasPrevPage: i !== 0,
            hasNextPage: i !== numPages - 1
          }
        });
      }
  })
};
