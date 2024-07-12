import http from "../utils/http";
import Cookies from "js-cookie";

const getPlacements = async (token?: string) => {
  const userToken = token ? token : Cookies.get("token");
  const { data } = await http.get("/placements", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return data;
};

const getPlacementTypes = async (token?: string) => {
  const userToken = token ? token : Cookies.get("token");
  const { data } = await http.get("/placement-types", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return data;
};

const getRegions = async (token?: string) => {
  const userToken = token ? token : Cookies.get("token");
  const { data } = await http.get("/regions", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return data;
};

const getServiceTypes = async (token?: string) => {
  const userToken = token ? token : Cookies.get("token");
  const { data } = await http.get("/service-types", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return data;
};

const getFoodTypes = async (token?: string) => {
  const userToken = token ? token : Cookies.get("token");
  const { data } = await http.get("/food-types", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return data;
};

const uploadFiles = (payload: any) => {
  const userToken = Cookies.get("token");
  return http.post("/upload", payload, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const addPlacement = (payload: any) => {
  const userToken = Cookies.get("token");
  return http.post("/placements", payload, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getPlacementById = async (id: string, lang: string = "ru", token?: string) => {
  const userToken = token ? token : Cookies.get("token");
  const { data } = await http.get(`/placements/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
      "Accept-Language": lang,
    },
  });
  return data;
};

const editPlacement = ({ id, payload }: { id: string; payload: any }) => {
  const userToken = Cookies.get("token");
  return http.patch(`/placements/${id}`, payload, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const deletePlacement = (id: string) => {
  const userToken = Cookies.get("token");
  return http.delete(`/placements/${id}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

export const PlacementsServices = {
  getPlacements,
  getPlacementTypes,
  getRegions,
  getFoodTypes,
  getServiceTypes,
  uploadFiles,
  addPlacement,
  getPlacementById,
  editPlacement,
  deletePlacement,
};
