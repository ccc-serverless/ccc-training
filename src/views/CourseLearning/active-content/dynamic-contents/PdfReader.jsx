import React, { useState, useEffect } from "react";

import { getRequest } from "utils/api";
import Preloader from "components/shared/Preloader";
import PdfRenderer from "components/shared/PdfRenderer";

import CourseContentFooter from "../content-footer/CourseContentFooter";

export default function CourseResource({ moduleId, itemId, resourceType, course }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  function getData() {
    setIsLoading(true);
    getRequest(`/course/resource/${course._id}/${moduleId}/${itemId}`)
      .then((resp) => {
        setData(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (course && moduleId && itemId) {
      getData();
    }
  }, [course, moduleId, itemId]);

  function renderResource() {
    switch (resourceType) {
      case "pdf":
        return <PdfRenderer data={data} />;
      default:
        return null;
    }
  }

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      {renderResource()} <CourseContentFooter />
    </>
  );
}
