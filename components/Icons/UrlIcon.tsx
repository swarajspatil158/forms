import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}

const UrlIcon: React.FC<IconProps> = ({
    strokeWidth = 1.5,
    className = "",
  }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 20 20"
    className={className}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth={strokeWidth}
      d="m7.917 12.083 4.166-4.166M14.039 12.175 16.213 10A4.393 4.393 0 0 0 10 3.787L7.825 5.96m4.35 8.078L10 16.213A4.393 4.393 0 1 1 3.787 10L5.96 7.825"
    ></path>
  </svg>
);

export default UrlIcon;
