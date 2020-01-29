// @flow
import React from 'react';
import Attachment from '../Attachment'
import styles from './Content.module.scss';

type Props = {
  body: string,
  title: string
};

const pdfPath = "https://stephenyan.com/song-popularity-display.pdf";
const Content = ({ body, title }: Props) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />
    <Attachment className={styles['content__pdf']} />
  </div>
);

export default Content;
