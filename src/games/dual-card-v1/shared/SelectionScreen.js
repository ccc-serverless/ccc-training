import React, { useState } from "react";
import style from "./SelectionScreen.module.scss";

import SweetAlert from "react-bootstrap-sweetalert";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Checkbox from "@material-ui/core/Checkbox";
import { ChevronRight } from "react-feather";

import Preloader from "components/shared/Preloader";

import { capitalizeFirstLetter } from "utils/helper";

export default function ({ state, dispatch, handleGameStart }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const { runData, screenState } = state;

  function handleCheckbox(topic, event) {
    let currTopics = [...runData.topics];

    /* Select or Deselect all tags of the selected topic */
    currTopics.forEach((curr) => {
      if (curr.name === topic) {
        if (event.target.checked) curr.tags.forEach((tag) => (tag.isChecked = true));
        else curr.tags.forEach((tag) => (tag.isChecked = false));
      } else {
        currTopics.forEach((item) => {
          curr.tags.forEach((tag) => (tag.isChecked = false));
        });
      }

      dispatch({ type: "UPDATE_RUN_DATA", payload: { topics: currTopics } });
    });
  }

  function handleTagClick(topicId, tag) {
    let currTopics = [...state.runData.topics];

    /* Select individual tag and/or switch the selected topic as only the tags of 
       one topic can be selected at once */

    currTopics.forEach((item) => {
      if (item._id === topicId) {
        item.tags.forEach((tagIterate) => {
          if (tagIterate._id === tag._id) tagIterate.isChecked = !tagIterate.isChecked;
        });
      } else {
        item.tags.forEach((tagIterate) => (tagIterate.isChecked = false));
      }
    });

    dispatch({ type: "UPDATE_RUN_DATA", payload: { topics: currTopics } });
  }

  function handleStartQuiz() {
    /* Set removes duplicate entries */
    let arrTopics = new Set();
    let arrTags = new Set();

    runData.topics.forEach((topic) => {
      /* Add each selected tag to filter AND 
         Even if one tag is selected of a topic , add that topic to filter */
      function reducer(accum, curr) {
        if (curr.isChecked) arrTags.add(curr._id);
        return accum || curr.isChecked;
      }

      let isTopicSelected = topic.tags.reduce(reducer, false);
      if (isTopicSelected) {
        arrTopics.add(topic._id);
      }
    });

    /* Convert SET back to array */
    const selectedFilters = {
      arrTopics: Array.from(arrTopics),
      arrTags: Array.from(arrTags),
    };

    if (!selectedFilters.arrTopics.length) {
      setIsAlertOpen(true);
      return;
    }

    handleGameStart(selectedFilters);
  }

  return (
    <div className={style.wrapper}>
      <div className={style.selectionWrapper}>
        <div className={style.title}>SELECT TOPICS</div>
        {screenState.isLoading ? (
          <Preloader />
        ) : (
          runData.topics.map((topic, index) => (
            <div key={topic._id} className={style.topicContainer}>
              <div className={style.topicName}>
                <Checkbox
                  icon={<RadioButtonUncheckedIcon />}
                  checkedIcon={<CheckCircleIcon style={{ fill: "purple" }} />}
                  name="checkedTopic"
                  onChange={handleCheckbox.bind(this, topic.name)}
                  checked={topic.tags.reduce(
                    (accumTags, currTag) => accumTags && currTag.isChecked,
                    true
                  )}
                />
                {topic.name}
              </div>
              <div className={style.tags}>
                {topic.tags.map((tag, i) => {
                  return (
                    <div
                      key={tag.name}
                      className={style.tag}
                      onClick={() => handleTagClick(topic._id, tag)}
                      style={
                        tag.isChecked ? { background: "purple", color: "white" } : {}
                      }
                    >
                      {capitalizeFirstLetter(tag.name)}
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
      <button className={style.quizAction} onClick={handleStartQuiz}>
        Start Quiz <ChevronRight />
      </button>

      {isAlertOpen ? (
        <SweetAlert
          warning
          confirmBtnStyle={{
            background: "#6a2c70",
            color: "white",
            width: "100px",
            textDecoration: "none",
            height: "40px",
            lineHeight: "40px",
            border: "none",
          }}
          title=""
          onConfirm={setIsAlertOpen.bind(this, false)}
        >
          Please select one topic to proceed
        </SweetAlert>
      ) : null}
    </div>
  );
}
