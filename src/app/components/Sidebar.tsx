import { BiLogOut } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import Image from "next/image";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { useState } from "react";
import { useRouter } from "next/router";
import { useLogout } from "../hooks/auth";

export default function Sidebar() {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const visibleHandler = () => {
    setIsVisible(!isVisible);
  };

  const routerName = (name: string) => {
    if (router.pathname.startsWith(name)) {
      return true;
    } else {
      return false;
    }
  };

  const logout = useLogout();

  return (
    <div className="w-[343px] bg-white">
      <div className="h-[102px] flex_jb_ic px-[35px]">
        <img src="/images/logo.png" alt="" className="w-[115px] object-contain" />
        <button className="flex items-center gap-[10px]" onClick={() => logout.mutate()}>
          <BiLogOut size={17} color="#156CBD" />
          <span className=" font-montserrat-500 text-main_blue text-[14px]">выход</span>
        </button>
      </div>
      <div className="px-[35px] pt-[25px] pb-[20px] flex justify-between border-b border-[#F3F6F9]">
        <div className="flex_jb_ic gap-[15px]">
          <div className="w-[48px] aspect-square rounded-full flex_center bg-main_blue">
            <span className="text-white font-montserrat-500 text-[14px]">H</span>
          </div>
          <div>
            <p className=" font-montserrat-500">SENATOR Hotel</p>
            <p className=" text-[14px]">hotel@mail.kz</p>
          </div>
        </div>
        <button>
          <TbEdit size={20} color="#156CBD" className="mt-[7px]" />
        </button>
      </div>
      <nav className="px-[35px] pt-[40px] pb-[30px] border-b border-[#F3F6F9] font-montserrat-500 text-[14px]">
        <div className="py-[10px] flex_jb_ic cursor-pointer" onClick={visibleHandler}>
          <div className="flex items-center gap-[15px] ">
            <Image src="/images/house.svg" alt="" width={`${0}`} height={`${0}`} className="w-[20px] h-auto" />
            <span className="pt-[4px]">Ваш отель</span>
          </div>
          {isVisible ? <FaChevronUp size={15} /> : <FaChevronDown size={15} />}
        </div>
        {isVisible && (
          <div className={`flex_col pl-[31px] duration-300 fadeIn`}>
            <span
              className="hover:bg-[#F3F6F9] hover:translate-x-2 duration-300 py-[6px] px-[4px] rounded-[5px] cursor-pointer"
              style={{
                backgroundColor: (() => routerName("placements")) ? "#F3F6F9" : "",
                transform: (() => routerName("placements")) ? "translateX(0.5rem)" : "",
              }}
            >
              Места размещения
            </span>
            <span className="hover:bg-[#F3F6F9] hover:translate-x-2 duration-300 py-[6px] px-[4px] rounded-[5px] cursor-pointer">Номера</span>
            <span className="hover:bg-[#F3F6F9] hover:translate-x-2 duration-300 py-[6px] px-[4px] rounded-[5px] cursor-pointer">Тарифы</span>
            <span className="hover:bg-[#F3F6F9] hover:translate-x-2 duration-300 py-[6px] px-[4px] rounded-[5px] cursor-pointer">Цены и предложения</span>
          </div>
        )}
        <div className="pt-[10px] flex_jb_ic">
          <div className="flex items-center gap-[15px] cursor-pointer">
            <Image src="/images/bookmark.svg" alt="" width={`${0}`} height={`${0}`} className="w-[20px] h-auto" />
            <span className="pt-[4px]">Уведомления</span>
          </div>
          <div className="bg-[#58D072] w-[21px] h-[21px] rounded-full flex_center">
            <span className=" font-montserrat-600 text-[13px] text-white">3</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
