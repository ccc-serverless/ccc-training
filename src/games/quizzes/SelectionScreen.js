import React, { useState, useEffect } from "react";
import style from "./SelectionScreen.module.scss";

import { useParams } from "react-router-dom";
import SweetAlert from "react-bootstrap-sweetalert";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Checkbox from "@material-ui/core/Checkbox";
import { ChevronRight } from "react-feather";

import Preloader from "components/shared/Preloader";

import { capitalizeFirstLetter } from "utils/helper";
import { useGetTopics } from "./_common/useGetTopics";

export default function (props) {
  const { topics, getTopics, setTopics, isLoading } = useGetTopics();
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const params = useParams();

  function handleCheckbox(topic, event) {
    let currTopics = [...topics];

    currTopics.forEach((curr) => {
      if (curr.name === topic) {
        if (event.target.checked) {
          curr.tags.forEach((tag) => {
            tag.isChecked = true;
          });
        } else {
          curr.tags.forEach((tag) => {
            tag.isChecked = false;
          });
        }
      } else {
        currTopics.forEach((item) => {
          curr.tags.forEach((tag) => {
            tag.isChecked = false;
          });
        });
      }

      setTopics(currTopics);
    });
  }

  function handleTagClick(topicId, tag) {
    let currTopics = [...topics];
    currTopics.forEach((item) => {
      if (item._id === topicId) {
        item.tags.forEach((tagIterate) => {
          if (tagIterate._id === tag._id) {
            tagIterate.isChecked = !tagIterate.isChecked;
          }
        });
      } else {
        item.tags.forEach((tagIterate) => {
          tagIterate.isChecked = false;
        });
      }
    });

    setTopics(currTopics);
  }

  function handleStartQuiz() {
    let arrTopics = new Set();
    let arrTags = new Set();

    props.startTimer();

    topics.forEach((topic) => {
      function reducer(accum, curr) {
        if (curr.isChecked) arrTags.add(curr._id);
        return accum || curr.isChecked;
      }

      let isTopicSelected = topic.tags.reduce(reducer, false);
      if (isTopicSelected) {
        arrTopics.add(topic._id);
      }
    });

    const selectedFilters = {
      arrTopics: Array.from(arrTopics),
      arrTags: Array.from(arrTags),
    };

    if (!selectedFilters.arrTopics.length) {
      setIsAlertOpen(true);
      return;
    }

    props.getQuestions(selectedFilters);
    props.dispatch({
      type: "SET_GAME_STATE",
      payload: {
        isStart: true,
      },
    });
  }

  useEffect(() => {
    getTopics(props.name);
  }, [props.name]);

  return (
    <div className={style.wrapper}>
      <div className={style.selectionWrapper}>
        <div className={style.title}>SELECT TOPICS</div>
        {isLoading ? (
          <Preloader />
        ) : (
          topics.map((topic, index) => {
            return (
              <div key={topic._id} className={style.topicContainer}>
                <div className={style.topicName}>
                  <Checkbox
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon style={{ fill: "purple" }} />}
                    name="checkedTopic"
                    onChange={handleCheckbox.bind(this, topic.name)}
                    checked={topic.tags.reduce((accumTags, currTag) => {
                      return accumTags && currTag.isChecked;
                    }, true)}
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
            );
          })
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
