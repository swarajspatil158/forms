import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}

const ChevDownIcon: React.FC<IconProps> = ({
    strokeWidth = 1.5,
    className = "",
  }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    fill="none"
    viewBox="0 0 17 17"
    className={className}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="m4.5 6.238 4 4 4-4"
    ></path>
  </svg>
);

export default ChevDownIcon;
