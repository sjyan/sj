import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Instagram from '../components/Instagram';
import { useSiteMetadata } from '../hooks';
import type { MarkdownRemark } from '../types';

/*
type Props = {
  data: {
    markdownRemark: MarkdownRemark
  }
};
*/

const InstagramTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const postTitle = "post title";
  const metaDescription = "some instagram shit";
  const { edges } = data.allInstaNode;

  return (
    <Layout title={postTitle} description={metaDescription}>
      <Instagram edges={edges} />
    </Layout>
  );
};

export const query = graphql`
  query Instagram {
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
                fixed(width: 150, height: 150) {
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
    }

`;

export default InstagramTemplate;
