import http from "../utils/http";
import Cookies from "js-cookie";

const getRooms = async (token?: string) => {
  const userToken = token ? token : Cookies.get("token");
  const { data } = await http.get("/rooms", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return data;
};

const addRoom = (payload: any) => {
  const userToken = Cookies.get("token");
  return http.post("/rooms", payload, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
};

const getRoomTypes = async (token?: string) => {
  const userToken = token ? token : Cookies.get("token");
  const { data } = await http.get("/room-types", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return data;
};

const getCancellationConditions = async (token?: string) => {
  const userToken = token ? token : Cookies.get("token");
  const { data } = await http.get("/cancellation-conditions", {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return data;
};

export const RoomsServices = { getRooms, addRoom, getRoomTypes, getCancellationConditions };
