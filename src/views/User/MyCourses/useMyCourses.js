import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useUser, useBundleCourses } from "contexts/AllContexts";
import { postRequest } from "utils/api";
import { sortArrOfObjects } from "utils/helper";

export default function useMyCourses() {
  const [allCourses, setAllCourses] = useState([]);

  // const [bundleAssessments, setBundleAssessments] = useState({});

  const User = useUser();
  const navigate = useNavigate();
  const Courses = useBundleCourses();

  // function getAssessmentAttemptCount(assessmentId) {
  //   return getRequest(`/assessment/bundle/attempt-count/${assessmentId}`);
  // }

  // function addBundleAssessment(bundleId) {
  //   getRequest(`/assessment/bundle/${bundleId}`)
  //     .then((resp) => {
  //       getAssessmentAttemptCount(resp.data._id).then((respCount) => {
  //         setBundleAssessments((prev) => ({
  //           ...prev,
  //           [resp.data.bundleId]: {
  //             ...resp.data,
  //             userAttemptCount: respCount.data.count,
  //           },
  //         }));
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  function handleClickCourse(course) {
    let activeCourse = User.state.activeCourses.find(
      (item) => item.courseId === course.courseId
    );

    switch (course.status) {
      case 0:
        let data = {
          activeCourseId: activeCourse._id,
        };
        postRequest("/user/course/start", data)
          .then(() => {
            User.refreshUserData();
            let url = `/course/learn/${activeCourse._id}/1/1`;
            navigate(url);
          })
          .catch((err) => console.log(err));
        break;

      case 1:
        let url = `/course/learn/${activeCourse._id}/1/1`;
        navigate(url);
        break;

      default:
        break;
    }
  }

  function populateCourses() {
    let userCourses = User.state.activeCourses;

    if (!Courses.state.isLoading.bundle) {
      userCourses = userCourses
        .map((course) => ({
          ...course.courseDetails[0],
          ...course,
          percentCompletion: parseFloat(course.percentCompletion.toFixed(2)),
        }))
        .map((course) => ({
          ...course,
          bundleName: Courses.getBundleName(course.bundle).name,
          bundleOrder: Courses.getBundleOrder(course.bundle),
        }));

      let sortedByBundle = [];

      userCourses.forEach((course) => {
        sortedByBundle[course.bundleOrder - 1] = [];
      });

      userCourses.forEach((course) => {
        sortedByBundle[course.bundleOrder - 1].push(course);
      });

      sortedByBundle.map((bundledCourses) =>
        sortArrOfObjects(bundledCourses, "order", "asc")
      );

      // sortedByBundle.forEach((courses) => {
      //   if (courses.length) {
      //     addBundleAssessment(courses[0].bundle);
      //   }
      // });

      setAllCourses(sortedByBundle);
    }
  }

  useEffect(() => {
    if (User.state.profile) {
      populateCourses();
    }
  }, [User.state.activeCourses, Courses.state.isLoading.bundle]);

  useEffect(() => {
    User.refreshUserData();
  }, []);

  return {
    User,
    allCourses,
    // bundleAssessments,
    handleClickCourse,
    populateCourses,
  };
}
