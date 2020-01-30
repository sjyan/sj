// @flow
import React, { Component } from 'react';
import Pagination from '../../Pagination'
import { Document, Page } from 'react-pdf/dist/entry.webpack';
import styles from './Attachment.module.scss';

type Props = {
  body: string,
  title: string,
  file: string
};

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
  constructor(props : Props) {
    super(props);
    this.path = props.file;
    this.changePage = this.changePage.bind(this);
  }

  documentWidth = 1000;

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

  previousPage = e => { 
    e.preventDefault();
    if(this.hasPrevPage()) this.changePage(-1) 
  };

  nextPage = e => { 
    e.preventDefault();
    if(this.hasNextPage()) this.changePage(1) 
  };

  hasNextPage = () => this.state.pageNumber < this.state.numPages;
  hasPrevPage = () => this.state.pageNumber > 1;

  render() {
    const { numPages, pageNumber } = this.state;
    console.log('this.hasPrevPage', this.hasPrevPage());
    return(
      <React.Fragment>
        <div className={styles['attachment']}>
          <Pagination
            hasPrevPage={this.hasPrevPage()}
            hasNextPage={this.hasNextPage()}
            prevAction={this.previousPage}
            nextAction={this.nextPage}
            pageState={this.state}
          />
          { console.log('whats the file path', this.path) }
          <Document file={this.path} onLoadSuccess={this.onDocumentLoadSuccess} className={styles['attachment__pdf']}>
            <Page pageNumber={pageNumber} width={this.documentWidth} />
          </Document>
        <Pagination
            hasPrevPage={this.hasPrevPage()}
            hasNextPage={this.hasNextPage()}
            prevAction={this.previousPage}
            nextAction={this.nextPage}
            pageState={this.state}
          />
        </div>
      </React.Fragment>
    )
  }
}


export default Attachment;