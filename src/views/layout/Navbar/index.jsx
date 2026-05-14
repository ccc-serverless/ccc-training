import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import Navbar from "./NavbarDark";
import NavbarTnc from "./NavbarTnC";
import NavbarLight from "./NavbarLight";
import NavbarLightLms from "./NavbarLightLms";

function isTokenExists() {
  if (localStorage.getItem("authToken")) return true;
  return false;
}

function isActiveResetPassword(location) {
  return location.pathname === "/user/reset-pass";
}

function isActiveTnc(location) {
  return location.pathname === "/terms-and-conditions";
}

function isActiveLms(location) {
  return (
    location.pathname.split("/")[1] === "course" &&
    location.pathname.split("/")[2] === "learn"
  );
}
export default function NavbarIndex() {
  const location = useLocation();

  const [isTokenPresent, setIsTokenPresent] = useState(false);
  const [isLmsRoute, setIsLmsRoute] = useState(false);
  const [isTncPage, setIsTncPage] = useState(false);
  const [isActiveResetPass, setIsActiveResetPass] = useState(false);

  useEffect(() => {
    setIsTokenPresent(isTokenExists());
    setIsTncPage(isActiveTnc(location));
    setIsLmsRoute(isActiveLms(location));
    setIsActiveResetPass(isActiveResetPassword(location));
  }, [location]);

  return isTncPage ? (
    <NavbarTnc />
  ) : isTokenPresent ? (
    isLmsRoute ? (
      <NavbarLightLms />
    ) : isActiveResetPass ? (
      <NavbarLight hideNavLinks={true} />
    ) : (
      <NavbarLight />
    )
  ) : (
    <Navbar />
  );
}
