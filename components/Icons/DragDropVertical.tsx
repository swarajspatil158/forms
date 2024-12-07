import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}

const DragDropVerticalIcon: React.FC<IconProps> = ({
    strokeWidth = 1.5,
    className = "",
  }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="19"
    fill="none"
    viewBox="0 0 18 19"
    className={className}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth + 0.8}
      d="M4.375 3.238h.005m-.005 5h.005m-.005 5h.005m6.656-10h.006m-.006 5h.006m-.006 5h.006"
    ></path>
  </svg>
);

export default DragDropVerticalIcon;
