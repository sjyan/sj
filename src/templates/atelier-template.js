import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Author from '../components/Sidebar/Author';
import Sidebar from '../components/Sidebar';
import Instagram from '../components/Instagram';
import Tumblr from '../components/Tumblr';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

/*
type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};
*/

const AtelierTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle, author } = useSiteMetadata();
  const { edges } = data.tumblr;
  // TODO: incorporate tumblr and instagram on the same page or make a different template for instagram
  // TODO: styling for author header as same margins as on Layout pages
  // TODO: also make the author header fixed maybe

  return (
    <Layout title={siteTitle} subtitle={siteSubtitle}>
      <Sidebar />
      <Tumblr edges={edges} />
    </Layout>
  );
};

export const query = graphql`
  query {
    instagram:
      allInstaNode {
        edges {
          node {
            id
            likes
            mediaType
            preview
            original
            timestamp
            caption
            localFile {
              childImageSharp {
                fixed(width: 300, height: 300) {
                  ...GatsbyImageSharpFixed
                }
              }
            }
            # Only available with the public api scraper
            thumbnails {
              src
              config_width
              config_height
            }
            dimensions {
              height
              width
            }
          }
        }
    }
    tumblr:
      allTumblrPost {
        edges {
          node {
            type
            post_url
            photos {
              original_size {
                url
              }
            }
          }
        }
      }
  }
`;

export default AtelierTemplate;
