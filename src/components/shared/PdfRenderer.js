import React, { useState } from "react";
import styles from "./PdfRenderer.module.scss";

import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export default function PdfRenderer({ data, local = false }) {
  const [arrayPages, setArrayPages] = useState([]);

  function onDocumentLoadSuccess({ numPages }) {
    let arr = [];
    for (let i = 0; i < numPages; i++) {
      arr.push(i + 1);
    }
    setArrayPages(arr);

    window.setTimeout(() => {
      let canvas = document.getElementsByClassName("react-pdf__Page__canvas");
      if (canvas.length) {
        /* forEach dont work */
        for (let j = 0; j < canvas.length; j++) {
          let c = canvas[j];
          c.oncontextmenu = (e) => {
            e.preventDefault();
            e.stopPropagation();
          };
        }
      }
    }, 1000);
  }

  return (
    <div className={styles.wrapper}>
      {data && (
        <Document
          file={local ? data : `data:application/pdf;base64,${data}`}
          onLoadError={(err) => {
            console.log(err);
          }}
          onLoadSuccess={onDocumentLoadSuccess}
          render="canvas"
        >
          {arrayPages.map((item, index) => (
            <Page key={`key_${index}`} pageNumber={item} />
          ))}
        </Document>
      )}
    </div>
  );
}
