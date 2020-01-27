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

const GoodReads = ({ bookEdges, authorEdges, shelfEdges }: Props) => (
  <div>
      { console.log("bookEdges", bookEdges)}
      {/* shelf.node.name */}
      {/* authorEdges.filter(item => item.node.authors.map(author => author.id).some(id => item.node.id)).split(', ') */}
      {
        shelfEdges.map((shelf, key) => {
          return (
            <div>
              <h3>{shelf.node.name}</h3>
              { shelf.node.reviews.map(review => 
                <div>
                  <a href={review.book.node.link} target="__blank">{review.book.node.title}</a> 
                  &nbsp;&mdash;&nbsp;
                  {review.book.node.authorNames}
                  {/* <div dangerouslySetInnerHTML={{ __html: review.book.node.description }} /> */}
                </div>) 
              }
            </div>
          )
        })
      }
  </div>
);

export default GoodReads;
