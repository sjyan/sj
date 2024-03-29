// @flow
import React from 'react';
import { Link } from 'gatsby';
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import Author from './Author';
import Comments from './Comments';
import Content from './Content';
import Meta from './Meta';
import Tags from './Tags';
import styles from './Post.module.scss';
import type { Node } from '../../types';

type Props = {
  post: Node
};

const path = require('path');

const Post = ({ post }: Props) => {
  const { html, fileAbsolutePath } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;
  const filename = path.basename(fileAbsolutePath, '.md');

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/writing">Writing</Link>

      <div className={styles['post__content']}>
        <Content body={html} title={title} file={filename} />
      </div>

      <div className={styles['post__footer']}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>

      <div className={styles['post__comments']}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
