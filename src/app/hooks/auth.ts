import { AuthServices } from "@/app/services/auth";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export function useLogin() {
  const router = useRouter();

  const login = useMutation({
    mutationFn: AuthServices.login,
    onMutate: () => {
      toast.loading("Выполняется авторизация, подождите...", {
        toastId: "login",
        autoClose: false,
      });
    },
    onSuccess: (data) => {
      Cookies.set("token", data.data.access_token);
      //   Cookies.set("user", JSON.stringify(data.data.data));
      toast.update("login", { render: "Успешная авторизация", type: "success", isLoading: false, autoClose: 5000 });
      router.replace("/placements");
    },
    onError: () => {
      toast.update("login", {
        render: "Ошибка авторизации, попробуйте позже",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    },
  });
  return login;
}

export function useLogout() {
  const router = useRouter();

  const logout = useMutation({
    mutationFn: AuthServices.logout,
    onMutate: () => {
      toast.loading("Выполняется деавторизация, подождите...", {
        toastId: "logout",
        autoClose: false,
      });
    },
    onSuccess: () => {
      Cookies.remove("token");
      toast.update("logout", { render: "Успешная деавторизация", type: "success", isLoading: false, autoClose: 5000 });
      router.replace("/");
    },
    onError: () => {
      toast.update("logout", {
        render: "Ошибка деавторизация, попробуйте позже",
        type: "error",
        isLoading: false,
        autoClose: 1500,
      });
    },
  });
  return logout;
}
