import React, { Component } from "react";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

class MyApp extends Component {
  state = {
    numPages: null,
    pageNumber: 1,
    pdfLink:
      "http://collegeshala-notes.s3.ap-south-1.amazonaws.com/03d872be-4d15-4543-b943-342258f08ea2.pdf",
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  onDocumentLoadFailure = (err) => console.error(err);

  onNext = (event) => {
    event.preventDefault();
    const { pageNumber, numPages } = this.state;
    if (pageNumber < numPages) {
      this.setState({ pageNumber: pageNumber + 1 });
    }
  };

  onPrevious = (event) => {
    event.preventDefault();
    const { pageNumber } = this.state;
    if (pageNumber > 1) {
      this.setState({ pageNumber: pageNumber - 1 });
    }
  };

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <button onClick={this.onNext}>Next</button>{" "}
        <button onClick={this.onPrevious}>Previous</button>
        <Document
          file={this.state.pdfLink}
          onLoadSuccess={this.onDocumentLoadSuccess.bind(this)}
          onLoadError={this.onDocumentLoadFailure}
          onItemClick={() => this.setState({ pageNumber: 4 })}
          loading={<div>Please wait!</div>}
        >
          <Page scale={2} pageNumber={pageNumber} />
        </Document>
        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}

export default MyApp;
