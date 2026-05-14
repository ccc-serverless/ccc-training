import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllocatedCourseById } from "apis/user";

export default function useGetAllocatedCourse() {
  const params = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [allocatedCourse, setAllocatedCourse] = useState({});

  function getData() {
    setIsLoading(true);
    getAllocatedCourseById(params.activeCourseId)
      .then((resp) => {
        setAllocatedCourse(resp.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getData();
  }, [params.activeCourseId]);

  return { allocatedCourse };
}
