"use client";

import { useState, useEffect } from "react";

export default function useScreenWidth() {
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    // Set width after component mounts
    const handleResize = () => setWidth(window.innerWidth);

    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return width;
}
