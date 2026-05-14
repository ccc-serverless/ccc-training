import { useState } from "react";
import { useParams } from "react-router-dom";

import { postRequest } from "utils/api";

import useGetAllocatedCourse from "hooks/useGetAllocatedCourse";
import { useEngine } from "../../Engine";

export function useMarkItemCompleted() {
  const [isDone, setIsDone] = useState(false);

  const params = useParams();

  const { getAllocatedCourse } = useEngine();

  const { allocatedCourse } = useGetAllocatedCourse();
  const course = allocatedCourse.courseDetails;

  function findModItem() {
    let findData = {
      module: parseInt(params.moduleNumber),
      item: parseInt(params.itemNumber),
    };

    const foundModule = course.modules.find((m) => m.order == findData.module);
    const foundItem = foundModule.items.find((i) => i.slNo == findData.item);

    return { moduleUid: foundModule.uid, itemUid: foundItem.uid };
  }

  function upload() {
    const { moduleUid, itemUid } = findModItem();

    const postData = {
      activeCourseId: params.activeCourseId,
      module: parseInt(params.moduleNumber),
      moduleUid,
      item: parseInt(params.itemNumber),
      itemUid,
    };

    postRequest(`/course/progress`, postData)
      .then(() => {
        getAllocatedCourse();
        setIsDone(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return { upload };
}
