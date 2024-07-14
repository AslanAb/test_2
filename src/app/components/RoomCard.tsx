import { FiEye } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";

export default function RoomCard(props: { room: any }) {
  return (
    <div className="h-[100px] px-[40px] flex_jb_ic bg-white shadow-sm rounded-[8px] shadow-gray-300 mb-[20px]">
      <div className="w-[80%] flex gap-[40px] overflow-hidden">
        <div className="flex_col w-[20%] ">
          <span className=" text-[11px] font-montserrat-500">Название номера</span>
          <span className=" text-[14px] font-montserrat-600 truncate">{props.room.title}</span>
        </div>
        <div className="flex_col w-[20%] ">
          <span className=" text-[11px] font-montserrat-500">Тип номера</span>
          <span className=" text-[14px] font-montserrat-600 truncate">{props.room.room_type.title}</span>
        </div>
        <div className="flex_col w-[10%] ">
          <span className=" text-[11px] font-montserrat-500">Площадь</span>
          <span className=" text-[14px] font-montserrat-600 truncate">{props.room.square}</span>
        </div>
        <div className="flex_col w-[10%]">
          <span className=" text-[11px] font-montserrat-500 ">Вместимость</span>
          <span className=" text-[14px] font-montserrat-600 truncate">{props.room.room_type.sleeping_places}</span>
        </div>
        <div className="flex_col w-[20%] ">
          <span className=" text-[11px] font-montserrat-500 ">Количество номеров подобного типа</span>
          <span className=" text-[14px] font-montserrat-600 truncate">{props.room.default_quantity}</span>
        </div>
      </div>
      <div className="flex gap-[15px] items-center ml-[20px]">
        <button>
          <FiEye size={20} color="#156CBD" />
        </button>
        <button>
          <TbEdit size={20} color="green" />
        </button>
        <button>
          <IoCloseCircleOutline size={20} color="red" />
        </button>
      </div>
    </div>
  );
}
