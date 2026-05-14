import { useState, useEffect, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSidebar } from "contexts/AllContexts";

const InitialState = {
  data: {
    module: { items: [], name: "" },
    item: { slNo: 0, name: "" },
  },
  displayControllers: {
    prev: true,
    next: true,
  },
};
function reducer(state, action) {
  const { type, payload } = action;

  switch (type) {
    case "SET_DATA":
      return { ...state, data: payload.data };
    default:
      return state;
  }
}

export default function Breadcrumbs({ allocatedCourse, className }) {
  const [state, dispatch] = useReducer(reducer, InitialState);

  const params = useParams();

  const navigate = useNavigate();

  const { courseDetails } = allocatedCourse;

  const [data, setData] = useState({
    module: { items: [], name: "" },
    item: { slNo: 0, name: "" },
  });
  const [displayControllers, setDisplayControllers] = useState({
    prev: true,
    next: true,
  });

  const itemNo = parseInt(params.itemNumber);
  const moduleNo = parseInt(params.moduleNumber);

  // Adjust displaying prev && next button
  function handleDisplayControllers() {
    let modulesCount = courseDetails.modules.length;
    let totalItems = courseDetails.modules[moduleNo - 1].items.length;

    if (moduleNo === 1 && itemNo === 1) {
      setDisplayControllers({ prev: false, next: true });
    } else if (moduleNo === modulesCount && itemNo === totalItems) {
      setDisplayControllers({ next: false, prev: true });
    } else {
      setDisplayControllers({ next: true, prev: true });
    }
  }

  // Handler for click on prev && next button
  function handleClickController(type) {
    let totalItems = data.module.items.length;
    let modulesCount = courseDetails.modules.length;

    switch (type) {
      case "next":
        if (itemNo < totalItems) {
          navigate(`/course/learn/${params.activeCourseId}/${moduleNo}/${itemNo + 1}`);
        } else if (itemNo === totalItems) {
          if (moduleNo < modulesCount)
            navigate(`/course/learn/${params.activeCourseId}/${moduleNo + 1}/${1}`);
        }
        break;

      case "prev":
        if (itemNo > 1) {
          navigate(
            `/course/learn/${params.activeCourseId}/${params.moduleNumber}/${itemNo - 1}`
          );
        } else if (itemNo === 1) {
          if (moduleNo > 1)
            navigate(
              `/course/learn/${params.activeCourseId}/${moduleNo - 1}/${
                courseDetails.modules[moduleNo - 2].items.length
              }`
            );
        }
        break;

      default:
        break;
    }
  }

  function updateData() {
    const currentModule = courseDetails.modules.find((f) => f.order === moduleNo);
    const currentItem = currentModule.items.find((f) => f.slNo === itemNo);

    setData({
      module: currentModule,
      item: currentItem,
    });
  }

  function handleClickBack() {
    navigate(`/course/learn/${params.activeCourseId}/1/1`);
  }

  useEffect(() => {
    handleDisplayControllers();
    updateData();
  }, [params]);
}
