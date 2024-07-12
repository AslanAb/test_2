import Wrapper from "@/app/components/Wrapper";
import HeaderOfPlacements from "@/app/pages/placements/add/HeaderOfPlacements";
import PlacementDetails from "@/app/pages/placements/id/PlacementDetails";
import { PlacementsServices } from "@/app/services/placements";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { parseCookies } from "nookies";

export default function PlacementsById() {
  const router = useRouter();
  const id = router.query.id as string;
  return (
    <Wrapper>
      <HeaderOfPlacements />
      <PlacementDetails id={id} />
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
      queryKey: ["placementById", id + "_ru"],
      queryFn: () => PlacementsServices.getPlacementById(id, "ru", token),
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
