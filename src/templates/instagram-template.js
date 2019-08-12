import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import Author from '../components/Sidebar/Author'
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
  const { title: siteTitle, subtitle: siteSubtitle, author } = useSiteMetadata();
  const { edges } = data.allInstaNode;

  return (
    <Layout title={siteTitle} subtitle={siteSubtitle}>
      <Author author={author}/>
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
    }

`;

export default InstagramTemplate;
