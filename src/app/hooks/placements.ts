import { useMutation, useQuery } from "@tanstack/react-query";
import { PlacementsServices } from "../services/placements";
import { toast } from "react-toastify";

export function usePlacements() {
  const { data, isError, isFetching, isSuccess } = useQuery({
    queryKey: ["listOfPlacements"],
    queryFn: () => PlacementsServices.getPlacements(),
  });
  return { data, isError, isFetching, isSuccess };
}

export function usePlacementTypes() {
  const { data } = useQuery({
    queryKey: ["placement_types"],
    queryFn: () => PlacementsServices.getPlacementTypes(),
  });
  return { data };
}

export function useRegions() {
  const { data } = useQuery({
    queryKey: ["regions"],
    queryFn: () => PlacementsServices.getRegions(),
  });
  return { data };
}

export function useFoodTypes() {
  const { data } = useQuery({
    queryKey: ["food_types"],
    queryFn: () => PlacementsServices.getFoodTypes(),
  });
  return { data };
}

export function useServiceTypes() {
  const { data } = useQuery({
    queryKey: ["service_types"],
    queryFn: () => PlacementsServices.getFoodTypes(),
  });
  return { data };
}

export function useUploadFiles() {
  const upload = useMutation({
    mutationFn: PlacementsServices.uploadFiles,
    onMutate: () => {
      toast.loading("Выполняется сохранение, подождите...", {
        toastId: "addPlacement",
        autoClose: false,
      });
    },
  });
  return upload;
}

export function useAddPlacements() {
  const addPlacements = useMutation({
    mutationFn: PlacementsServices.addPlacement,
  });
  return addPlacements;
}

export function usePlacementById(id: string, lang: string = "ru") {
  const { data } = useQuery({
    queryKey: ["placementById", id + "_" + lang],
    queryFn: () => PlacementsServices.getPlacementById(id, lang),
  });
  return { data };
}

export function useEditPlacements() {
  const editPlacements = useMutation({
    mutationFn: PlacementsServices.editPlacement,
  });
  return editPlacements;
}

export function useDeletePlacements() {
  const deletePlacements = useMutation({
    mutationFn: PlacementsServices.deletePlacement,
    onMutate: () => {
      toast.loading("Выполняется удаление, подождите...", {
        toastId: "deletePlacement",
        autoClose: false,
      });
    },
  });
  return deletePlacements;
}
