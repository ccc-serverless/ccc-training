import { useRef, useEffect } from "react";

export function useDidUpdateEffect(fn, inputs) {
  const didMountRef = useRef(false);

  if (!Array.isArray(inputs)) throw new Error("Input dependency not array");

  useEffect(() => {
    if (didMountRef.current) fn();
    else didMountRef.current = true;
  }, [...inputs]);
}
