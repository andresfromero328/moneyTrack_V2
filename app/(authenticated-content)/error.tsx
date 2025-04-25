"use client";

import StaggerAnimWrapper from "@/components/animations/StaggerAnimWrapper";

export default function HomeError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <StaggerAnimWrapper
      tag="main"
      style="flex-1 w-full max-w-7xl mx-auto flex flex-col items-center justify-center gap-5 p-5"
    >
      <h1>Opps! An Error Has Occurred</h1>
      <p className="mt-2">{error.message}</p>
      <button onClick={reset} className="button">
        <small>Try again</small>
      </button>
    </StaggerAnimWrapper>
  );
}
