import React from "react";

export const _IntelliChat = {
  render: function (I, L, T, i, c, k, s) {
    if (I.iticks) return;
    I.iticks = { host: c, settings: s, clientId: k, cdn: L, queue: [] };
    var h = T.head || T.documentElement;
    var e = T.createElement(i);
    e.async = true;
    e.src = (L || c) + "/client/inject-v2.min.js";
    h.insertBefore(e, h.firstChild);
    I.iticks.call = function (a, b) {
      I.iticks.queue.push([a, b]);
    };
  },

  show: function () {
    const x = document.getElementsByClassName("iticks-pop-button")[0];
    const y = document.getElementsByClassName("iticks-frame-container")[0];
    // const z = document.getElementsByClassName("iticks-last-msg")[0];

    if (x) {
      x.classList.remove("iticks-hidden");
      x.onclick = () => {
        y.classList.remove("iticks-hidden");
        x.classList.add("iticks-hidden");
      };
    }
    if (y) {
      y.classList.add("iticks-hidden");
    }
  },

  hide: function () {
    const x = document.getElementsByClassName("iticks-pop-button")[0];
    const y = document.getElementsByClassName("iticks-frame-container")[0];
    const z = document.getElementsByClassName("iticks-last-msg")[0];
    const a = document.getElementsByClassName("iticks-notif-msg")[0];

    if (x) {
      x.classList.add("iticks-hidden");
    }
    if (y) {
      y.classList.add("iticks-hidden");
    }
    if (z) {
      z.style.visibility = "hidden";
    }
    if (a) {
      a.style.visibility = "hidden";
    }
  },
};

export function IntelliChatScript() {
  const script = _IntelliChat.render(
    window,
    "https://cdn.intelliticks.com/prod/common",
    document,
    "script",
    "https://app.intelliticks.com",
    "BTcfJi5tDrhxttNxp_c",
    {}
  );

  return <script type="text/javascript">{script}</script>;
}
