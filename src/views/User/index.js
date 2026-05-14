import React from "react";
import Profile from "./Profile";
import PerformanceSummary from "./PerformanceSummary";

export default function UserIndex() {
  return (
    <div>
      <Profile />
      <PerformanceSummary />
    </div>
  );
}
