import React from "react";
import style from "./TpoAgenda.module.scss";

import INVITATIONPDF from "assets/INVITATION-CDP-2024.pdf";
import LOGO from "assets/images/landing/home/RazorHireLogo.png";

import PdfRenderer from "components/shared/PdfRenderer";

export default function TpoAgenda() {
  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <img src={LOGO} alt="logo" />
        <div className={style.btns}>
          <button>
            <a href="/" target="_blank">
              CCC
            </a>
          </button>
          <button>
            <a href="https://razorhire.ai/" target="_blank" rel="noreferrer">
              RazorHire
            </a>
          </button>
        </div>
      </div>
      <PdfRenderer data={INVITATIONPDF} local={true} />
    </div>
  );
}
