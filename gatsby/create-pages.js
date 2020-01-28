'use strict';

const path = require('path');
const _ = require('lodash');
const createCategoriesPages = require('./pagination/create-categories-pages.js');
const createTagsPages = require('./pagination/create-tags-pages.js');
const createPostsPages = require('./pagination/create-posts-pages.js');
const createBooksPages = require('./pagination/create-books-pages.js');

const createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 404
  createPage({
    path: '/404',
    component: path.resolve('./src/templates/not-found-template.js')
  });

  // Tags list
  createPage({
    path: '/tags',
    component: path.resolve('./src/templates/tags-list-template.js')
  });

  // Categories list
  createPage({
    path: '/categories',
    component: path.resolve('./src/templates/categories-list-template.js')
  });

  // Tubmlr feed
  createPage({
    path: '/atelier',
    component: path.resolve('./src/templates/atelier-template.js')
  })

  // GoodReads Page
  createPage({
    path: '/reading',
    component: path.resolve('./src/templates/reading-template.js')
  })

  // Posts and pages from markdown
  const result = await graphql(`
    {
      allMarkdownRemark(
        filter: { frontmatter: { draft: { ne: true } } }
      ) {
        edges {
          node {
            frontmatter {
              template
            }
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  const shelvesResult = await graphql(`
    {
      allGoodreadsShelf {
        edges {
          node {
            name,
            id
          }
        }
      }
    }
  `)

  const { edges } = result.data.allMarkdownRemark;
  const shelves = shelvesResult.data.allGoodreadsShelf;

  _.each(shelves.edges, (shelf) => {
      createPage({
        path: `/${shelf.node.name}`,
        component: path.resolve('./src/templates/books-template.js'),
        context: { name: shelf.node.name, id: shelf.node.id }
      });
  })

  _.each(edges, (edge) => {
    
    // Custom home page with frontmatter denoted as home
    if (_.get(edge, 'node.frontmatter.template') === 'home') {
      createPage({
        path: '/',
        component: path.resolve('./src/templates/page-template.js'),
	      context: { slug: edge.node.fields.slug }
      });
    } else if (_.get(edge, 'node.frontmatter.template') === 'page') {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/page-template.js'),
        context: { slug: edge.node.fields.slug }
      });
    } else if (_.get(edge, 'node.frontmatter.template') === 'post') {
      createPage({
        path: edge.node.fields.slug,
        component: path.resolve('./src/templates/post-template.js'),
        context: { slug: edge.node.fields.slug }
      });
    }
  });

  // Feeds
  await createTagsPages(graphql, actions);
  await createCategoriesPages(graphql, actions);
  await createPostsPages(graphql, actions);
  await createBooksPages(graphql, actions);
};


module.exports = createPages;
