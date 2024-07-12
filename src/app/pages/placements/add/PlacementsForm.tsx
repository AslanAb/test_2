import InputFilesUI from "@/app/components/InputFilesUI";
import InputMaskedUI from "@/app/components/InputMaskedUI";
import InputUI from "@/app/components/InputUI";
import SelectUI from "@/app/components/SelectUI";
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
import { IFormPlacement } from "@/app/types/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function PlacementsForm() {
  const {
    handleSubmit,
    resetField,
    control,
    getValues,
    formState: { errors },
  } = useForm<IFormPlacement>({
    defaultValues: {
      placement_type_id: [],
      ru_title: "",
      kz_title: "",
      en_title: "",
      ru_description: "",
      kz_description: "",
      en_description: "",
      ru_address: "",
      kz_address: "",
      en_address: "",
      lat_lon: "",
      rating: [],
      region: [],
      city_id: [],
      email: "",
      phone: "",
      foods: [],
      services: [],
      gallery_images: [],
    },
  });

  const [regionId, setRegionId] = useState();
  const [cities, setCities] = useState();
  const [payload, setPayload] = useState({});

  const router = useRouter();
  const queryClient = useQueryClient();
  const upload = useUploadFiles();
  const addPlacement = useAddPlacements();

  useEffect(() => {
    if (regionId) {
      const cities = allRegions.data.data.find((region: any) => region.id === +regionId);
      resetField("city_id");
      setCities(cities.cities.map((city: any) => ({ value: city.id, label: city.title })));
    } else {
      setCities(undefined);
    }
  }, [regionId]);

  useEffect(() => {
    if (upload.isSuccess) {
      const gallery_images = upload.data.data.data.map((item: any) => item.id);
      setPayload((prev) => {
        return { ...prev, gallery_images, main_image_id: gallery_images[0] };
      });
      addPlacement.mutate({ ...payload, gallery_images, main_image_id: gallery_images[0] });
    }
  }, [upload.isSuccess]);

  useEffect(() => {
    if (addPlacement.isSuccess) {
      toast.update("addPlacement", {
        render: "Успешно добавлено место размещения",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
      queryClient.invalidateQueries({ queryKey: ["listOfPlacements"] });
      router.push("/placements");
    }
  }, [addPlacement.isSuccess]);

  useEffect(() => {
    if (addPlacement.isError || upload.isError) {
      console.log("addPlacement.isError: ", addPlacement.error);
      toast.update("addPlacement", {
        // @ts-ignore
        render: addPlacement.error?.response.data.message || upload.error?.response.data.message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }, [addPlacement.isError, upload.isError]);

  const types = usePlacementTypes();
  const placementTypes = types.data?.data.map((type: any) => ({ value: type.id, label: type.title }));

  const allRegions = useRegions();
  const regions = allRegions.data?.data.map((region: any) => ({ value: region.id, label: region.title }));

  const allFoodTypes = useFoodTypes();
  const foodTypes = allFoodTypes.data?.data.map((type: any) => ({ value: type.id, label: type.title }));

  const allServiceTypes = useServiceTypes();
  const serviceTypes = allServiceTypes.data?.data.map((type: any) => ({ value: type.id, label: type.title }));

  const onSubmit = (data: any) => {
    console.log('data: ', data);
    setPayload({
      city_id: +data.city_id[0],
      placement_type_id: +data.placement_type_id[0],
      services: data.services.filter((item: any) => item !== "").map((item: any) => +item),
      foods: data.foods.filter((item: any) => item !== "").map((item: any) => +item),
      rating: +data.rating[0],
      lat: +data.lat_lon.split(",")[0].trim(),
      lon: +data.lat_lon.split(",")[1].trim(),
      phone: `+${data.phone.replace(/\D/g, "")}`,
      email: data.email,
      ru: {
        title: data.ru_title,
        description: data.ru_description,
        address: data.ru_address,
      },
      en: {
        title: data.en_title ? data.en_title : data.ru_title,
        description:
          data.en_description && data.en_description !== "<p></p>" ? data.en_description : data.ru_description,
        address: data.en_address ? data.en_address : data.ru_address,
      },
      kz: {
        title: data.kz_title ? data.kz_title : data.ru_title,
        description:
          data.kz_description && data.kz_description !== "<p></p>" ? data.kz_description : data.ru_description,
        address: data.kz_address ? data.kz_address : data.ru_address,
      },
    });

    const formData = new FormData();
    data.gallery_images.forEach((file: any, index: number) => {
      formData.append(`content[]`, file.file);
    });
    upload.mutate(formData);
  };

  const validateNotEmptyStringInArray = (value: any) => {
    if (Array.isArray(value) && value.length === 1 && value.includes("")) {
      return false;
    }
    return true;
  };

  console.log("getValues: ", getValues("en_description"));

  return (
    <main className="mx-[47px] my-[40px] p-[20px] bg-white rounded-[5px] border border-[#F3F6F9] shadow-sm ">
      <p className=" font-montserrat-600 text-[20px] text-main_text mb-[10px]">Добавление отеля</p>
      <form className="flex flex-col gap-[10px] " onSubmit={handleSubmit(onSubmit)}>
        <SelectUI
          data={placementTypes}
          label="Тип размещения"
          name="placement_type_id"
          control={control}
          rules={{ required: true, validate: validateNotEmptyStringInArray }}
        />
        {errors.placement_type_id && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <InputUI label="Наименование на русском" name="ru_title" control={control} rules={{ required: true }} />
        {errors.ru_title && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <InputUI label="Наименование на казахском" name="kz_title" control={control} rules={{ required: false }} />
        <InputUI label="Наименование на английском" name="en_title" control={control} rules={{ required: false }} />
        <Tiptap
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
        <Tiptap label="Описание на казахском" name="kz_description" control={control} rules={{ required: false }} />
        <Tiptap label="Описание на английском" name="en_description" control={control} rules={{ required: false }} />
        <InputUI label="Адрес на русском" name="ru_address" control={control} rules={{ required: true }} />
        {errors.ru_address && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <InputUI label="Адрес на казахском" name="kz_address" control={control} rules={{ required: false }} />
        <InputUI label="Адрес на английском" name="en_address" control={control} rules={{ required: false }} />
        <InputUI
          label="Координаты (широта, долгота)"
          name="lat_lon"
          control={control}
          rules={{
            required: "Обязательное поле",
            pattern: {
              value: /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/,
              message: "Введите широту и высоту, разделённых запятой",
            },
          }}
        />
        {errors.lat_lon && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">
            {errors.lat_lon?.message as string}
          </span>
        )}
        <SelectUI
          data={stars}
          label="Количество звезд"
          name="rating"
          control={control}
          rules={{ required: true, validate: validateNotEmptyStringInArray }}
        />
        {errors.rating && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <SelectUI
          data={regions}
          label="Область"
          name="region"
          control={control}
          rules={{ required: true, validate: validateNotEmptyStringInArray }}
          onChange={setRegionId}
        />
        {errors.region && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <SelectUI
          data={cities ? cities : []}
          label="Город"
          name="city_id"
          control={control}
          rules={{ required: true, validate: validateNotEmptyStringInArray }}
          disabled={cities ? false : true}
        />
        {errors.city_id && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <InputUI
          label="Email"
          name="email"
          control={control}
          rules={{
            required: "Обязательное поле",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Неверный формат электронной почты",
            },
          }}
        />
        {errors.email && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">
            {errors.email?.message as string}
          </span>
        )}
        <InputMaskedUI
          label="Телефон для бронирования"
          name="phone"
          control={control}
          rules={{
            required: "Обязательное поле",
            pattern: {
              value: /^\+7 \(\d{3}\) \d{3} \d{2} \d{2}$/,
              message: "Неверный формат телефона",
            },
          }}
          mask={{ mask: "+7 (___) ___ __ __", replacement: "_", showMask: true, separate: true }}
        />
        {errors.phone && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">
            {errors.phone?.message as string}
          </span>
        )}
        <SelectUI
          data={foodTypes}
          label="Вид питания"
          name="foods"
          control={control}
          rules={{ required: true, validate: validateNotEmptyStringInArray }}
          multipleSelect
        />
        {errors.foods && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <SelectUI
          data={serviceTypes}
          label="Услуги"
          name="services"
          control={control}
          rules={{ required: true, validate: validateNotEmptyStringInArray }}
          multipleSelect
        />
        {errors.services && (
          <span className="mx-auto text-red-500 font-montserrat-500 text-[14px]">Обязательное поле</span>
        )}
        <InputFilesUI label="Галерея" name="gallery_images" control={control} rules={{ required: true }} />
        {errors.gallery_images && (
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
