// @flow
import React from 'react';
// import moment from 'moment';
import { Link } from 'gatsby';
import type { Edges } from '../../types';
import Image from 'gatsby-image';
// import styles from './Feed.module.scss';

type Props = {
  edges: Edges
};

const Instagram = ({ edges }: Props) => (
  <div>
      {
        edges.map((item, i) => (
          item.node.localFile ? (
            <div key={i}>
              <Image
                fixed={item.node.localFile.childImageSharp.fixed}
              />
            </div>
          ) : (<div></div>)
        ))
      }
  </div>
);

export default Instagram;
