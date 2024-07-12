import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 17 18" fill="none" {...props}>
    <path
      stroke="#26333D"
      strokeLinecap="round"
      strokeWidth={2}
      d="M14.167 5.177v1.427a7.312 7.312 0 0 1-2.925 5.85 4.57 4.57 0 0 1-5.484 0 7.312 7.312 0 0 1-2.925-5.85V5.177a2 2 0 0 1 2-2h7.334a2 2 0 0 1 2 2Z"
    />
    <circle cx={8.5} cy={7.427} r={0.708} fill="#26333D" />
    <circle cx={6.375} cy={7.427} r={0.708} fill="#26333D" />
    <circle cx={10.625} cy={7.427} r={0.708} fill="#26333D" />
  </svg>
);
export default SvgComponent;
