// @flow
import React from 'react';
import { withPrefix, Link } from 'gatsby';
import type { Edges } from '../../types';
// import styles from './GoodReads.module.scss';

type Props = {
  shelf: Edge
};

const ReadingList = ({ shelf }: Props) => (
  <div>
      { console.log("the shelf edges on render", shelf)}
      <ul>
      { shelf.node.reviews.map((review, i) => {
          if(review.book) {
            return (
              <div key={i}>
                <a href={review.book.node.link} target="__blank">{review.book.node.title}</a> 
                &nbsp;&mdash;&nbsp;
                {review.book.node.authorNames}
                {/* <div dangerouslySetInnerHTML={{ __html: review.book.node.description }} /> */}
              </div>
            )
          }
        })
      }
    </ul>
  </div>
);

export default ReadingList;