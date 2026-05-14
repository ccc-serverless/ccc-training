import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

import { getRequest } from "utils/api";
import { useUser } from "contexts/AllContexts";
import { useTags } from "./TagsContext";

export function useGetTopics() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const User = useUser();
  const Tags = useTags();
  const params = useParams();
  const location = useLocation();

  function getTopics(game) {
    let path = location.pathname.split("/");
    if (path.indexOf("trial") !== -1) {
      let trialTopic = [
        {
          _id: "60aa43371b97c0e24cec5901",
          name: "Arithmetic",
          tags: [
            {
              isChecked: false,
              name: "addition",
              topicId: "60aa43371b97c0e24cec5901",
              topicName: "Arithmetic",
              _id: "60bf7bfbe403d0aee5800a18",
            },
          ],
        },
      ];
      Tags.dispatch({ type: "ADD_TAGS", payload: trialTopic[0].tags });
      setTopics(trialTopic);
      setIsLoading(false);
    } else {
      const course = User.getCourseFromActiveCourses(params.activeCourseId);
      const module = params.moduleNumber;
      const item = params.itemNumber;

      getRequest(`/course/game/tags/${course._id}/${module}/${item}`)
        .then((resp) => {
          let tags = resp.data.map((tag) => {
            return { ...tag, isChecked: false };
          });
          Tags.dispatch({ type: "ADD_TAGS", payload: resp.data });
          let arr = [];
          tags.forEach((tag) => {
            let foundIndex = -1;
            for (let i = 0; i < arr.length; i++) {
              if (arr[i]._id === tag.topicId) {
                foundIndex = i;
                break;
              }
            }
            if (foundIndex === -1) {
              arr.push({
                _id: tag.topicId,
                name: tag.topicName,
                tags: [tag],
              });
            } else {
              arr[foundIndex].tags.push(tag);
            }
          });
          setTopics(arr);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return { topics, getTopics, setTopics, isLoading };
}
