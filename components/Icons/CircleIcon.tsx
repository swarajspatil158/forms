import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}

const CircleIcon: React.FC<IconProps> = ({
  strokeWidth = 1.5,
  className = "",
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      fill="none"
      viewBox="0 0 20 20"
      className={className}
    >
      <circle cx="10" cy="10" r="7.25" stroke="currentColor" strokeWidth={strokeWidth}></circle>
    </svg>
  );
};

export default CircleIcon;