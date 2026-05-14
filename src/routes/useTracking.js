import { useEffect } from "react";
import ReactGA from "react-ga";

import config from "config/config.js";
import { useLocation } from "react-router-dom";

export default function useTracking() {
  // const location = useLocation();
  // useEffect(() => {
  //   if (config.env !== "PROD") return;
  //   if (!config.gaTrackingId) throw new Error("GA Tracking ID missing");
  //   ReactGA.initialize(config.gaTrackingId);
  // }, []);
  // useEffect(() => {
  //   ReactGA.pageview(window.location.pathname + window.location.search);
  // }, [location]);
}
