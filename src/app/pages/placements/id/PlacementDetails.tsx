import { usePlacementById } from "@/app/hooks/placements";
import { useRouter } from "next/router";
import { useState } from "react";
import { TbStar, TbStarFilled, TbEdit } from "react-icons/tb";

export default function PlacementDetails(props: { id: string }) {
  const { data } = usePlacementById(props.id, "ru");
  const [selectedImg, setSelectedImg] = useState(data.data.main_image.path);
  const router = useRouter();

  const ratingArray = Array.from({ length: 5 }, (_, index) => index < data.data.rating);
  return (
    <main className="mx-[47px] my-[40px] p-[20px] bg-white rounded-[5px] border border-[#F3F6F9] shadow-sm flex gap-[40px]">
      <div className="w-[35%]">
        <img src={selectedImg} alt="placement photo" className="w-full aspect-square mb-[10px]" />
        <div className="flex gap-[15px] overflow-x-auto pb-[10px]">
          {data.data.gallery_images.map((el: any) => (
            <img
              key={el.id}
              src={el.path}
              alt="placement photo"
              className="w-[20%] aspect-square cursor-pointer"
              onClick={() => setSelectedImg(el.path)}
            />
          ))}
        </div>
      </div>
      <div className="w-[60%]">
        <div className="flex items-center gap-[42px]">
          <h1 className=" font-montserrat-500 text-[32px] truncate">{data.data.placement_type.title}</h1>
          <div className="flex items-center gap-[2px]">
            {ratingArray.map((el, index) => {
              if (el) {
                return <TbStarFilled key={index} color="#F8C35D" size={22} />;
              } else {
                return <TbStar key={index} color="#F8C35D" size={22} />;
              }
            })}
          </div>
        </div>
        <div>
          <span className=" font-montserrat-500 text-gray-600 text-[14px] mr-[20px]">{data.data.email}</span>
          <span className=" font-montserrat-500 text-main_text text-[16px]">{data.data.phone}</span>
        </div>
        <p className=" font-montserrat-500 text-main_text text-[16px] my-[10px] truncate">
          {data.data.city.title} {data.data.address}
        </p>
        <button
          className="flex items-center gap-[10px]"
          onClick={() =>
            router.push({
              pathname: "/placements/[id]/edit",
              query: { id: props.id },
            })
          }
        >
          <TbEdit size={26} color="#156CBD" />
          <span className=" font-montserrat-500 text-main_blue text-[16px]">Редактировать</span>
        </button>
        <div className="flex gap-[30px] mt-[10px]">
          <div className="w-[40%] text-wrap">
            <p className="font-montserrat-400 text-main_text text-[14px]">Удобства номера</p>
            {data.data.service_types.map((el: any, index: number) => (
              <p key={el.id} className=" font-montserrat-600 text-main_text text-[16px]">
                {el.title}
              </p>
            ))}
          </div>
          <div className="w-[40%] text-wrap">
            <p className="font-montserrat-400 text-main_text text-[14px]">Питание</p>
            {data.data.food_types.map((el: any, index: number) => (
              <p key={el.id} className=" font-montserrat-600 text-main_text text-[16px]">
                {el.title}
              </p>
            ))}
          </div>
        </div>
        <div className="my-[20px]">
          <p className="font-montserrat-400 text-main_text text-[14px]">Количество номеров всего</p>
          <p className=" font-montserrat-600 text-main_text text-[16px]">{data.data.rooms.length}</p>
        </div>
        <div className="my-[20px]">
          <p className=" font-montserrat-500 text-main_text text-[16px]">Описание</p>
          <div
            dangerouslySetInnerHTML={{ __html: data.data.description }}
            className="text-gray-600 w-full text-wrap overflow-hidden flex flex-col gap-[12px]"
          />
        </div>
      </div>
    </main>
  );
}
