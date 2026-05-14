import { useParams, useLocation } from "react-router-dom";

import { postRequest } from "utils/api";
import { useUser } from "contexts/UserContext";

export default function useUploadResult() {
  const User = useUser();
  const params = useParams();
  const location = useLocation();

  function uploadResult({ gameId, result, arrData, gameSettings }) {
    let path = location.pathname.split("/");
    if (path.indexOf("trial") !== -1) {
      return;
    }

    let module = User.state.activeModule;
    let item = module.items.find((item) => item.game === gameId);

    let activeCourse = params.activeCourseId;

    let newResult = {
      gameId: item.game,
      gameName: item.name,
      allocatedCourseId: activeCourse,
      module: {
        uid: module.uid,
        order: module.order,
        item: item.slNo,
        itemUid: item.uid,
      },
      speed: result.speed,
      accuracy: result.accuracy,
      arrData: [...arrData],
    };

    if (gameSettings !== null && gameSettings !== undefined)
      newResult.gameSettings = gameSettings;

    postRequest("/course/game/result", newResult)
      .then((res) => {
        User.refreshUserData();
      })
      .catch((err) => console.log(err))
      .finally(() => {});
  }

  return { uploadResult };
}
