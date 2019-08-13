// @flow
import React from 'react';
import { withPrefix, Link } from 'gatsby';
import styles from './Author.module.scss';

type Props = {
  author: {
    name: string,
    bio: string,
    photo: string
  },
  isIndex: ?boolean,
  isFixed: ?boolean
};

const Author = ({ author, isIndex, isFixed }: Props) => (
  <div className={[styles['author'], (isFixed ? styles['author__fixed'] : '')].join(' ').trim()}>
    {/*
    <Link to="/">
      <img
        src={withPrefix(author.photo)}
        className={styles['author__photo']}
        width="75"
        height="75"
        alt={author.name}
      />
    </Link>
    */}

    { isIndex ? (
      <h1 className={styles['author__title']}>
        <Link className={styles['author__title-link']} to="/">{author.name}</Link>
        {/*
            Normally this is {author.name} from config
            TODO: add a way to wrap the config text content like '!J!ohn!D!oe' to do said styling
        */}
      </h1>
    ) : (
      <h2 className={styles['author__title']}>
        <Link className={styles['author__title-link']} to="/">{author.name}</Link>
      </h2>
    )}
    <p className={styles['author__subtitle']}>{author.bio}</p>
  </div>
);

export default Author;
