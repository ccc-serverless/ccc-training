import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { getRequest } from "utils/api";
import { isLoggedIn } from "utils/helper";

export default function useRedirects() {
  const navigate = useNavigate();

  function redirectToUpdatePassword() {
    getRequest("/user/profile")
      .then((resp) => {
        if (resp.data.isNew) navigate("/user/reset-pass");
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (isLoggedIn()) redirectToUpdatePassword();
  }, []);
}
