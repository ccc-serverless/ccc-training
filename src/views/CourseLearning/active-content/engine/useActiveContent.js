import React, { useState, lazy, useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";

import { useUser, useGames } from "contexts/AllContexts";

import SuspenseWrapper from "components/shared/SuspenseWrapper";
import WithFooter from "../content-footer/WithFooter";

import useGetStaticComponent from "./useGetStaticComponent";
import useGetGameFromId from "./useGetGameFromId";

import CourseStaticMapping from "./CourseStaticMapping.json";

/* MISC LAZY IMPORTS --------------------------------------------------------------------------------
   -----------------------------------------------------------------------------------------------------------------------------*/

const CourseOverview = lazy(() => import("../dynamic-contents/Overview"));
const CourseResource = lazy(() => import("../dynamic-contents/PdfReader"));
const AssessmentMcq = lazy(() => import("views/CourseAssessment/Mcq/Container"));

const ChapterAssessment = lazy(() => import("games/Chapter-Assessment/Container"));
const ChapterSummary = lazy(() => import("views/ChapterSummary"));
const ChapterSummaryPoints = lazy(() => import("views/ChapSummaryPoints"));
const ChapterPracticeQuiz = lazy(() => import("views/Chapter-Practice-Quiz"));
const ChapterPracticeMcq = lazy(() => import("views/Chapter-Practice-Mcq"));

/** -----------------------------------------------------------------------------------------------------------------------------------
    -----------------------------------------------------------------------------------------------------------------------------------
    -------------------------------------------------------------------------------------------------------------------------------   */

export default function useActiveContent(course) {
  const Games = useGames();
  const User = useUser();
  const urlParams = useParams();

  const { getGameFromId } = useGetGameFromId();
  const { getStaticComponent } = useGetStaticComponent();

  const [currCourseContentBody, setCurrCourseContentBody] = useState(null);

  function handleChangeCurrComp() {
    setCurrCourseContentBody(getCurrComp(course));
  }

  function getCurrComp(currCourse) {
    let currModuleNumber = urlParams.moduleNumber;
    let currItemNo = urlParams.itemNumber;
    let currModule = currCourse.modules.find((mod) => mod.order == currModuleNumber);

    if (!currModule.items) return;

    let currItem = currModule.items.find((item) => item.slNo == currItemNo);
    User.dispatch({ type: "SET_ACTIVE_MODULE", payload: currModule });

    switch (currItem.type) {
      case "game":
        return getGameFromId(currItem.game);
      case "static":
        let showFooter = true;
        const mappedName = CourseStaticMapping[course.name];

        if (mappedName === "FlowchartBuilding") {
          switch (currItem.ref) {
            case "Io_2":
            case "Io_3":
            case "Io_4":
              showFooter = false;
              break;
            default:
              showFooter = true;
              break;
          }
        } else if (mappedName === "DecisionMaking") {
          switch (currItem.ref) {
            case "Intro_2":
              showFooter = false;
              break;
            default:
              showFooter = true;
              break;
          }
        }

        return showFooter ? (
          <WithFooter>{getStaticComponent({ ref: currItem.ref, course })}</WithFooter>
        ) : (
          <>{getStaticComponent({ ref: currItem.ref, course })}</>
        );
      case "overview":
        return (
          <SuspenseWrapper>
            <CourseOverview
              courseId={currCourse._id}
              courseName={currCourse.name}
              course={course}
            />
          </SuspenseWrapper>
        );
      case "resource":
        return (
          <SuspenseWrapper>
            <CourseResource
              moduleId={currModule.uid}
              itemId={currItem.uid}
              resourceType={currItem.resourceType}
              course={course}
            />
          </SuspenseWrapper>
        );
      case "chapter-pre-assessment":
        console.log("chapter pre assessment rendered");
        return (
          <SuspenseWrapper>
            <Navigate
              to={`/course/assessment/pre-chapter/${urlParams.activeCourseId}/${currItem.chapter.moduleUid}/${currItem.uid}`}
            />
          </SuspenseWrapper>
        );
      case "chapter-post-assessment":
        return (
          <SuspenseWrapper>
            <Navigate
              to={`/course/assessment/post-chapter/${urlParams.activeCourseId}/${currItem.chapter.moduleUid}/${currItem.uid}`}
            />
          </SuspenseWrapper>
        );
      case "chapter-assessment":
        return (
          <SuspenseWrapper>
            <ChapterAssessment chapter={{ ...currItem.chapter, courseId: course._id }} />
          </SuspenseWrapper>
        );
      case "course-post-assessment":
        return (
          <Navigate
            to={`/course/assessment/exit/${urlParams.activeCourseId}/${currModule.uid}/${currItem.uid}`}
          />
        );
      case "chapter-practice-quiz":
        return (
          <SuspenseWrapper>
            <ChapterPracticeQuiz
              chapter={{
                ...currItem.chapter,
                courseId: course._id,
                itemUid: currItem.uid,
              }}
            />
          </SuspenseWrapper>
        );
      case "chapter-practice-mcq":
        return (
          <SuspenseWrapper>
            <ChapterPracticeMcq
              chapter={{
                ...currItem.chapter,
                courseId: course._id,
                itemUid: currItem.uid,
              }}
            />
          </SuspenseWrapper>
        );
      case "chapter-summary":
        return (
          <SuspenseWrapper>
            <ChapterSummary chapter={currItem.chapter} summary={currItem.summary} />
          </SuspenseWrapper>
        );
      case "chapter-summary-points":
        return (
          <SuspenseWrapper>
            <ChapterSummaryPoints summary={currItem.summary} />
          </SuspenseWrapper>
        );
      default:
        break;
    }
  }

  useEffect(() => {
    if (course && Games) handleChangeCurrComp();
  }, [urlParams, course, Games]);

  return { currCourseContentBody };
}
