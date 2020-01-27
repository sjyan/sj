// @flow
import React from 'react';
import { withPrefix, Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './Tumblr.module.scss';

// TODO: query gatsby lazy-loading using absolute paths from tumblr query

type Props = {
  edges: Edges
};

const Tumblr = ({ edges }: Props) => (
  <div>
    { console.log("what them tumblr nodes look like", edges) }
      <div className={styles['tumblr__grid']}>
        {
          edges.map((item, i) => (
            (item.node.type == 'photo' && item.node.photos[0]) ? (
              <div className={styles['tumblr__grid']} key={i}>
                <a href={item.node.post_url}>
                  <img src={item.node.photos[0].original_size.url} />
                </a>
              </div>
            ) : (<div></div>)
          ))
        }
      </div>
  </div>
);

export default Tumblr;
