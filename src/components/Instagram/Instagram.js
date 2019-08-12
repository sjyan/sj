// @flow
import React from 'react';
// import moment from 'moment';
import { withPrefix, Link } from 'gatsby';
import type { Edges } from '../../types';
import Image from 'gatsby-image';
import styles from './Instagram.module.scss';
// import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

const Instagram = ({ edges }: Props) => (
  <div>
    <div className={styles['insta__grid']}>
        {
          edges.map((item, i) => (
            item.node.localFile ? (
              <div className={styles['insta__post']} key={i}>
                <Image
                  fixed={item.node.localFile.childImageSharp.fixed}
                />
              </div>
            ) : (<div></div>)
          ))
        }
    </div>
  </div>
);

export default Instagram;
