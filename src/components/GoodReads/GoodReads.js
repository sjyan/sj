// @flow
import React from 'react';
import { withPrefix, Link } from 'gatsby';
import type { Edges } from '../../types';
import styles from './GoodReads.module.scss';

type Props = {
  bookEdges: Edges,
  authorEdges: Edges,
  shelfEdges: Edges
};

const GoodReads = ({ shelfEdges }: Props) => (
  <div className={styles['goodReads']}>
      {
        shelfEdges.map((shelf, i) => 
          <Link to={shelf.node.name}><h2>{shelf.node.displayName}</h2></Link>
        )
      }
  </div>
);

export default GoodReads;
