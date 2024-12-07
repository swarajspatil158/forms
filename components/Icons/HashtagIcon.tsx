import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}

const HashtagIcon: React.FC<IconProps> = ({
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
      strokeLinecap="round"
      strokeWidth={strokeWidth}
      d="m8.973 2.5-3.333 15M17.723 13.333h-15M18.973 5.833h-15M15.64 2.5l-3.334 15"
    ></path>
  </svg>
);

export default HashtagIcon;
