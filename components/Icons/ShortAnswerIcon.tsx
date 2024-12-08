import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}

const ShortAnswerIcon: React.FC<IconProps> = ({
    strokeWidth = 1.5,
    className = "",
  }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="21"
    fill="none"
    viewBox="0 0 21 21"
    className={className}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M3 7.738h8.333M3 12.738h15"
    ></path>
  </svg>
);

export default ShortAnswerIcon;
