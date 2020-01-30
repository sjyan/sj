// @flow
import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'gatsby';
import { PAGINATION } from '../../constants';
import styles from './Pagination.module.scss';

type Props = {
  prevPagePath: string,
  nextPagePath: string,
  hasNextPage: boolean,
  hasPrevPage: boolean,
  previousAction: function,
  nextAction: function,
  pageState: object
};

const cx = classNames.bind(styles);

const Pagination = ({
  prevPagePath,
  nextPagePath,
  hasNextPage,
  hasPrevPage,
  prevAction,
  nextAction,
  pageState
}: Props) => {
  const prevClassName = cx({
    'pagination__prev-link': true,
    'pagination__prev-link--disable': !hasPrevPage
  });

  const nextClassName = cx({
    'pagination__next-link': true,
    'pagination__next-link--disable': !hasNextPage
  });

  return (
    <div className={styles['pagination']}>
      <div className={styles['pagination__prev']}>
        { prevAction && prevAction instanceof Function ? 
          (<a rel="prev" className={prevClassName} onClick={prevAction}>{PAGINATION.PREV_PAGE}</a>) : 
          (<Link rel="prev" to={hasPrevPage ? prevPagePath : '/'} className={prevClassName}>{PAGINATION.PREV_PAGE}</Link>)
        }
      </div>
      <div className={styles['pagination__state']}>
        { pageState ? (<p>Page {pageState.pageNumber} of {pageState.numPages}</p>) : null }
      </div>
      <div className={styles['pagination__next']}>
        { nextAction && nextAction instanceof Function ? 
          (<a rel="next" className={nextClassName} onClick={nextAction}>{PAGINATION.NEXT_PAGE}</a>) : 
          (<Link rel="next" to={hasNextPage ? nextPagePath : '/'} className={nextClassName}>{PAGINATION.NEXT_PAGE}</Link>)
        }
      </div>
    </div>
  );
};

export default Pagination;
