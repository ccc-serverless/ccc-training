import { useState, useEffect } from "react";

import { useNavigate } from "react-router";
import { useUser } from "contexts/UserContext";
import { putRequest } from "utils/api";

export default function useUpdatePassword() {
  const user = useUser();

  const [profile, setProfile] = useState(null);
  const [formData, setFormData] = useState({});

  const [errorPassword, setErrorPassword] = useState(false);
  // const [errorPasswordConfirm, setErrorPasswordConfirm] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const [typePassword, setTypePassword] = useState("password");
  const [typePasswordConfirm, setTypePasswordConfirm] = useState("password");
  const navigate = useNavigate();

  function handleClickEye(type) {
    switch (type) {
      case "password":
        setTypePassword((prev) => (prev === "password" ? "text" : "password"));
        break;
      case "passwordConfirm":
        setTypePasswordConfirm((prev) => (prev === "password" ? "text" : "password"));
        break;
      default:
        return;
    }
  }

  function handleFormChange(e) {
    let update = { ...formData };
    update[e.target.name] = e.target.value;
    setFormData(update);

    setPasswordMatchError(false);
    setErrorPassword(false);
  }

  function handleFormSubmit(e) {
    e.preventDefault();

    if (formData.password.length < 6) {
      setErrorPassword(true);
      return;
    }

    if (formData.password.length > 15) {
      setErrorPassword(true);
      return;
    }

    if (formData.password !== formData.confirm_password) {
      setPasswordMatchError(true);
      return;
    }

    putRequest("/auth/password", { password: formData.password })
      .then((resp) => {
        navigate("/user/courses");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (user.state.profile) {
      setProfile(user.state.profile);
    }

    // if (!user.state.profile.isNew) window.location.href = "/";
  }, [user]);

  return {
    profile,
    errorPassword,
    passwordMatchError,
    typePassword,
    typePasswordConfirm,
    handleClickEye,
    handleFormChange,
    handleFormSubmit,
  };
}
