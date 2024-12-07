import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}

const LongAnswerIcon: React.FC<IconProps> = ({
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
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M3.14 5h8.333M3.14 10h15M3.14 15h15"
    ></path>
  </svg>
);

export default LongAnswerIcon;
