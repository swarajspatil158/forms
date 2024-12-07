import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}

const CheckIcon: React.FC<IconProps> = ({
    strokeWidth = 1.5,
    className = "",
  }) => (
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
      d="m3 8.38 3 2.787 7-6.5"
    ></path>
  </svg>
);

export default CheckIcon;
