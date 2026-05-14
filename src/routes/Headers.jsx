import React, { useState, useEffect } from "react";

import { useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";

import { IntelliChatScript, _IntelliChat } from "components/IntelliChat";

export default function Headers({ pageTitle }) {
  const [showChat, setShowChat] = useState(false);
  const location = useLocation();

  function isLinkForChat() {
    let pathname = location.pathname;
    let pathnameSplit = pathname.split("/");
    if (pathnameSplit[1] === "info" && pathnameSplit[2] === "course") return true;

    switch (pathname) {
      case "/home":
        return true;
      case "/offerings":
        return true;
      default:
        return false;
    }
  }

  useEffect(() => {
    setShowChat(isLinkForChat());
  }, [location]);

  useEffect(() => {
    if (!showChat) _IntelliChat.hide();
    else _IntelliChat.show();
  }, [showChat]);

  return (
    <Helmet>
      <title>{pageTitle}</title>
      {showChat && IntelliChatScript()}
    </Helmet>
  );
}
