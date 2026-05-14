import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRequest } from "utils/api";

export default function useResult() {
  const [result, setResult] = useState(null);
  const [tags, setTags] = useState({});

  const [tagsByCategory, setTagsByCategory] = useState({ good: [], bad: [], worst: [] });

  const params = useParams();

  function getResult() {
    getRequest(`/assessment/bundle/result/${params.assessmentId}`)
      .then((resp) => {
        const arrTags = Object.entries(resp.data.accuracyByTag).map(([key, value]) => {
          let tagsByCat = { ...tagsByCategory };
          if (value < 50) {
            tagsByCat.worst.push(key);
          } else if (value > 50 && value < 70) {
            tagsByCat.bad.push(key);
          } else {
            tagsByCat.good.push(key);
          }

          return key;
        });

        getTags(arrTags);
        setResult(resp.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getTags(arrTags) {
    let queryString = `tagId=`;
    queryString += arrTags.join("&tagId=");

    getRequest(`/tags?${queryString}`)
      .then((resp) => {
        const tagsObject = {};
        resp.data.forEach((tag) => {
          tagsObject[tag._id] = tag;
        });

        setTags(tagsObject);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(getResult, []);

  return { result, tags, tagsByCategory };
}
