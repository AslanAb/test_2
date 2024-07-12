import Wrapper from "@/app/components/Wrapper";
import HeaderOfPlacements from "@/app/pages/placements/HeaderOfPlacements";
import ListOfPlacements from "@/app/pages/placements/ListOfPlacements";
import { PlacementsServices } from "@/app/services/placements";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export default function Placements() {
  return (
    <Wrapper>
      <HeaderOfPlacements />
      <ListOfPlacements />
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
      queryKey: ["listOfPlacements"],
      queryFn: () => PlacementsServices.getPlacements(token),
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
