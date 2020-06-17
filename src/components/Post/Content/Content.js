// @flow
import React from 'react';
import Attachment from '../Attachment'
import styles from './Content.module.scss';
import { useSiteMetadata } from '../../../hooks';

type Props = {
  body: string,
  title: string,
  file: string
};

const Content = ({ body, title, file }: Props) => {
  const { awsBucketBase } = useSiteMetadata();
  return (
    <div className={styles['content']}>
      <h1 className={styles['content__title']}>{title}</h1>
      <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
      <Attachment file={`${awsBucketBase}/${file}.pdf`} />
    </div>
)};

export default Content;
