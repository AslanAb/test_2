import Wrapper from "@/app/components/Wrapper";
import HeaderOfPlacements from "@/app/pages/placements/add/HeaderOfPlacements";
import PlacementsEditForm from "@/app/pages/placements/id/edit/PlacementsEditForm";
import { PlacementsServices } from "@/app/services/placements";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export default function EditPlacement() {
  const router = useRouter();
  const id = router.query.id as string;
  return (
    <Wrapper>
      <HeaderOfPlacements />
      <PlacementsEditForm id={id} />
    </Wrapper>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const id = context.query.id as string;

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
    await queryClient.fetchQuery({
      queryKey: ["placementById", id + "_ru"],
      queryFn: () => PlacementsServices.getPlacementById(id, "ru", token),
    });
    await queryClient.fetchQuery({
      queryKey: ["placementById", id + "_kk"],
      queryFn: () => PlacementsServices.getPlacementById(id, "kk", token),
    });
    await queryClient.fetchQuery({
      queryKey: ["placementById", id + "_en"],
      queryFn: () => PlacementsServices.getPlacementById(id, "en", token),
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
