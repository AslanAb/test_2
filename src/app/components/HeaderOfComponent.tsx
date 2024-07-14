import { useRouter } from "next/router";
import { FiPlusCircle } from "react-icons/fi";
import { LiaArrowLeftSolid } from "react-icons/lia";

export default function HeaderOfComponent(props: {
  title: string;
  addPath: string;
  isBack?: boolean;
  backPath?: string;
}) {
  const router = useRouter();
  return (
    <header className="pb-[20px] mx-[47px] border-b border-gray-300">
      <div className="flex items-center mt-[20px]">
        <span className=" font-montserrat-500 text-[36px] mr-[20px]">{props.title}</span>
        <button
          className="rounded-[8px] bg-main_blue flex items-center px-[4px] py-[8px] gap-[6px]"
          onClick={() => router.push(props.addPath)}
        >
          <span className=" text-[14px] text-white font-montserrat-500">Добавить</span>
          <FiPlusCircle size={16} color="white" />
        </button>
      </div>
      {props.isBack && (
        <button
          className="flex items-center px-[4px] gap-[6px]"
          onClick={() => {
            if (props.backPath) {
              return router.push(props.backPath);
            } else {
              return router.back();
            }
          }}
        >
          <LiaArrowLeftSolid size={16} color="#26333D" />
          <span className=" text-[14px] text-main_text font-montserrat-500">назад</span>
        </button>
      )}
    </header>
  );
}
