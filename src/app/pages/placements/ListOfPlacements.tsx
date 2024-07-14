import PlacementCard from "@/app/components/PlacementCard";
import { usePlacements } from "@/app/hooks/placements";

export default function ListOfPlacements() {
  const { data } = usePlacements();

  return (
    <main className="mx-[47px] pt-[40px]">
      {data?.data.map((placement: any) => (
        <PlacementCard key={placement.id} placement={placement} />
      ))}
    </main>
  );
}
