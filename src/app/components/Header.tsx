import { FaAngleDown } from "react-icons/fa6";
import { RiGlobalLine } from "react-icons/ri";
import { BsPerson } from "react-icons/bs";

export default function Header() {
  return (
    <header className="h-[86px] bg-white px-[226px] flex_jb_ic shadow-lg shadow-gray-200 z-10">
      <div className=" flex_center gap-[51px]  ">
        <img src="/images/logo.png" alt="" className="h-[39px] object-contain mt-[-10px] cursor-pointer" />
        <div className="flex_center gap-[10px] cursor-pointer">
          <span className=" font-montserrat-500 ">Больше путешествий</span>
          <FaAngleDown size={11} />
        </div>
      </div>
      <div className="flex_jb_ic gap-[40px]">
        <div className="gap-[8px] flex_center cursor-pointer">
          <span className=" font-montserrat-500 ">Русский</span>
          <RiGlobalLine size={14} />
        </div>
        <div className=" w-[48px] h-[48px] rounded-full flex_center bg-main_blue cursor-pointer">
          <BsPerson size={24} color="white"/>
        </div>
      </div>
    </header>
  );
}
