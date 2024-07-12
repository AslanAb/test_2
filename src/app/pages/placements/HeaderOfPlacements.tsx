import { useRouter } from "next/router";
import { FiPlusCircle } from "react-icons/fi";

export default function HeaderOfPlacements() {
  const router = useRouter();
  return (
    <header className="h-[102px] mx-[47px] border-b border-gray-300 flex items-center ">
      <span className=" font-montserrat-500 text-[36px] mr-[20px]">Места размещения</span>
      <button className="rounded-[8px] bg-main_blue flex items-center px-[4px] py-[8px] gap-[6px]" onClick={() => router.push("/placements/add")}>
        <span className=" text-[14px] text-white font-montserrat-500">Добавить</span>
        <FiPlusCircle size={16} color="white"/>
      </button>
    </header>
  );
}
