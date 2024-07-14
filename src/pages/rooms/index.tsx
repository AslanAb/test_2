import HeaderOfComponent from "@/app/components/HeaderOfComponent";
import Wrapper from "@/app/components/Wrapper";
import ListOfRooms from "@/app/pages/rooms/ListOfRooms";
import { RoomsServices } from "@/app/services/rooms";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export default function Rooms() {
  return (
    <Wrapper>
      <HeaderOfComponent title="Номера" addPath="/rooms/add" />
      <ListOfRooms />
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
      queryKey: ["listOfRooms"],
      queryFn: () => RoomsServices.getRooms(token),
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
