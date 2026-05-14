import { _InitialValue, reducer } from "./reducer";

test("Number Game Engine Reducer type INC_GAME_TIMER", () => {
  const startState = _InitialValue;
  const finState = reducer(startState, { type: "INC_GAME_TIMER", payload: { inc: 10 } });

  expect(finState).toMatchObject({
    runData: { totTimeElapsed: startState.runData.totTimeElapsed + 10 },
  });
});

test("Numbers Game Engine Reducer type INC_QUES_TIMER", () => {
  const startState = _InitialValue;
  const finState = reducer(startState, { type: "INC_QUES_TIMER", payload: { inc: 10 } });

  expect(finState).toMatchObject({
    runData: { quesTimeElapsed: startState.runData.quesTimeElapsed + 10 },
  });
});
