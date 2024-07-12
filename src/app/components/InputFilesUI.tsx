import { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { FiPlusCircle } from "react-icons/fi";
import { IoCloseCircleOutline } from "react-icons/io5";

export default function InputFilesUI(props: { label: string; name: string; control: any; rules: any }) {
  const { field } = useController({ name: props.name, control: props.control, rules: props.rules });
  const [selectedImages, setSelectedImages] = useState<{ url: string; file: File; id?: string }[]>(field.value);

  useEffect(() => {
    field.onChange(selectedImages);
  }, [selectedImages]);

  const handleImageChange = (e: any) => {
    const files = Array.from(e.target.files as File[]).slice(0, 5); // Ограничение до 5 файлов
    const imagesArray = files.map((file: any) => {
      return { url: URL.createObjectURL(file), file: file };
    });
    setSelectedImages((prev) => {
      const updatedImages = [...prev, ...imagesArray];
      return updatedImages.slice(0, 5);
    });
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full flex_jb_ic">
      <label className="w-[30%] font-montserrat-500 text-[14px] text-main_text">{props.label}</label>
      <div className="w-[60%] overflow-hidden">
        <input
          type="file"
          multiple
          onChange={handleImageChange}
          id={props.name}
          name={props.name}
          ref={field.ref}
          style={{ display: "none" }}
        />
        <label
          htmlFor={props.name}
          className="w-fit cursor-pointer rounded-[8px] bg-main_blue flex items-center px-[4px] py-[8px] gap-[6px] mb-[20px]"
        >
          <span className=" text-[14px] text-white font-montserrat-500">Загрузить фото</span>
          <FiPlusCircle size={16} color="white" />
        </label>
        <div className="w-full flex items-center gap-[8px] overflow-x-auto">
          {selectedImages.map((image, index) => (
            <div key={index} className=" relative mb-4">
              <img src={image.url} alt="preview" className="w-[150px] min-w-[150px] h-[100px] object-cover rounded-[10px]" />
              <button type="button" onClick={() => handleRemoveImage(index)} className=" absolute right-1 top-1">
                <IoCloseCircleOutline size={22} color="red" />
              </button>
            </div>
          ))}
        </div>
        {selectedImages.length === 0 && (
          <span className=" text-[14px] text-main_text font-montserrat-500">Примечание: Можно загрузить максимум 5 фотографий</span>
        )}
      </div>
      <div className="w-[30%]"></div>
    </div>
  );
}
