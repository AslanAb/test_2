import { SVGProps } from "react";
const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 18" fill="none" {...props}>
    <path
      stroke="#26333D"
      strokeLinecap="round"
      strokeWidth={2}
      d="M13.974 14.827c-.323-.904-1.035-1.703-2.024-2.272-.99-.57-2.203-.878-3.45-.878-1.247 0-2.46.309-3.45.878-.99.57-1.7 1.368-2.024 2.272"
    />
    <circle cx={8.5} cy={6.01} r={2.833} stroke="#26333D" strokeLinecap="round" strokeWidth={2} />
  </svg>
);
export default SvgComponent;
