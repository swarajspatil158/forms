import * as React from "react";

interface IconProps {
  strokeWidth?: number;
  className?: string;
}
const CalendarIcon: React.FC<IconProps> = ({
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
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M15 1.667v1.666M5 1.667v1.666"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={ strokeWidth }
      d="M9.996 10.833h.008m-.008 3.334h.008m3.322-3.334h.007m-6.666 0h.007m-.007 3.334h.007"
    ></path>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      d="M2.917 6.667h14.166M2.083 10.203c0-3.631 0-5.447 1.044-6.575C4.17 2.5 5.849 2.5 9.208 2.5h1.584c3.358 0 5.038 0 6.081 1.128s1.044 2.944 1.044 6.575v.428c0 3.63 0 5.446-1.044 6.574-1.043 1.128-2.723 1.128-6.081 1.128H9.208c-3.359 0-5.038 0-6.081-1.128s-1.044-2.943-1.044-6.574zM2.5 6.667h15"
    ></path>
  </svg>
);

export default CalendarIcon;
