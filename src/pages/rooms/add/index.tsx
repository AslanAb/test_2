import HeaderOfComponent from "@/app/components/HeaderOfComponent";
import Wrapper from "@/app/components/Wrapper";
import RoomsForm from "@/app/pages/rooms/add/RoomsForm";
import { PlacementsServices } from "@/app/services/placements";
import { RoomsServices } from "@/app/services/rooms";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export default function AddRoom() {
  return (
    <Wrapper>
      <HeaderOfComponent title="Номера" addPath="/rooms/add" isBack backPath="/rooms" />
      <RoomsForm />
    </Wrapper>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  const cookies = parseCookies({ req });
  const token = cookies["token"];
  const queryClient = new QueryClient();
  try {
    await queryClient.fetchQuery({
      queryKey: ["room_types"],
      queryFn: () => RoomsServices.getRoomTypes(token),
    });
    await queryClient.fetchQuery({
      queryKey: ["food_types"],
      queryFn: () => PlacementsServices.getFoodTypes(token),
    });
    await queryClient.fetchQuery({
      queryKey: ["cancellation_conditions"],
      queryFn: () => RoomsServices.getCancellationConditions(token),
    });
    return {
      props: { dehydratedState: dehydrate(queryClient) },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
