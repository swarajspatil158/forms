import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}
const RadioIcon: React.FC<IconProps> = ({
    strokeWidth = 1.5,
    className = "",
  }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    fill="none"
    viewBox="0 0 21 20"
    className={className}
  >
    <path
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M10.64 18.333a8.333 8.333 0 1 0 0-16.666 8.333 8.333 0 0 0 0 16.666Z"
    ></path>
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M10.64 13.333a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666Z"
    ></path>
  </svg>
);

export default RadioIcon;
