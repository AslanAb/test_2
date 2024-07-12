import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FiEye } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";
import { TbEdit } from "react-icons/tb";
import { useDeletePlacements } from "../hooks/placements";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export default function PlacementCard(props: { placement: any }) {
  const queryClient = useQueryClient();
  const deletePlacement = useDeletePlacements();
  const router = useRouter();

  useEffect(() => {
    if (deletePlacement.isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["listOfPlacements"] });
      toast.update("deletePlacement", { render: "Успешноt удаление", type: "success", isLoading: false, autoClose: 3000 });
    }
    if (deletePlacement.isError) {
      toast.update("deletePlacement", { render: "Ошибка удаления", type: "error", isLoading: false, autoClose: 3000 });
    }
  }, [deletePlacement.isSuccess, deletePlacement.isError]);

  return (
    <div className="h-[100px] px-[40px] flex_jb_ic bg-white shadow-sm rounded-[8px] shadow-gray-300 mb-[20px]">
      <div className="flex gap-[40px] overflow-hidden">
        <div className="flex_col max-w-[20%] ">
          <span className=" text-[11px] font-montserrat-500">Название</span>
          <span className=" text-[14px] font-montserrat-600 truncate">{props.placement.title}</span>
        </div>
        <div className="flex_col max-w-[20%] ">
          <span className=" text-[11px] font-montserrat-500">Тип размещения</span>
          <span className=" text-[14px] font-montserrat-600 truncate">{props.placement.placement_type.title}</span>
        </div>
        <div className="flex_col max-w-[20%] ">
          <span className=" text-[11px] font-montserrat-500">Город</span>
          <span className=" text-[14px] font-montserrat-600 truncate">{props.placement.city.title}</span>
        </div>
        <div className="flex_col max-w-[20%]">
          <span className=" text-[11px] font-montserrat-500 ">Адрес</span>
          <span className=" text-[14px] font-montserrat-600 truncate">{props.placement.address}</span>
        </div>
        <div className="flex_col max-w-[20%] ">
          <span className=" text-[11px] font-montserrat-500 ">Контакты</span>
          <span className=" text-[14px] font-montserrat-600 truncate">{props.placement.phone}</span>
        </div>
      </div>
      <div className="flex gap-[15px] items-center ml-[20px]">
        <button
          onClick={() =>
            router.push({
              pathname: "/placements/[id]",
              query: { id: props.placement.id },
            })
          }
        >
          <FiEye size={20} color="#156CBD" />
        </button>
        <button
          onClick={() =>
            router.push({
              pathname: "/placements/[id]/edit",
              query: { id: props.placement.id },
            })
          }
        >
          <TbEdit size={20} color="green" />
        </button>
        <button onClick={() => deletePlacement.mutate(props.placement.id)}>
          <IoCloseCircleOutline size={20} color="red" />
        </button>
      </div>
    </div>
  );
}
