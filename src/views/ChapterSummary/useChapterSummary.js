import { useEffect, useState } from "react";
import produce from "immer";

import useGetAllocatedCourse from "hooks/useGetAllocatedCourse";
import { putRequest } from "utils/api";

let timeout = null;
let timeoutFlipping = null;
const _Colors = ["#6a2c70", "#EA522F", "#1176ae", "#34a853", "#685BDC", "#E85FB4"];
const _FlipSpeed = 1;

export default function useChapterSummary({ chapter, summary }) {
  const { allocatedCourse, isLoading } = useGetAllocatedCourse();

  const [isFlipping, setIsFlipping] = useState(false);
  const [summaryCards, setSummaryCards] = useState([]);

  function handleClickCard(id, side) {
    if (isFlipping) return;

    setIsFlipping(true);
    timeoutFlipping = timeoutFlipping = window.setTimeout(() => {
      setIsFlipping(false);
    }, _FlipSpeed * 1000);

    if (side === "front") {
      timeout = setTimeout(() => {
        putRequest(`/course/chapter-summary`, {
          allocatedCourseId: allocatedCourse._id,
          cardUid: id,
        })
          .then((resp) => {})
          .catch((err) => {
            setSummaryCards(
              produce((draft) => {
                const card = draft.find((f) => f.uid === id);
                card.views = card.views - 1;
              })
            );
          });
      }, _FlipSpeed * 1000);
    }

    setSummaryCards(
      produce((draft) => {
        const card = draft.find((f) => f.uid === id);
        card.isOpen = !card.isOpen;

        card.views = side === "front" ? card.views + 1 : card.views;
      })
    );
  }

  function updateSummary() {
    if (!allocatedCourse._id) return;

    function findViews(cardUid) {
      const found = allocatedCourse.chapterSummary.find((f) => f.uid === cardUid);
      if (found) return found.views;
      else return 0;
    }

    setSummaryCards(
      summary.map((item, index) => ({
        ...item,
        color: _Colors[index % 6],
        isOpen: false,
        views: findViews(item.uid),
      }))
    );
  }

  useEffect(() => {
    updateSummary();
  }, [summary, chapter, allocatedCourse]);

  // useEffect(updateSummaryViews, [summary]);

  useEffect(() => {
    return () => {
      window.clearTimeout(timeout);
      window.clearTimeout(timeoutFlipping);
    };
  }, []);

  return { _FlipSpeed, summaryCards, handleClickCard, isLoading };
}
