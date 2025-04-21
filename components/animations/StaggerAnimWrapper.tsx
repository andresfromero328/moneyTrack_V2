"use client";

import React, { ElementType, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

type StaggerWrapperProps = {
  tag?: keyof React.JSX.IntrinsicElements;
  style?: string;
  children: ReactNode;
};

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const StaggerAnimWrapper = ({
  tag = "div",
  style = "",
  children,
}: StaggerWrapperProps) => {
  const MotionTag = motion[tag as keyof typeof motion] as ElementType;

  return (
    <AnimatePresence>
      <MotionTag
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={containerVariants}
        className={style}
      >
        {Array.isArray(children) ? (
          children.map((child, index) => (
            <motion.div variants={childVariants} key={index}>
              {child}
            </motion.div>
          ))
        ) : (
          <motion.div variants={childVariants}>{children}</motion.div>
        )}
      </MotionTag>
    </AnimatePresence>
  );
};

export default StaggerAnimWrapper;
