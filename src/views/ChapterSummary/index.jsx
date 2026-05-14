import React, { useState, useEffect } from "react";
import style from "./index.module.scss";

import clsx from "clsx";
import ReactCardFlip from "react-card-flip";
import { Eye } from "react-feather";

import CourseContentFooter from "views/CourseLearning/active-content/content-footer/CourseContentFooter";
import useChapterSummary from "./useChapterSummary";

import { splitArrChunks } from "utils/helper";

export default function ChapterSummary({ chapter, summary }) {
  const { _FlipSpeed, summaryCards, handleClickCard } = useChapterSummary({
    chapter,
    summary,
  });

  const [summaryCardChunks, setSummaryCardChunks] = useState([]);

  function appendCard() {
    const splitChunks = splitArrChunks(summaryCards, 3);

    if (!splitChunks) return;
    if (splitChunks.length === 0) return;

    let toUpdate = [...splitChunks];

    let lastIndex = splitChunks.length - 1;
    if (splitChunks[lastIndex].length < 3) {
      for (let i = 0; i <= 3 - splitChunks[lastIndex].length; i++) {
        toUpdate[lastIndex].push({
          ...splitChunks[lastIndex][0],
          uid: `${splitChunks[lastIndex][0].uid}_${i}`,
          type: null,
        });
      }
    }

    setSummaryCardChunks(toUpdate);
  }

  useEffect(appendCard, [summaryCards]);

  return (
    <div className={style.wrapper}>
      <div className={style.cards}>
        {summaryCardChunks.map((cardRow, indexRow) => (
          <section key={indexRow}>
            {cardRow.map((card, indexCard) => (
              <ReactCardFlip
                containerClassName={clsx(style.card, card.type === null && style.hidden)}
                key={card.uid}
                isFlipped={card.isOpen}
                flipSpeedBackToFront={_FlipSpeed}
                flipSpeedFrontToBack={_FlipSpeed}
              >
                <div
                  className={style.front}
                  onClick={handleClickCard.bind(this, card.uid, "front")}
                >
                  <footer>Click to view definition</footer>
                  <div className={style.title} style={{ color: card.color }}>
                    {card.title}
                  </div>
                </div>
                <div
                  className={style.back}
                  onClick={handleClickCard.bind(this, card.uid, "back")}
                >
                  <header style={{ color: card.color }}>{card.title}</header>
                  {card.description}

                  <span style={{ color: card.color }}>
                    <Eye size={15} /> {card.views}
                  </span>
                </div>
              </ReactCardFlip>
            ))}
          </section>
        ))}

        {/* <footer className={style.pageFooter}> */}
        <CourseContentFooter theme="light" />
        {/* </footer> */}
      </div>
    </div>
  );
}
