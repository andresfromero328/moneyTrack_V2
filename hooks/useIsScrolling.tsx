"use client";

import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export default function useIsScrolling() {
  const { scrollY } = useScroll();
  const [scrolled, setScroll] = useState<number>();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScroll(latest);
  });

  return scrolled;
}
