import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}

const PlusIcon: React.FC<IconProps> = ({
    strokeWidth = 1.5,
    className = "",
  }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="16"
    fill="none"
    viewBox="0 0 17 16"
    className={className}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M3.833 8H8.5m4.667 0H8.5m0 0V3.333M8.5 8v4.667"
    ></path>
  </svg>
);

export default PlusIcon;
