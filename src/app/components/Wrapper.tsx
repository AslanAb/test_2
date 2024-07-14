import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { useLoadingContext } from "../utils/loading_context";
import { ThreeDots } from "react-loader-spinner";

export default function Wrapper(props: { children: ReactNode }) {
  const { isLoading } = useLoadingContext();

  return (
    <div className="min-h-screen flex bg-[#F9F9F9]">
      <Sidebar />
      {isLoading ? (
        <div className="flex-1 flex justify-center mt-[180px]">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            radius="9"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">{props.children}</div>
      )}
    </div>
  );
}
