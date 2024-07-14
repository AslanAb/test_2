import { useMutation, useQuery } from "@tanstack/react-query";
import { RoomsServices } from "../services/rooms";

export function useRooms() {
  const { data } = useQuery({
    queryKey: ["listOfRooms"],
    queryFn: () => RoomsServices.getRooms(),
  });
  return { data };
}

export function useAddRoom() {
  const addRoom = useMutation({
    mutationFn: RoomsServices.addRoom,
  });
  return addRoom;
}

export function useRoomTypes() {
  const { data } = useQuery({
    queryKey: ["room_types"],
    queryFn: () => RoomsServices.getRoomTypes(),
  });
  return { data };
}

export function useCancellationConditions() {
  const { data } = useQuery({
    queryKey: ["cancellation_conditions"],
    queryFn: () => RoomsServices.getCancellationConditions(),
  });
  return { data };
}
