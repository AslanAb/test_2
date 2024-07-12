import http from "../utils/http";
import Cookies from "js-cookie";

const login = (payload: any) => {
  return http.post("/login", payload);
};

const logout = () => {
  const token = Cookies.get("token");
  return http.post(
    "/logout",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const AuthServices = { login, logout };
