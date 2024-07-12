import Wrapper from "@/app/components/Wrapper";
import HeaderOfPlacements from "@/app/pages/placements/add/HeaderOfPlacements";
import PlacementsForm from "@/app/pages/placements/add/PlacementsForm";
import { PlacementsServices } from "@/app/services/placements";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { parseCookies } from "nookies";

export default function AddPlacement() {
  return (
    <Wrapper>
      <HeaderOfPlacements />
      <PlacementsForm />
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
      queryKey: ["placement_types"],
      queryFn: () => PlacementsServices.getPlacementTypes(token),
    });
    await queryClient.fetchQuery({
      queryKey: ["regions"],
      queryFn: () => PlacementsServices.getRegions(token),
    });
    await queryClient.fetchQuery({
      queryKey: ["food_types"],
      queryFn: () => PlacementsServices.getFoodTypes(token),
    });
    await queryClient.fetchQuery({
      queryKey: ["service_types"],
      queryFn: () => PlacementsServices.getServiceTypes(token),
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
