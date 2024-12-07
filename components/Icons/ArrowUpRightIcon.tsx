import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}

const ArrowUpRightIcon: React.FC<IconProps> = ({
  strokeWidth = 1.5,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="none"
      viewBox="0 0 16 16"
      className={className}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="m4.563 11.632 6.875-6.875m0 0v6.6m0-6.6h-6.6"
      ></path>
    </svg>
  );
};

export default ArrowUpRightIcon;
