import CheckBoxUI from "@/app/components/CheckBoxUI";
import InputFilesUI from "@/app/components/InputFilesUI";
import InputMaskedUI from "@/app/components/InputMaskedUI";
import InputUI from "@/app/components/InputUI";
import SelectUI from "@/app/components/SelectUI";
import TextAreaUI from "@/app/components/TextAreaUI";
import Tiptap from "@/app/components/Tiptap";
import { stars } from "@/app/constants";
import {
  useAddPlacements,
  useFoodTypes,
  usePlacementTypes,
  useRegions,
  useServiceTypes,
  useUploadFiles,
} from "@/app/hooks/placements";
import { useAddRoom, useCancellationConditions, useRoomTypes } from "@/app/hooks/rooms";
import { IFormRoom } from "@/app/types/rooms";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function RoomsForm() {
  const {
    handleSubmit,
    resetField,
    control,
    getValues,
    formState: { errors },
  } = useForm<IFormRoom>({
    defaultValues: {
      room_type_id: "",
      gallery_images: [],
      comforts: [],
      food_types: [],
      price: "",
      quantity: "",
      square: "",
      min_booking_period: "",
      smoking: false,
      cot_quantity: "",
      cot_price: "",
      fine: "",
      cancellation_id: "",
      check_in: new Date(),
      check_out: "",
      ru_title: "",
      kz_title: "",
      en_title: "",
      ru_description: "",
      kz_description: "",
      en_description: "",
    },
  });

  const [payload, setPayload] = useState({});

  const router = useRouter();
  const queryClient = useQueryClient();
  const upload = useUploadFiles();
  const addRoom = useAddRoom();

  useEffect(() => {
    if (upload.isSuccess) {
      const gallery_images = upload.data.data.data.map((item: any) => item.id);
      setPayload((prev) => {
        return { ...prev, gallery_images };
      });
      addRoom.mutate({ ...payload, gallery_images });
    }
  }, [upload.isSuccess]);

  useEffect(() => {
    if (addRoom.isSuccess) {
      toast.update("addRoom", {
        render: "Успешно добавлен номер отеля",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["listOfRooms"] });
      router.push("/rooms");
    }
  }, [addRoom.isSuccess]);

  useEffect(() => {
    if (addRoom.isError || upload.isError) {
      toast.update("addRoom", {
        // @ts-ignore
        render: addRoom.error?.response.data.message || upload.error?.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }, [addRoom.isError, upload.isError]);

  // const allRegions = useRegions();
  // const regions = allRegions.data?.data.map((region: any) => ({ value: region.id, label: region.title }));

  const allFoodTypes = useFoodTypes();
  const foodTypes = allFoodTypes.data?.data.map((type: any) => ({ value: type.id, label: type.title }));

  // const allServiceTypes = useServiceTypes();
  // const serviceTypes = allServiceTypes.data?.data.map((type: any) => ({ value: type.id, label: type.title }));

  const allRoomTypes = useRoomTypes();
  const roomTypes = allRoomTypes.data?.data.map((type: any) => ({ value: type.id, label: type.title }));

  const allCancellCon = useCancellationConditions();
  const cancellCon = allCancellCon.data?.data.map((type: any) => ({ value: type.id, label: type.time }));

  const onSubmit = (data: any) => {
    console.log("data: ", data);
    // setPayload({
    //   city_id: +data.city_id[0],
    //   placement_type_id: +data.placement_type_id[0],
    //   services: data.services.filter((item: any) => item !== "").map((item: any) => +item),
    //   foods: data.foods.filter((item: any) => item !== "").map((item: any) => +item),
    //   rating: +data.rating[0],
    //   lat: +data.lat_lon.split(",")[0].trim(),
    //   lon: +data.lat_lon.split(",")[1].trim(),
    //   phone: `+${data.phone.replace(/\D/g, "")}`,
    //   email: data.email,
    //   ru: {
    //     title: data.ru_title,
    //     description: data.ru_description,
    //     address: data.ru_address,
    //   },
    //   en: {
    //     title: data.en_title ? data.en_title : data.ru_title,
    //     description:
    //       data.en_description && data.en_description !== "<p></p>" ? data.en_description : data.ru_description,
    //     address: data.en_address ? data.en_address : data.ru_address,
    //   },
    //   kz: {
    //     title: data.kz_title ? data.kz_title : data.ru_title,
    //     description:
    //       data.kz_description && data.kz_description !== "<p></p>" ? data.kz_description : data.ru_description,
    //     address: data.kz_address ? data.kz_address : data.ru_address,
    //   },
    // });

    // const formData = new FormData();
    // data.gallery_images.forEach((file: any, index: number) => {
    //   formData.append(`content[]`, file.file);
    // });
    // upload.mutate(formData);
  };

  const validateNotEmptyStringInArray = (value: any) => {
    if (Array.isArray(value) && value.length === 1 && value.includes("")) {
      return false;
    }
    return true;
  };

  // console.log("getValues: ", getValues("en_description"));

  return (
    <main className="mx-[47px] my-[40px] p-[20px] bg-white rounded-[5px] border border-[#F3F6F9] shadow-sm ">
      <p className=" font-montserrat-600 text-[20px] text-main_text mb-[10px]">Добавление отеля</p>
      <form className="flex flex-col gap-[10px] " onSubmit={handleSubmit(onSubmit)}>
        <InputUI label="Наименование на русском" name="ru_title" control={control} rules={{ required: true }} />
        {errors.ru_title && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <InputUI label="Наименование на казахском" name="kz_title" control={control} rules={{ required: false }} />
        <InputUI label="Наименование на английском" name="en_title" control={control} rules={{ required: false }} />
        <TextAreaUI
          label="Описание на русском"
          name="ru_description"
          control={control}
          rules={{
            required: true,
            validate: (value: string) => {
              if (value.trim() === "<p></p>") {
                return false;
              }
              return true;
            },
          }}
        />
        {errors.ru_description && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <TextAreaUI label="Описание на казахском" name="kz_description" control={control} rules={{ required: false }} />
        <TextAreaUI
          label="Описание на английском"
          name="en_description"
          control={control}
          rules={{ required: false }}
        />
        <SelectUI
          data={roomTypes}
          label="Тип"
          name="room_type_id"
          control={control}
          rules={{ required: true, validate: validateNotEmptyStringInArray }}
        />
        {errors.room_type_id && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <SelectUI
          data={foodTypes}
          label="Вид питания"
          name="food_types"
          control={control}
          rules={{ required: true, validate: validateNotEmptyStringInArray }}
          multipleSelect
        />
        {errors.food_types && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <InputUI label="Площадь номера" name="square" control={control} rules={{ required: true }} />
        {errors.square && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <InputUI
          label="Стоимость"
          name="price"
          control={control}
          rules={{
            required: "Обязательное поле",
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Стоимость должна быть числом",
            },
          }}
        />
        {errors.price && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">
            {errors.price?.message as string}
          </span>
        )}
        <InputUI
          label="Минимальное количество дней для бронирования"
          name="min_booking_period"
          control={control}
          rules={{
            required: "Обязательное поле",
            pattern: {
              value: /^\d+$/,
              message: "Количество дней должно быть числом",
            },
            // min: {
            //   value: 1,
            //   message: "Количество дней должно быть больше 0",
            // },
          }}
        />
        {errors.min_booking_period && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">
            {errors.min_booking_period?.message as string}
          </span>
        )}
        <CheckBoxUI label="Комната для курящих" name="smoking" control={control} rules={{ required: false }} />
        <InputUI
          label="Количество детских кроваток 0-3 лет"
          name="cot_quantity"
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^\d+$/,
              message: "Количество дней должно быть числом",
            },
          }}
        />
        {errors.cot_quantity && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">
            {errors.cot_quantity?.message as string}
          </span>
        )}
        <InputUI
          label="Цена за детскую кроватку за день 0-3 лет"
          name="cot_price"
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Цена должна быть числом",
            },
          }}
        />
        {errors.cot_price && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">
            {errors.cot_price?.message as string}
          </span>
        )}
        <InputUI
          label="Количество детских кроваток 3-6 лет"
          name=""
          control={control}
          rules={{
            required: false,
          }}
          disabled
        />
        <InputUI
          label="Цена за детскую кроватку за день 3-6 лет"
          name=""
          control={control}
          rules={{
            required: false,
          }}
          disabled
        />
        <InputUI
          label="Количество детских кроваток 6-12 лет"
          name=""
          control={control}
          rules={{
            required: false,
          }}
          disabled
        />
        <InputUI
          label="Цена за детскую кроватку за день 6-12 лет"
          name=""
          control={control}
          rules={{
            required: false,
          }}
          disabled
        />
        <InputUI
          label="Штраф"
          name="fine"
          control={control}
          rules={{
            required: false,
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Штраф должен быть числом",
            },
          }}
        />
        {errors.fine && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">{errors.fine?.message as string}</span>
        )}
        <SelectUI
          data={cancellCon}
          label="Условия отмены"
          name="cancellation_id"
          control={control}
          rules={{ required: true, validate: validateNotEmptyStringInArray }}
        />
        {errors.cancellation_id && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <button
          type="submit"
          className="ml-[25%] mb-[30px] w-fit rounded-[8px] bg-main_blue flex items-center px-[4px] py-[8px] gap-[6px] text-[14px] text-white font-montserrat-500"
        >
          Сохранить
        </button>
      </form>
    </main>
  );
}
