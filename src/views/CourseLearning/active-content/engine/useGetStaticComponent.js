import React, { lazy } from "react";

import CourseStaticMapping from "./CourseStaticMapping.json";
import SuspenseWrapper from "components/shared/SuspenseWrapper";

// Numbers
const RealNumberClassification = lazy(() =>
  import("../static-contents/numbers/classification-game/Container")
);
const RealNumbersIntro = lazy(() =>
  import("../static-contents/numbers/RealNumbersIntro")
);

// Flowchart
const InputOutput = lazy(() =>
  import("../static-contents/flowchart-building/InputOutput")
);
const FlowChart = lazy(() => import("../static-contents/flowchart-building/Flowchart"));
const BasicSymbolsFlowchart = lazy(() =>
  import("../static-contents/flowchart-building/BasicSymbols")
);
const IntroductionFlowChart = lazy(() =>
  import("../static-contents/flowchart-building/Introduction")
);

// Decision Making
const IntroductionDecisionMaking = lazy(() =>
  import("../static-contents/decision-making/Introduction")
);
const DecisionGame = lazy(() =>
  import("../static-contents/decision-making/DecisionGame")
);
const BasicSymbolsDecisionMaking = lazy(() =>
  import("../static-contents/decision-making/BasicSymbols")
);
const ConditionalsOne = lazy(() =>
  import("../static-contents/decision-making/ConditionalsOne")
);
const ConditionalsTwo = lazy(() =>
  import("../static-contents/decision-making/ConditionalsTwo")
);
const ConditionalsThree = lazy(() =>
  import("../static-contents/decision-making/ConditionalsThree")
);
const ConditionalsFour = lazy(() =>
  import("../static-contents/decision-making/ConditionalsFour")
);

export default function getStaticComponent() {
  function getStaticComponent({ ref, course }) {
    if (!course) return;

    const mappedName = CourseStaticMapping[course.name];
    if (mappedName === "FlowchartBuilding") {
      switch (ref) {
        case "Io_1":
          return (
            <SuspenseWrapper>
              <IntroductionFlowChart />
            </SuspenseWrapper>
          );
        case "Io_2":
          return (
            <SuspenseWrapper>
              <InputOutput quesType="input" />
            </SuspenseWrapper>
          );
        case "Io_3":
          return (
            <SuspenseWrapper>
              <InputOutput quesType="processing" />
            </SuspenseWrapper>
          );
        case "Io_4":
          return (
            <SuspenseWrapper>
              <InputOutput quesType="output" />
            </SuspenseWrapper>
          );
        case "Symbols_1":
          return (
            <SuspenseWrapper>
              <BasicSymbolsFlowchart />
            </SuspenseWrapper>
          );
        case "Symbols_2":
          return (
            <SuspenseWrapper>
              <FlowChart />
            </SuspenseWrapper>
          );
        default:
          return null;
      }
    } else if (mappedName === "DecisionMaking") {
      switch (ref) {
        case "Intro_1":
          return (
            <SuspenseWrapper>
              <IntroductionDecisionMaking />
            </SuspenseWrapper>
          );
        case "Intro_2":
          return (
            <SuspenseWrapper>
              <DecisionGame />
            </SuspenseWrapper>
          );
        case "Intro_3":
          return (
            <SuspenseWrapper>
              <BasicSymbolsDecisionMaking />
            </SuspenseWrapper>
          );
        case "Conditionals_1":
          return (
            <SuspenseWrapper>
              <ConditionalsOne />
            </SuspenseWrapper>
          );
        case "Conditionals_2":
          return (
            <SuspenseWrapper>
              <ConditionalsTwo />
            </SuspenseWrapper>
          );
        case "Conditionals_3":
          return (
            <SuspenseWrapper>
              <ConditionalsThree />
            </SuspenseWrapper>
          );
        case "Conditionals_4":
          return (
            <SuspenseWrapper>
              <ConditionalsFour />
            </SuspenseWrapper>
          );
        default:
          return null;
      }
    } else if (mappedName === "Numbers") {
      switch (ref) {
        case "Real_1":
          return (
            <SuspenseWrapper>
              <RealNumbersIntro />
            </SuspenseWrapper>
          );
        case "Real_2":
          return (
            <SuspenseWrapper>
              <RealNumberClassification />
            </SuspenseWrapper>
          );
        default:
          return null;
      }
    }
  }

  return { getStaticComponent };
}
