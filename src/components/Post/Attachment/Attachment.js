// @flow
import React, { Component } from 'react';
import Pagination from '../../Pagination'
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import styles from './Attachment.module.scss';

type Props = {
  body: string,
  title: string
};

const pdfPath = "https://stephenyan.com/song-popularity-display.pdf";
/*
const Attachment = ({ body, title }: Props) => (
  <React.Fragment>
  	{console.log("whats this react fragment", props)}
    <Document file={pdfPath}><Page pageNumber={pageNumber} /></Document>
    <div>
    	<p>Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</p>
    	<button type="button" disabled={pageNumber <= 1} onClick={this.previousPage}>Previous</button>
		<button type="button" disabled={pageNumber >= numPages} onClick={this.nextPage}>Next</button>
    </div>
  </React.Fragment>
);
*/

class Attachment extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
  }

  onDocumentLoadSuccess = (document) => {
    const { numPages } = document;
    this.setState({
      numPages,
      pageNumber: 1,
    });
  };

  changePage = offset => this.setState(prevState => ({
    pageNumber: prevState.pageNumber + offset,
  }));

  previousPage = () => this.changePage(-1);

  nextPage = () => this.changePage(1);

  render() {
    const { numPages, pageNumber } = this.state;
    console.log('this next page', this.nextPage);
    return(
      <React.Fragment>
        <Document file={pdfPath} onLoadSuccess={this.onDocumentLoadSuccess} className={styles['attachment__pdf']}>
          <Page pageNumber={pageNumber} scale={2.0} />
        </Document>
        <Pagination
          prevPagePath={pdfPath}
          nextPagePath={pdfPath}
          hasPrevPage={false}
          hasNextPage={true}
          nextAction={this.nextPage}
        />
        <div>
          <p>Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}</p>
          <button type="button" disabled={pageNumber <= 1} onClick={this.previousPage}>Previous</button>
        <button type="button" disabled={pageNumber >= numPages} onClick={this.nextPage}>Next</button>
        </div>
      </React.Fragment>
    )
  }
}


export default Attachment;