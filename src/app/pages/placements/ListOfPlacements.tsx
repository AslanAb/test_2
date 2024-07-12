import PlacementCard from "@/app/components/PlacementCard";
import { usePlacements } from "@/app/hooks/placements";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-toastify";

export default function ListOfPlacements() {
  const { data, isError, isFetching, isSuccess } = usePlacements();
  const router = useRouter();
  
  useEffect(() => {
    if (isFetching) {
      toast.loading("Загрузка данных, подождите...", {
        toastId: "fetchingPlacement",
        autoClose: false,
      });
    }
    if (isError) {
      toast.update("fetchingPlacement", {
        render: "Ошибка загрузки данных, попробуйте позже",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      router.replace("/");
    }
    if (isSuccess) {
      toast.update("fetchingPlacement", {
        render: "Данные успешно загружены",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    }
  }, [isFetching, isSuccess, isError]);

  return (
    <main className="mx-[47px] pt-[40px]">
      {data?.data.map((placement: any) => (
        <PlacementCard key={placement.id} placement={placement} />
      ))}
    </main>
  );
}
