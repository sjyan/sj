// @flow
import React from 'react';
import { withPrefix, Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Tumblr.module.scss';
import Img from 'gatsby-image';

// TODO: query gatsby lazy-loading using absolute paths from tumblr query

type Props = {
  edges: Edges
};

const Tumblr = ({ edges }: Props) => (
  <div>
      <div className={styles['tumblr__grid']}>
        {
          edges.map((item, i) => (
            (item.node.type == 'photo' && item.node.localImage) ? (
              <div className={styles['tumblr__post']} key={i}>
                <a href={item.node.post_url}>
                  <Img fluid = {item.node.localImage.childImageSharp.fluid} />
                </a>
              </div>
            ) : (<div></div>)
          ))
        }
      </div>
  </div>
);

export default Tumblr;
