import RoomCard from "@/app/components/RoomCard";
import { useRooms } from "@/app/hooks/rooms";

export default function ListOfPlacements() {
  const { data } = useRooms();

  return (
    <main className="mx-[47px] pt-[40px]">
      {data?.data.map((room: any) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </main>
  );
}
