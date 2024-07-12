import { ReactNode } from "react";
import Sidebar from "./Sidebar";

export default function Wrapper(props: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-[#F9F9F9]">
      <Sidebar />
      <div className="flex-1 overflow-hidden">{props.children}</div>
    </div>
  );
}
