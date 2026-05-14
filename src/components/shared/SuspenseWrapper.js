import React, { Suspense } from "react";
import SuspenseLoader from "./SuspenseLoader";

export default function SuspenseWrapper({ children }) {
  return <Suspense fallback={<SuspenseLoader />}>{children}</Suspense>;
}
