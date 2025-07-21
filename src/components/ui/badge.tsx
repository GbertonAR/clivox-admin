// src/components/ui/badge.tsx

import React from "react";
import classNames from "classnames";

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, className }) => {
  return (
    <span
      className={classNames(
        "inline-flex items-center px-2 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800",
        className
      )}
    >
      {children}
    </span>
  );
};
